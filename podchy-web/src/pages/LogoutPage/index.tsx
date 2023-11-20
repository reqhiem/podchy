import { Navigate } from 'react-router-dom';

export default function LogoutPage() {
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('fullName');
        localStorage.removeItem('email');
    }
    return <Navigate to="/login" replace />;
}
