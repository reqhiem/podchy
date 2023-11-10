import { Route, Routes } from "react-router-dom";

import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import HomePage from '@pages/HomePage';
import CpodPage from '@pages/CpodPage';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route path="/~" element={<HomePage />} />
            <Route path="/:username/:cpod" element={<CpodPage />} />
        </Routes>
    );
};

export default MainRoutes;
