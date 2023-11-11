import {
    Avatar,
    Button,
    Dropdown,
    Flex,
    Input,
    List,
    Modal,
    Select,
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
import { useMemo, useState } from 'react';
import Spinner from '@components/Spinner';
import './styles.css';
import { Link } from 'react-router-dom';

type DataType = {
    title: string;
    owner: string;
    picture: string;
    loading: boolean;
};

export default function HomePage() {
    const [loaded] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const authContextValues = useMemo(
        () => ({
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            fullName: localStorage.getItem('fullName'),
            email: localStorage.getItem('email'),
        }),
        [],
    );
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

    const data: DataType[] = [
        {
            title: 'workcito',
            owner: '@reqhiem',
            picture: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
            loading: false,
        },
        {
            title: 'python',
            owner: '@reqhiem',
            picture: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
            loading: false,
        },
    ];

    const _items: MenuProps['items'] = [
        {
            key: '1',
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
            key: '2',
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
            key: '3',
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
                        <p className="text-xl m-0 font-semibold">
                            Create a new Cpod
                        </p>
                        <div className="my-3 flex flex-col gap-2">
                            <p className="m-0">Title</p>
                            <Input placeholder="Cpod name" required />
                        </div>
                        <div className="my-3 flex flex-col gap-2">
                            <p className="m-0">Language</p>
                            <Select
                                defaultValue="python"
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
                        </div>
                        <Button block type="primary" className="mt-2">
                            Create
                        </Button>
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
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <>
                                                    <Dropdown
                                                        placement="bottomRight"
                                                        menu={{ items: _items }}
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
                                                    <Avatar
                                                        src={item.picture}
                                                    />
                                                }
                                                title={
                                                    <Link
                                                        to={`/@${authContextValues.username}/${item.title}`}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                }
                                                description="@reqhiem"
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
