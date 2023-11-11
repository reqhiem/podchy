import { Button, Form, Input, notification } from 'antd';
import LandingLayout from '@layouts/LandingLayout';
import SignUpImage from '@assets/images/signup-undraw.svg?react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const navigate = useNavigate();

    const openNotification = (message: string) => {
        notification.error({
            placement: 'topRight',
            message: 'Login failed',
            description: message,
        });
    };

    const handleSubmit = (values: FieldType) => {
        axios
            .post(
                `${import.meta.env.VITE_PODCHY_API_URL}/api/auth/login`,
                values,
            )
            .then((res) => {
                console.log(res.data);
                const { key, user } = res.data;

                localStorage.setItem('token', key);
                localStorage.setItem('username', user.username);
                localStorage.setItem('email', user.email);
                localStorage.setItem(
                    'fullName',
                    `${user.first_name} ${user.last_name}`,
                );
                navigate('/~');
            })
            .catch((err) => {
                console.error(err);
                openNotification(err.response.data.non_field_errors[0]);
            });
    };
    return (
        <LandingLayout>
            <main className="h-full flex flex-col items-center justify-center">
                <div className="rounded-md shadow-lg py-10 px-16 flex gap-10 bg-white">
                    <div className="">
                        <h1 className="text-4xl">
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lavender to-rose-300">
                                Welcome back
                            </span>{' '}
                            <br /> to Podchy.
                        </h1>
                        <SignUpImage className="w-60 h-60" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2>Log In</h2>
                        <Form
                            name="login"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </main>
        </LandingLayout>
    );
};
export default LoginPage;
