import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from '@/modules/admin/Dashboard';
export default function AdminRoutes() {
  return (
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
  );
}
