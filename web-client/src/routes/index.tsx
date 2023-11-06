import { Route, Routes } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

const MainRoutes = () => {
    return <Routes>
        <Route path="/" element={<LandingPage />} />
    </Routes>
};

export default MainRoutes;
