import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/public/Home.jsx';
import PublicRoutes from './routes/public.routes.jsx';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeLayout />}>
          <Route path="*" element={<PublicRoutes />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
