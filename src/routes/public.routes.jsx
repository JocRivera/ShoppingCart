// src/routes/public.routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/main.jsx';
import { CheckoutForm } from '../components/forms/CheckoutForm.jsx';
import { CheckoutSuccess } from '../components/forms/CheckoutSuccess.jsx'; // <-- Importa tu componente de éxito

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutForm />} />
      {/* AQUÍ ES DONDE DEFINES LA RUTA PARA LA REDIRECCIÓN DE MP */}
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/failure" element={<div>Pago Fallido</div>} /> {/* O un componente para fallo */}
      <Route path="/checkout/pending" element={<div>Pago Pendiente</div>} /> {/* O un componente para pendiente */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default PublicRoutes;