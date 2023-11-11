import { Button, Form, Input, notification } from 'antd';
import LandingLayout from '@layouts/LandingLayout';
import SignUpImage from '@assets/images/signup-undraw.svg?react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_again: string;
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const handleSubmit = (values: FieldType) => {
        console.log(values);
        axios
            .post(
                `${import.meta.env.VITE_PODCHY_API_URL}/api/auth/register`,
                values,
            )
            .then((res) => {
                const { username } = res.data;
                notification.success({
                    placement: 'topRight',
                    message: 'Register success',
                    description: `Please login to continue as ${username}`,
                });
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                notification.error({
                    placement: 'topRight',
                    message: 'Register failed',
                    description: 'Some error occured. Please try again.',
                });
            });
    };
    return (
        <LandingLayout>
            <main className="h-full flex flex-col items-center justify-center">
                <div className="rounded-md shadow-lg py-10 px-16 flex gap-10 bg-white">
                    <div className="">
                        <h1 className="text-4xl">
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lavender to-rose-300">
                                Welcome
                            </span>{' '}
                            <br /> to Podchy.
                        </h1>
                        <SignUpImage className="w-60 h-60" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2>Register</h2>
                        <Form
                            name="login"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item<FieldType>
                                label="First name"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your first name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Last Name"
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
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
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
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
                            <Form.Item<FieldType>
                                label="Password again"
                                name="password_again"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your repeated password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </main>
        </LandingLayout>
    );
};
export default RegisterPage;
