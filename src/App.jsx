import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/public/Home.jsx';
import PublicRoutes from './routes/public.routes.jsx';
import { AuthProvider } from './context/auth.jsx';
import { CartProvider } from './context/cart.jsx';
function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<HomeLayout />}>
              <Route path="*" element={<PublicRoutes />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
