import { useEffect, useMemo, useRef, useState } from 'react';
import { LogoutOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    Col,
    Collapse,
    Dropdown,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    notification,
} from 'antd';
import type { MenuProps, CollapseProps } from 'antd';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import FileTreeEntity from '@components/FileTreeEntity';
import { Link, useParams } from 'react-router-dom';
import Spinner from '@components/Spinner';
import podchyClient from '@services/podchyCient';
import './styles.css';

type IFile = {
    key: string;
    fid: string;
    filename: string;
    content: string;
    language: string;
};

type AddFileForm = {
    filename: string;
};

const LANGUAGES: Record<string, string> = {
    py: 'python',
    js: 'javascript',
};

const COMPILERS: Record<string, string> = {
    python: 'python3',
    javascript: 'node',
    cpp: 'g++',
};

const getLanguage = (filename: string) => {
    const parts = filename.split('.');
    const extension = parts.length > 1 ? (parts.pop() as string) : '';
    return LANGUAGES[extension] || 'plaintext';
};

export default function CpodPage() {
    const { cpod } = useParams<{ username: string; cpod: string }>();
    const [cpodName, setCpodName] = useState<string>('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [loaded] = useState(true);
    const [openAddFileModal, setOpenAddFileModal] = useState(false);
    const [files, setFiles] = useState<IFile[]>([]);
    const [currentFile, setCurrentFile] = useState<IFile | undefined>(
        undefined,
    );

    const [result, setResult] = useState<string | undefined>(undefined);

    const authContextValues = useMemo(
        () => ({
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            fullName: localStorage.getItem('fullName'),
            email: localStorage.getItem('email'),
        }),
        [],
    );

    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const fetchInitialState = async () => {
            const cpodInfo = await podchyClient.get(`/cpod/${cpod}`);
            setCpodName(cpodInfo.data.name);

            const filesResponse = await podchyClient.get(`/cpod/${cpod}/files`);
            if (filesResponse.status === 200) {
                const files = filesResponse.data as IFile[];
                setFiles(files);
                setCurrentFile(files[0]);
            }

            try {
                socketRef.current = new WebSocket(
                    `${import.meta.env.VITE_PODCHY_WS_URL}/ws/cpod/${cpod}/`,
                );
                socketRef.current.onopen = () => {
                    console.log('socket opened');
                    setSocketConnected(true);
                };
                socketRef.current.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'UPDATE_FILE') {
                        // update files
                        const { fid, content } = data;
                        setFiles((prevFiles) => {
                            const newFiles = [...prevFiles];
                            // update files affected by the change
                            const fileToUpdate = newFiles.find(
                                (file) => file.fid === fid,
                            );
                            if (fileToUpdate) {
                                fileToUpdate.content = content;
                            }
                            return newFiles;
                        });

                        // update current file if it was affected by the change
                        setCurrentFile((prevCurrentFile) => {
                            const fileToUpdate = prevCurrentFile as IFile;
                            if (fileToUpdate?.fid === fid) {
                                fileToUpdate.content = content;
                            }
                            return fileToUpdate;
                        });
                    }
                    if (data.type === 'ADD_FILE') {
                        const newFile = data.file as IFile;
                        newFile.key = newFile.fid;
                        setFiles((prevFiles) => [...prevFiles, newFile]);
                    }
                };
                socketRef.current.onclose = () => {
                    console.log('socket closed');
                    setSocketConnected(false);
                };
            } catch (err) {
                console.error(err);
            }
        };
        fetchInitialState();
        
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [cpod]);

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="flex flex-row items-center">
                    <Avatar icon={<UserOutlined />} />
                    <div className="flex flex-col py-2 px-6">
                        <p className="m-0 font-bold">
                            {authContextValues.fullName}
                        </p>
                        <p className="m-0 text-gray-600">
                            @{authContextValues.username}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    <Link to="/logout">
                        <div className="flex flex-row gap-3">
                            <LogoutOutlined />
                            Logout
                        </div>
                    </Link>
                </>
            ),
        },
    ];

    const handleEditorChange = (value: string) => {
        socketRef.current?.send(
            JSON.stringify({
                type: 'UPDATE_FILE',
                fid: currentFile?.fid,
                content: value,
            }),
        );
    };

    const handleSelectFile = (key: string) => {
        const fileToSelect = files.find((file) => file.key === key);
        setCurrentFile(fileToSelect);
    };

    const handleRunCode = () => {
        const requestPayload = {
            filename: currentFile?.filename,
            content: currentFile?.content,
        };

        podchyClient.post(`/cpod/${cpod}/run`, requestPayload).then((res) => {
            if (res.status === 200) {
                setResult(res.data.result);
            }
        });
    };

    const collapseItems: CollapseProps['items'] = [
        {
            key: '1',
            label: <div className="font-semibold">Files</div>,
            extra: (
                <>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenAddFileModal(true);
                        }}
                        icon={<PlusOutlined />}
                    />
                </>
            ),
            children: (
                <div className="flex flex-col gap-1">
                    {files.map((file) => (
                        <FileTreeEntity
                            key={file.fid}
                            id={file.fid}
                            type={file.language}
                            name={file.filename}
                            active={currentFile?.key === file.key}
                            onSelectItem={handleSelectFile}
                        />
                    ))}
                </div>
            ),
        },
    ];

    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    const handleAddFile = (values: AddFileForm) => {
        const _values = {
            ...values,
            language: getLanguage(values.filename),
            cpod: cpod,
            value: '',
        };
        podchyClient
            .post('/file', _values)
            .then((res) => {
                if (res.status === 201) {
                    const newFile = res.data as IFile;
                    newFile.key = newFile.fid;

                    notification.success({
                        message: 'Success',
                        description: 'File created successfully',
                    });

                    socketRef.current?.send(
                        JSON.stringify({
                            type: 'ADD_FILE',
                            file: newFile,
                        }),
                    );
                    setOpenAddFileModal(false);
                }
            })
            .catch((err) => {
                console.error(err);
                notification.error({
                    message: 'Error',
                    description: 'Something went wrong',
                });
            });
    };

    return (
        <Flex vertical className="h-screen">
            <header className="flex justify-between items-center border-0 border-b-2 border-solid border-gray-300 px-4">
                <div className="flex items-center gap-2">
                    <Link to="/~">
                        <p className="font-bold text-xl text-lavender m-2">
                            Podchy.
                        </p>
                    </Link>
                    <Button className="flex items-center rounded-lg font-semibold">
                        {cpodName}
                    </Button>
                </div>
                <div>
                    <Button
                        type="primary"
                        className="flex items-center bg-green-500 text-white font-semibold run-button"
                        icon={<FaPlay />}
                        onClick={handleRunCode}
                    >
                        Run
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        className="flex items-center rounded-lg"
                        icon={<BiSolidShareAlt />}
                    >
                        Share
                    </Button>
                    <div>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Button
                                className="bg-transparent hover:bg-white"
                                icon={<UserOutlined />}
                            />
                        </Dropdown>
                    </div>
                </div>
            </header>
            {loaded && socketConnected ? (
                <Row className="h-full">
                    <Col span={4} className="p-2">
                        <Input placeholder="Search" />
                        <div>
                            <Collapse
                                ghost
                                size="small"
                                defaultActiveKey={['1']}
                                items={collapseItems}
                            />
                            <Modal
                                width={360}
                                open={openAddFileModal}
                                footer={null}
                                onCancel={() => {
                                    setOpenAddFileModal(false);
                                }}
                            >
                                <p className="text-xl m-0 font-semibold mb-3">
                                    Add new File
                                </p>
                                <Form
                                    layout="vertical"
                                    onFinish={handleAddFile}
                                >
                                    <Form.Item<AddFileForm>
                                        label="Filename"
                                        name="filename"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input a filename',
                                            },
                                            {
                                                validator: async (_, value) => {
                                                    if (
                                                        getLanguage(value) ===
                                                        'plaintext'
                                                    ) {
                                                        return Promise.reject(
                                                            'Invalid file extension',
                                                        );
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        block
                                        htmlType="submit"
                                    >
                                        Add
                                    </Button>
                                </Form>
                            </Modal>
                        </div>
                    </Col>
                    <Col span={14} className="h-full rounded-lg ">
                        <div className="flex bg-[#f5f5f5] mt-1 rounded-t-md border-b-4 border-teal-400">
                            {files.map((file) => (
                                <div
                                    key={file.key}
                                    className={`bg-white flex items-center tab-item ${
                                        currentFile?.key === file.key
                                            ? 'active-tab-item'
                                            : ''
                                    }`}
                                >
                                    <button
                                        className="m-0 p-2 bg-transparent border-0 cursor-pointer"
                                        onClick={() => {
                                            handleSelectFile(file.key);
                                        }}
                                    >
                                        {file.filename}
                                    </button>
                                    <div className="h-full flex items-center px-1">
                                        <Button
                                            size="small"
                                            type="text"
                                            className="flex flex-row items-center justify-center"
                                            icon={<AiOutlineClose />}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-full bg-white px-2 font-mono">
                            <p className="text-xs text-gray-400 m-0">main.py</p>
                            <Editor
                                theme="vs"
                                className="h-full"
                                language={currentFile?.language}
                                value={currentFile?.content}
                                onMount={handleEditorDidMount}
                                options={{
                                    fontFamily:
                                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;",
                                }}
                                onChange={
                                    handleEditorChange as (
                                        value: string | undefined,
                                        ev: editor.IModelContentChangedEvent,
                                    ) => void
                                }
                            />
                        </div>
                    </Col>
                    <Col span={6} className="h-full rounded-lg px-1">
                        <div className="flex bg-[#f5f5f5] mt-1 rounded-t-md border-b-4 border-teal-400">
                            <div className="bg-white flex items-center tab-item active-tab-item cursor-pointer">
                                <button
                                    className="m-0 p-2 bg-transparent border-0 cursor-pointer"
                                    onClick={() => {}}
                                >
                                    Console
                                </button>
                                <div className="h-full flex items-center px-1">
                                    <Button
                                        size="small"
                                        type="text"
                                        className="flex flex-row items-center justify-center"
                                        icon={<AiOutlineClose />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-full bg-white p-2">
                            {result ? (
                                <div className="w-full">
                                    <p className="font-mono font-bold">
                                        {`> ${
                                            COMPILERS[
                                                currentFile?.language ||
                                                    'python'
                                            ]
                                        } ${currentFile?.filename}`}
                                    </p>
                                    <p className="font-mono whitespace-pre-wrap">
                                        {result}
                                    </p>
                                </div>
                            ) : (
                                <p className="leading-8 inline-flex">
                                    Results of{' '}
                                    <span className="mx-2">
                                        <Button
                                            type="primary"
                                            className="flex items-center bg-green-500 text-white font-semibold run-button"
                                            icon={<FaPlay />}
                                            onClick={handleRunCode}
                                        >
                                            Run
                                        </Button>
                                    </span>{' '}
                                    the code.
                                </p>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : (
                <div className="flex flex-row justify-center items-center">
                    <Spinner />
                </div>
            )}
        </Flex>
    );
}
