import { Avatar, Button, Dropdown, Flex, List } from 'antd';
import type { MenuProps } from 'antd';
import './styles.css';
import { LogoutOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { BiSolidShareAlt } from 'react-icons/bi';

type DataType = {
    title: string;
    owner: string;
    picture: string;
    loading: boolean;
};

export default function HomePage() {
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
            <header className="flex justify-between items-center border-0 border-b-2 border-solid border-gray-300 px-4">
                <p className="font-bold text-xl m-0 text-lavender">Podchy.</p>
                <div className="flex items-center gap-2">
                    <Button
                        icon={<PlusOutlined />}
                        className="bg-transparent hover:bg-white"
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
                <div className="container">
                    <h1 className="text-3xl font-medium">Home</h1>
                    <div className="bg-white md:w-full lg:w-full xl:w-1/2 p-3 rounded-lg shadow-md">
                        <div className="flex flex-row justify-between">
                            <h2 className="m-0">All Cpods</h2>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="flex items-center"
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
                                                <Avatar src={item.picture} />
                                            }
                                            title={
                                                <a href="https://ant.design">
                                                    {item.title}
                                                </a>
                                            }
                                            description="@reqhiem"
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </Flex>
    );
}
