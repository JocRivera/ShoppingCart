import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/main.jsx';
import { LoginForm } from '../components/login-form';
import { RegisterForm } from '../components/register-form';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default PublicRoutes;