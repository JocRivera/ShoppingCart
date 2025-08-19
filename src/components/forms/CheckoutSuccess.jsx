import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // <--- Importa useLocation
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Asumo que esta ruta sigue siendo válida
import { Link } from "react-router-dom"; // <--- Importa Link de react-router-dom
import { useCart } from "@/context/cart"; // Asumo que tienes un contexto de carrito

export function CheckoutSuccess() {
  const location = useLocation(); // <--- Usa useLocation aquí
  const searchParams = new URLSearchParams(location.search); // Parsea los parámetros de la URL

  const { clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState("loading"); // loading, approved, rejected, pending, error, unknown
  const [orderCreated, setOrderCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const paymentId = searchParams.get("payment_id"); // ID del pago de Mercado Pago
    const status = searchParams.get("status"); // Estado del pago (approved, rejected, pending)
    const externalReference = searchParams.get("external_reference"); // Tu referencia externa (ej. un ID de carrito/sesión)
    const merchantOrderId = searchParams.get("merchant_order_id"); // ID de la orden de Mercado Pago

    // Solo procesa si hay parámetros de Mercado Pago
    if (!paymentId || !status) {
      setPaymentStatus("unknown");
      setErrorMessage("No se encontraron detalles de pago en la URL.");
      setLoading(false);
      return;
    }

    const processPaymentResult = async () => {
      setLoading(true);
      setOrderCreated(false); // Reset para asegurar que no se cree doble

      if (status === "approved" && !orderCreated) {
        try {
          // Llama a tu backend para verificar el pago y crear la orden
          const response = await fetch(
            "http://localhost:3000/api/orders/create-from-mercadopago", // <--- TU ENDPOINT DE BACKEND
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Si necesitas autenticación, incluye el token aquí:
                // 'Authorization': `Bearer ${tuTokenDeUsuario}`
              },
              body: JSON.stringify({
                paymentId: paymentId,
                status: status,
                externalReference: externalReference, // Tu ID de carrito/sesión/usuario, si lo pasaste
                merchantOrderId: merchantOrderId, // ID de la orden de Mercado Pago
                // Otros datos necesarios que quizás ya tengas en tu backend o en el external_reference
              }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            setPaymentStatus("approved");
            setOrderCreated(true);
            setOrderNumber(data.orderId || `ORD-${Math.floor(Math.random() * 10000)}`); // Usa el ID real de la orden creada
            clearCart(); // Limpia el carrito solo después de la creación exitosa de la orden
          } else {
            console.error("Error al crear la orden desde el backend:", data.message || "Error desconocido");
            setPaymentStatus("error");
            setErrorMessage(data.message || "No se pudo crear la orden.");
          }
        } catch (error) {
          console.error("Error en la conexión con el backend:", error);
          setPaymentStatus("error");
          setErrorMessage("Error de conexión con el servidor. Por favor, intenta de nuevo más tarde.");
        }
      } else if (status === "rejected") {
        setPaymentStatus("rejected");
        setErrorMessage("Tu pago fue rechazado. Por favor, intenta con otro método de pago.");
      } else if (status === "pending") {
        setPaymentStatus("pending");
        setErrorMessage("Tu pago está pendiente de aprobación. Recibirás una confirmación por correo.");
      } else {
        setPaymentStatus("unknown");
        setErrorMessage("Estado de pago desconocido. Por favor, contacta a soporte.");
      }
      setLoading(false);
    };

    // Asegúrate de que solo se ejecute una vez al cargar la página
    if (loading) { // O puedes usar un estado 'isProcessing' más explícito
        processPaymentResult();
    }
  }, [searchParams, clearCart, orderCreated, loading]); // Dependencias del useEffect

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-4 text-lg">Procesando tu pago y confirmando tu pedido...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 border rounded-lg shadow-md max-w-lg mx-auto mt-10 text-center">
      {paymentStatus === "approved" && (
        <>
          <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
            ¡Pago Exitoso! 🎉
          </h2>
          <p className="text-gray-700 mb-4">
            Tu pedido ha sido procesado con éxito. Hemos enviado un correo de
            confirmación a tu dirección de email.
          </p>
          <div className="bg-gray-50 p-4 rounded-md inline-block text-left">
            <h3 className="font-medium mb-2">Detalles del Pedido:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Número de Orden:</div>
              <div className="font-medium">{orderNumber || "N/A"}</div>
              <div>Método de Pago:</div>
              <div className="font-medium">Mercado Pago</div>
              <div>Fecha:</div>
              <div className="font-medium">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/my-orders"> {/* <--- Usa 'to' en lugar de 'href' y no 'passHref' */}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Ver Mis Pedidos
              </Button>
            </Link>
          </div>
        </>
      )}

      {(paymentStatus === "rejected" || paymentStatus === "error") && (
        <>
          <XCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            ¡Pago Fallido! 😔
          </h2>
          <p className="text-gray-700 mb-4">
            {errorMessage || "Lo sentimos, hubo un problema con tu pago."}
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/checkout"> {/* <--- Usa 'to' */}
              <Button variant="destructive">
                Volver al Proceso de Pago
              </Button>
            </Link>
          </div>
        </>
      )}

      {paymentStatus === "pending" && (
        <>
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-yellow-600" />
          <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
            Pago Pendiente ⏳
          </h2>
          <p className="text-gray-700 mb-4">
            {errorMessage || "Tu pago está pendiente de aprobación. Recibirás una confirmación por correo electrónico una vez que se complete el proceso."}
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/my-orders"> {/* <--- Usa 'to' */}
              <Button variant="outline">
                Verificar Estado de Mi Pedido
              </Button>
            </Link>
          </div>
        </>
      )}

      {paymentStatus === "unknown" && (
        <>
          <XCircle className="text-gray-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Estado de Pago Desconocido 🤔
          </h2>
          <p className="text-gray-700 mb-4">
            {errorMessage || "No pudimos determinar el estado de tu pago. Si crees que esto es un error, por favor contacta a soporte."}
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/"> {/* <--- Usa 'to' */}
              <Button variant="outline">Ir a la página principal</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}