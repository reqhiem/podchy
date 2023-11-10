import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import LandingLayout from '@layouts/LandingLayout';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <LandingLayout>
            <main className="h-full flex flex-col items-center justify-center">
                <div className="container flex flex-col items-center">
                    <p className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lavender to-rose-300 m-0">
                        Unleash Your Code.
                    </p>
                    <p className="text-6xl font-semibold text- m-0">
                        Create, Collaborate, Innovate!
                    </p>
                    <p className="text-3xl text-gray-500 text-center">
                        Elevate your code with seamless <br />
                        and Cloud-powered execution.
                    </p>

                    <div className="flex flex- gap-3">
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            style={{
                                paddingRight: '4rem',
                                paddingLeft: '4rem',
                                fontWeight: 'bold',
                            }}
                            onClick={() => {
                                navigate('/signup');
                            }}
                        >
                            Get a demo
                        </Button>
                        <Button
                            shape="round"
                            size="large"
                            style={{
                                paddingRight: '4rem',
                                paddingLeft: '4rem',
                                fontWeight: 'bold',
                            }}
                            onClick={() => {
                                navigate('/signup');
                            }}
                        >
                            Try for free
                        </Button>
                    </div>
                </div>
            </main>
        </LandingLayout>
    );
}

export default LandingPage;
