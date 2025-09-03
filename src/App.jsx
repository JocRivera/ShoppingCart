import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/public/Home.jsx';
import PublicRoutes from './routes/public.routes.jsx';
import { AuthProvider } from './context/auth.jsx';
import { CartProvider } from './context/cart.jsx';
import ProtectedRoutes from './routes/protected.routes.jsx';
import AdminLayout from './layout/admin/Admin.jsx';
import ClientLayout from './layout/client/Client.jsx';
import AdminRoutes from './routes/admin.routes.jsx';
import ClientRoutes from './routes/client.routes.jsx';
function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<HomeLayout />}>
              <Route path="*" element={<PublicRoutes />} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={['user']} />}>
            <Route path="/client" element={<ClientLayout />}>
              <Route path="*" element={<ClientRoutes />} />
            </Route>
          </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
