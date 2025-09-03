import { useAuth } from '../context/auth';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes({ allowedRoles = [] }) {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) return <Navigate to='/' replace />;

    // Verificar que user exista antes de intentar acceder a user.rol
    if (!user) return <Navigate to='/' replace />;

    // Verificar si el rol es permitido
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;