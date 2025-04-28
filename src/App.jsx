import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/public/Home.jsx';
import PublicRoutes from './routes/public.routes.jsx';
import { AuthProvider } from './context/auth.jsx';
function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<HomeLayout />}>
            <Route path="*" element={<PublicRoutes />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
