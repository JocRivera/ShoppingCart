"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle, Truck, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Loader2 } from "lucide-react";
import OrderService from "@/services/order/fetch";
import { useCart } from "@/context/cart";
// Esquema de validación expandido
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre completo debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  city: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
  postalCode: z.string().min(5, {
    message: "El código postal debe tener al menos 5 caracteres.",
  }),
  phone: z.string().min(8, {
    message: "El número de teléfono debe tener al menos 8 caracteres.",
  }),
  paymentMethod: z.string().optional(),
  cardholderName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpMonth: z.string().optional(),
  cardExpYear: z.string().optional(),
  cardCvc: z.string().optional(),
});

// Reemplaza esto con tu clave pública real de MercadoPago
const MERCADOPAGO_PUBLIC_KEY = "APP_USR-9193559a-c400-417e-a283-7a78b9326c81";

export function CheckoutForm() {
  const { clearCart, cart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("mercadopago");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  // Inicializa MercadoPago cuando se monta el componente
  useEffect(() => {
    initMercadoPago(MERCADOPAGO_PUBLIC_KEY);
  }, []);

  // 1. Inicializar el formulario con los campos expandidos
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      paymentMethod: "mercadopago",
      cardholderName: "",
      cardNumber: "",
      cardExpMonth: "",
      cardExpYear: "",
      cardCvc: "",
    },
    mode: "onChange",
  });

  // Extraer los métodos y estado del formulario
  const { formState, watch } = form;
  const { isValid, errors, touchedFields, dirtyFields } = formState;
  const watchPaymentMethod = watch("paymentMethod");

  // Cambiar el método de pago cuando el usuario selecciona una opción
  useEffect(() => {
    if (watchPaymentMethod) {
      setSelectedPaymentMethod(watchPaymentMethod);
    }
  }, [watchPaymentMethod]);

  // Función para verificar si el paso actual es válido
  const isCurrentStepValid = () => {
    if (step === 1) {
      // Lista de campos obligatorios para el paso 1
      const requiredFields = [
        "fullName",
        "email",
        "address",
        "city",
        "postalCode",
        "phone",
      ];

      // Verifica si todos los campos están llenos y sin errores
      return requiredFields.every((field) => {
        // Un campo es válido si está "sucio" (se ha modificado) y no tiene errores
        return dirtyFields[field] && !errors[field];
      });
    }

    // Para el paso 2, validamos según el método de pago seleccionado
    if (step === 2) {
      if (selectedPaymentMethod === "mercadopago") {
        // Para MercadoPago, siempre permitimos continuar ya que la validación es manejada por su SDK
        return true;
      } else if (selectedPaymentMethod === "card") {
        // Para tarjeta, verificamos los campos específicos
        const cardFields = [
          "cardholderName",
          "cardNumber",
          "cardExpMonth",
          "cardExpYear",
          "cardCvc",
        ];
        return cardFields.every(
          (field) => dirtyFields[field] && !errors[field]
        );
      } else {
        // Para otros métodos como PayPal
        return true;
      }
    }

    return true; // Para el paso 3
  };

  // 2. Función para crear preferencia de pago de MercadoPago
  const createPreference = async (values) => {
    console.log(cart);

    const items = cart.map((product) => ({
      title: product.tittle,
      quantity: product.quantity || 1,
      unit_price: parseFloat(product.price),
    }));

    try {
      setIsProcessingPayment(true);

      // Esta llamada se debe hacer al backend para no exponer tu clave secreta
      const response = await fetch(
        import.meta.env.VITE_BACK_URL + "api/payments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items,
            payer: {
              name: values.fullName,
              email: "test_user_7368751134657201012@testuser.com",
              address: {
                street_name: values.address,
                zip_code: values.postalCode,
              },
            },
            back_urls: {
              success:
                "https://r6q0x0dq-5173.use2.devtunnels.ms/checkout/success", // <--- Tu frontend leerá esto
              failure:
                "https://r6q0x0dq-5173.use2.devtunnels.ms/checkout/failure",
              pending:
                "https://r6q0x0dq-5173.use2.devtunnels.ms/checkout/pending",
            },
            auto_return: "approved",
          }),
        }
      );
      const data = await response.json();
      console.log("Preferencia creada:", data);
      return data.preference_id;
    } catch (error) {
      console.error("Error al crear preferencia:", error);
      return null;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // 3. Función para manejar el éxito del pago con MercadoPago
  const handlePaymentSuccess = (paymentResult) => {
    console.log("Pago exitoso:", paymentResult);
    // Aquí puedes manejar el resultado exitoso (guardar en DB, mostrar confirmación, etc.)
    setStep(3); // Avanzar al paso final
  };

  const onSubmit = async (values) => {
    if (step === 1) {
      setStep(2); // Avanza al paso de pago
      if (selectedPaymentMethod === "mercadopago") {
        const shippingAddressData = {
          street: values.address,
          city: values.city,
          zip: values.postalCode,
          // ...otros campos
        };
        // ⭐ Guarda la dirección en localStorage ANTES de la redirección a MP
        localStorage.setItem(
          "tempShippingAddress",
          JSON.stringify(shippingAddressData)
        );
        const prefId = await createPreference(values);
        if (prefId) {
          setPreferenceId(prefId);
        } else {
          alert(
            "Hubo un error al procesar el pago. Por favor intenta de nuevo."
          );
        }
      } else {
        // Si no es MercadoPago, procede con la lógica actual
        try {
          const orderData = {
            shippingAddress: {
              street: form.getValues("address"),
              city: form.getValues("city"),
              zip: form.getValues("postalCode"),
            },
            paymentMethod: selectedPaymentMethod,
          };
          const orderService = new OrderService();
          await orderService.createOrder(orderData);
          clearCart();
        } catch (error) {
          console.error("Error al crear la orden:", error);
        }
        setStep(3); // Avanza al paso 3 solo para otros métodos
      }
    } else if (step === 2 && selectedPaymentMethod !== "mercadopago") {
      // Esta parte es para la lógica de otros métodos de pago que no sean MP
      // (ej. tarjeta de crédito directamente en tu sitio, PayPal)
      // No se ejecutará para MercadoPago después de los cambios anteriores.
      console.log("Procesando pago con método:", selectedPaymentMethod);
      try {
        const orderData = {
          shippingAddress: {
            street: form.getValues("address"),
            city: form.getValues("city"),
            zip: form.getValues("postalCode"),
          },
          paymentMethod: selectedPaymentMethod,
        };
        const orderService = new OrderService();
        await orderService.createOrder(orderData);
        // clearCart();
      } catch (error) {
        console.error("Error al crear la orden:", error);
      }
      setStep(3);
    }
    // NOTA FINAL: El paso 3 para MercadoPago se activará cuando el usuario
    // regrese de la URL de éxito de Mercado Pago.
  };

  // Función para volver al paso anterior
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // 5. Retornar el formulario
  return (
    <Form {...form}>
      {/* Progress Bar - no cambia */}
      <div className="flex items-center mb-5 mt-5">
        <div
          className={`flex items-center ${
            step >= 1 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {step > 1 ? <CheckCircle size={16} /> : "1"}
          </div>
          <span className="ml-2 text-sm font-medium">Envío</span>
        </div>
        <div
          className={`flex-1 h-1 mx-4 ${
            step >= 2 ? "bg-blue-600" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`flex items-center ${
            step >= 2 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {step > 2 ? <CheckCircle size={16} /> : "2"}
          </div>
          <span className="ml-2 text-sm font-medium">Pago</span>
        </div>
        <div
          className={`flex-1 h-1 mx-4 ${
            step >= 3 ? "bg-blue-600" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`flex items-center ${
            step >= 3 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {step > 3 ? <CheckCircle size={16} /> : "3"}
          </div>
          <span className="ml-2 text-sm font-medium">Confirmar</span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            {/* Paso 1: Mantiene los campos de envío existentes */}
            <div className="flex items-center mb-4">
              <Truck className="mr-2 text-blue-600" size={20} />
              <h3 className="text-lg font-semibold">Información de Envío</h3>
            </div>

            {/* Los campos del formulario existentes permanecen igual */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre y apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle, número, colonia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Postal</FormLabel>
                    <FormControl>
                      <Input placeholder="Código Postal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Número telefónico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center mb-4">
              <CreditCard className="mr-2 text-blue-600" size={20} />
              <h3 className="text-lg font-semibold">Método de Pago</h3>
            </div>
            <Card className="border-0 shadow-none">
              <CardContent className="grid gap-5">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        className="grid grid-cols-3 gap-4"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div>
                          <RadioGroupItem
                            value="card"
                            id="card"
                            className="peer sr-only"
                            disabled={true}
                          />
                          <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="mb-3 h-6 w-6"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <path d="M2 10h20" />
                            </svg>
                            Tarjeta
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="PayPal"
                            id="paypal"
                            className="peer sr-only"
                            disabled={false}
                          />
                          <Label
                            htmlFor="paypal"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Icons.paypal className="mb-3 h-6 w-6" />
                            PayPal
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="mercadopago"
                            id="mercadopago"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="mercadopago"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Icons.mercadoPago className="mb-3 h-6 w-6" />
                            MercadoPago
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormItem>
                  )}
                />

                {/* Contenido específico para cada método de pago */}
                {selectedPaymentMethod === "card" && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardholderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del titular</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre como aparece en la tarjeta"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de tarjeta</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="cardExpMonth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mes</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Mes" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem key={i} value={`${i + 1}`}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardExpYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Año</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Año" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={`${new Date().getFullYear() + i}`}
                                  >
                                    {new Date().getFullYear() + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardCvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123"
                                {...field}
                                maxLength={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "mercadopago" && (
                  <div className="p-4 border rounded-md bg-blue-50">
                    {preferenceId && (
                      <div className="flex justify-center mt-4">
                        <div style={{ width: "300px" }}>
                          <Wallet
                            initialization={{
                              preferenceId: preferenceId,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedPaymentMethod === "PayPal" && (
                  <div className="p-4 border rounded-md bg-blue-50 text-center">
                    <p className="mb-4">
                      Al hacer clic en "Continuar", serás redirigido a PayPal
                      para completar tu pago.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {step === 3 && (
          <div className="space-y-4 p-6 border rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="text-emerald-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold text-emerald-700">
                ¡Pago Exitoso!
              </h2>
            </div>
            <p className="text-center text-gray-700">
              Tu pedido ha sido procesado con éxito. Hemos enviado un correo de
              confirmación a tu dirección de email.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Detalles del Pedido:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Número de Orden:</div>
                <div className="font-medium">
                  ORD-{Math.floor(Math.random() * 10000)}
                </div>
                <div>Método de Pago:</div>
                <div className="font-medium">
                  {selectedPaymentMethod === "mercadopago"
                    ? "MercadoPago"
                    : selectedPaymentMethod === "PayPal"
                    ? "PayPal"
                    : "Tarjeta"}
                </div>
                <div>Fecha:</div>
                <div className="font-medium">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isProcessingPayment}
            >
              Volver
            </Button>
          )}

          {(step !== 2 ||
            selectedPaymentMethod !== "mercadopago" ||
            !preferenceId) && (
            <Button
              className={`${
                step > 1 ? "ml-auto" : "w-full"
              } bg-emerald-600 hover:bg-emerald-700 text-white`}
              type="submit"
              disabled={!isCurrentStepValid() || isProcessingPayment}
            >
              {isProcessingPayment && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {step === 3 ? "Ir a Mis Pedidos" : "Continuar"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
