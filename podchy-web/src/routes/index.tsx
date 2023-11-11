import { Route, Routes } from "react-router-dom";

import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import HomePage from '@pages/HomePage';
import CpodPage from '@pages/CpodPage';
import PrivateRoutes from './PrivateRoutes';

const MainRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<PrivateRoutes />}>
                <Route path="/~" element={<HomePage />} />
                <Route path="/:username/:cpod" element={<CpodPage />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;
