import { useRef } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    Col,
    Collapse,
    Dropdown,
    Flex,
    Input,
    Row,
} from 'antd';
import type { MenuProps, CollapseProps } from 'antd';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import FileTreeEntity from '@components/FileTreeEntity';
import { AiOutlineClose } from 'react-icons/ai';
import './styles.css';

export default function CpodPage() {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="flex flex-row items-center">
                    <Avatar icon={<UserOutlined />} />
                    <div className="flex flex-col py-2 px-6">
                        <p className="m-0 font-bold">Joel Perca</p>
                        <p className="m-0 text-gray-600">@reqhiem</p>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    <div className="flex flex-row gap-3">
                        <LogoutOutlined />
                        Logout
                    </div>
                </>
            ),
        },
    ];

    const collapseItems: CollapseProps['items'] = [
        {
            key: '1',
            label: <div className="font-semibold">Files</div>,
            children: (
                <div className="flex flex-col gap-1">
                    <FileTreeEntity type="python" name="main.py" active />
                    <FileTreeEntity type="python" name="program.py" />
                    <FileTreeEntity type="python" name="fibo.py" />
                </div>
            ),
        },
    ];

    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    return (
        <Flex vertical className="h-screen">
            <header className="flex justify-between items-center border-0 border-b-2 border-solid border-gray-300 px-4">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-xl text-lavender m-2">
                        Podchy.
                    </p>
                    <Button className="flex items-center rounded-lg font-semibold">
                        workcito
                    </Button>
                </div>
                <div>
                    <Button
                        type="primary"
                        className="flex items-center bg-green-500 text-white font-semibold run-button"
                        icon={<FaPlay />}
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
                    </div>
                </Col>
                <Col span={14} className="h-full rounded-lg ">
                    <div className="flex bg-[#f5f5f5] mt-1 rounded-t-md border-b-4 border-teal-400">
                        <div className="bg-white flex items-center tab-item active-tab-item cursor-pointer">
                            <button
                                className="m-0 p-2 bg-transparent border-0 cursor-pointer"
                                onClick={() => {
                                    console.log('click');
                                }}
                            >
                                main.py
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
                        <div className="bg-white flex items-center">
                            <button
                                className="m-0 p-2 bg-transparent border-0 cursor-pointer"
                                onClick={() => {
                                    console.log('click');
                                }}
                            >
                                program.py
                            </button>
                            <div className="h-full flex items-center px-1 tab-item">
                                <Button
                                    size="small"
                                    type="text"
                                    className="flex flex-row items-center justify-center"
                                    icon={<AiOutlineClose />}
                                />
                            </div>
                        </div>
                        <div className="bg-white flex items-center tab-item">
                            <button
                                className="m-0 p-2 bg-transparent border-0 cursor-pointer"
                                onClick={() => {
                                    console.log('click');
                                }}
                            >
                                fibo.py
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
                    <div className="h-full bg-white px-2 font-mono">
                        <p className="text-xs text-gray-400 m-0">main.py</p>
                        <Editor
                            theme="vs"
                            className="h-full"
                            language="python"
                            value="# some comment"
                            onMount={handleEditorDidMount}
                            options={{
                                fontFamily:
                                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;",
                            }}
                        />
                    </div>
                </Col>
                <Col span={6} className="h-full rounded-lg px-1">
                    <div className="flex bg-[#f5f5f5] mt-1 rounded-t-md border-b-4 border-teal-400">
                        <div className="bg-white flex items-center tab-item active-tab-item cursor-pointer">
                            <button
                                className="m-0 p-2 bg-transparent border-0 cursor-pointer"
                                onClick={() => {
                                    console.log('click');
                                }}
                            >
                                console
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
                        <p className="leading-8 inline-flex">
                            Results of{' '}
                            <span className="mx-2">
                                <Button
                                    type="primary"
                                    className="flex items-center bg-green-500 text-white font-semibold run-button"
                                    icon={<FaPlay />}
                                >
                                    Run
                                </Button>
                            </span>{' '}
                            the code.
                        </p>
                    </div>
                </Col>
            </Row>
        </Flex>
    );
}
