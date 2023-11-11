import { GithubOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

type LandingLayoutProps = {
    children: React.ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {
    const navigate = useNavigate();
    return (
        <Flex vertical className="h-screen">
            <header className="flex flex-row p-2 justify-between items-center gap-2">
                <Link to={'/'}>
                    <p className="text-3xl my-0 font-bold text-lavender">
                        Podchy.
                    </p>
                </Link>
                <div className="flex flex-row gap-2">
                    <div className="flex items-center text-xl">
                        <GithubOutlined />
                    </div>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        shape="round"
                        size="large"
                        onClick={() => {
                            navigate('/signup');
                        }}
                    >
                        Sign Up
                    </Button>
                </div>
            </header>
            {children}
        </Flex>
    );
};

export default LandingLayout;
