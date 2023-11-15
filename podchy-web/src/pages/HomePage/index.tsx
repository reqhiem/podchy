import {
    Avatar,
    Button,
    Dropdown,
    Flex,
    Form,
    Input,
    List,
    Modal,
    Select,
    notification,
} from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import {
    BiSolidShareAlt,
    BiLogoJavascript,
    BiLogoPython,
} from 'react-icons/bi';
import { useEffect, useMemo, useState } from 'react';
import Spinner from '@components/Spinner';
import './styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

enum Permission {
    OWNER = 'OWNER',
    INVITED = 'INVITED',
}

type UserDetail = {
    username: string;
    email: string;
};

type UserPermission = {
    user: UserDetail;
    permission: Permission;
};

type Cpod = {
    cid: string;
    name: string;
    language: string;
    users: UserPermission[];
};

type NewCpodForm = {
    name: string;
    language: string;
};

export default function HomePage() {
    const [loaded, setLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [cpods, setCpods] = useState<Cpod[]>([]);
    const authContextValues = useMemo(
        () => ({
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            fullName: localStorage.getItem('fullName'),
            email: localStorage.getItem('email'),
        }),
        [],
    );

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_PODCHY_API_URL}/api/cpod`, {
                headers: {
                    Authorization: `Token ${authContextValues.token}`,
                },
            })
            .then((res) => {
                setCpods(res.data);
                setLoaded(true);
            });
    }, [authContextValues.token]);

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
                    <div className="flex flex-row gap-3">
                        <LogoutOutlined />
                        Logout
                    </div>
                </>
            ),
        },
    ];

    const optionsItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: (
                <>
                    <div className="flex flex-row gap-4 items-center pr-10">
                        <AiTwotoneEdit />
                        Edit
                    </div>
                </>
            ),
        },
        {
            key: 'share',
            label: (
                <>
                    <div className="flex flex-row gap-4 items-center pr-10">
                        <BiSolidShareAlt />
                        Share
                    </div>
                </>
            ),
        },
        {
            key: 'delete',
            label: (
                <>
                    <div className="flex flex-row gap-4 items-center pr-10 text-red-500">
                        <AiFillDelete />
                        Delete
                    </div>
                </>
            ),
        },
    ];

    const handleDeleteCpod = (cid: string) => {
        axios
            .delete(`${import.meta.env.VITE_PODCHY_API_URL}/api/cpod/${cid}`, {
                headers: {
                    Authorization: `Token ${authContextValues.token}`,
                },
            })
            .then((res) => {
                if (res.status === 204) {
                    setCpods(cpods.filter((cpod) => cpod.cid !== cid));
                    notification.success({
                        placement: 'topRight',
                        message: 'Delete Cpod success',
                        description: 'Cpod successfully deleted',
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                notification.error({
                    placement: 'topRight',
                    message: 'Delete Cpod failed',
                    description: 'Some error occured, please try again later',
                });
            });
    };

    const handleOnClickOption = (option: string, cid: string) => {
        if (option === 'delete') {
            handleDeleteCpod(cid);
        }
    };

    const handleCreateCpod = (values: NewCpodForm) => {
        axios
            .post(`${import.meta.env.VITE_PODCHY_API_URL}/api/cpod`, values, {
                headers: {
                    Authorization: `Token ${authContextValues.token}`,
                },
            })
            .then((res) => {
                setCpods([res.data, ...cpods]);
                setOpenModal(false);
            })
            .catch((err) => {
                console.error(err);
                notification.error({
                    placement: 'topRight',
                    message: 'Create Cpod failed',
                    description: 'Some error occured, please try again later',
                });
            });
    };

    return (
        <Flex vertical>
            <header className="flex justify-between items-center border-0 border-b-2 border-solid border-gray-300 px-4 py-1">
                <p className="font-bold text-xl m-0 text-lavender">Podchy.</p>
                <div className="flex items-center gap-2">
                    <Modal
                        width={360}
                        open={openModal}
                        footer={null}
                        onCancel={() => setOpenModal(false)}
                    >
                        <Form layout="vertical" onFinish={handleCreateCpod}>
                            <p className="text-xl m-0 font-semibold mb-3">
                                Create a new Cpod
                            </p>
                            <Form.Item<NewCpodForm>
                                name="name"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill the name of Cpod',
                                    },
                                ]}
                            >
                                <Input placeholder="Cpod name" />
                            </Form.Item>
                            <Form.Item<NewCpodForm>
                                name="language"
                                label="Primary language"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please fill the primary language',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a language"
                                    options={[
                                        {
                                            label: (
                                                <div className="flex gap-2 items-center">
                                                    <BiLogoPython />
                                                    Python
                                                </div>
                                            ),
                                            value: 'python',
                                        },
                                        {
                                            label: (
                                                <div className="flex gap-2 items-center">
                                                    <BiLogoJavascript />
                                                    JavaScript
                                                </div>
                                            ),
                                            value: 'javascript',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                                className="mt-2"
                            >
                                Create
                            </Button>
                        </Form>
                    </Modal>
                    <Button
                        icon={<PlusOutlined />}
                        className="bg-transparent hover:bg-white"
                        onClick={() => setOpenModal(true)}
                    />
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
            <main className="flex flex-col items-center">
                {loaded ? (
                    <div className="container">
                        <h1 className="text-3xl font-medium">Home</h1>
                        <div className="bg-white md:w-full lg:w-full xl:w-1/2 p-3 rounded-lg shadow-md">
                            <div className="flex flex-row justify-between">
                                <h2 className="m-0">All Cpods</h2>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    className="flex items-center"
                                    onClick={() => setOpenModal(true)}
                                >
                                    Create new Cpod
                                </Button>
                            </div>
                            <div className="">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={cpods}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <>
                                                    <Dropdown
                                                        placement="bottomRight"
                                                        menu={{
                                                            items: optionsItems,
                                                            onClick: ({
                                                                key,
                                                            }) => {
                                                                handleOnClickOption(
                                                                    key,
                                                                    item.cid,
                                                                );
                                                            },
                                                        }}
                                                        trigger={['click']}
                                                    >
                                                        <Button
                                                            icon={
                                                                <SlOptionsVertical />
                                                            }
                                                        />
                                                    </Dropdown>
                                                </>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                                }
                                                title={
                                                    <Link
                                                        to={`/@${authContextValues.username}/${item.cid}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                }
                                                description={`@${item.users[0].user.username}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Spinner />
                )}
            </main>
        </Flex>
    );
}
