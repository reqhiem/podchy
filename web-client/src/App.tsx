import {ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';
import './App.css';

function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#9f48d5',
                    },
                }}
            >
                <BrowserRouter>
                    <MainRoutes />
                </BrowserRouter>
            </ConfigProvider>
        </>
    );
}

export default App;
