import { Button, Flex } from 'antd';

function LandingPage() {
    return (
        <Flex vertical className="h-screen">
            <header className="flex flex-row p-2 justify-between items-center gap-2">
                <div>
                    <p className="text-3xl my-0 font-bold">Pody</p>
                </div>
                <div className="flex flex-row gap-2">
                    <Button type="primary" shape="round" size="large">
                        Login
                    </Button>
                    <Button shape="round" size="large">
                        Sign Up
                    </Button>
                </div>
            </header>
            <main className="h-full flex flex-col items-center justify-center">
                <div className="container flex flex-col items-center">
                    <p className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lavender to-rose-300 m-0">
                        Unleash Your Code.
                    </p>
                    <p className="text-7xl font-medium text- m-0">
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
                            }}
                        >
                            Try for free
                        </Button>
                    </div>
                </div>
            </main>
        </Flex>
    );
}

export default LandingPage;
