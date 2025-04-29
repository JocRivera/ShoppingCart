import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/main.jsx';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default PublicRoutes;