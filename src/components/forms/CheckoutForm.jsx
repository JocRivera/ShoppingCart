"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CheckCircle, Truck, CreditCard } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
})

export function CheckoutForm() {
    const [step, setStep] = useState(1);
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
        },
        mode: "onChange", // Habilita validación en tiempo real al cambiar los campos

    })
    const { formState } = form;
    const { isValid, errors, touchedFields, dirtyFields } = formState;
    const isCurrentStepValid = () => {
        if (step === 1) {
            // Lista de campos obligatorios para el paso 1
            const requiredFields = ['fullName', 'email', 'address', 'city', 'postalCode', 'phone'];

            // Verifica si todos los campos están llenos y sin errores
            return requiredFields.every(field => {
                // Un campo es válido si está "sucio" (se ha modificado) y no tiene errores
                return dirtyFields[field] && !errors[field];
            });
        }

        // Para el paso 2, puedes añadir validación específica si es necesario
        if (step === 2) {
            return true; // Modificar según necesidad con los campos de pago
        }

        return true; // Para el paso 3
    };

    // 2. Función de envío
    const onSubmit = (values) => {
        console.log("Datos del checkout:", values)
        // Si estamos en el paso 1 o 2, avanzamos al siguiente paso
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Aquí puedes agregar lógica como enviar al backend, redireccionar, etc.
            console.log("Formulario completado:", values);
        }
    }

    // Función para volver al paso anterior
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    // 3. Retornar el formulario
    return (
        <Form {...form}>
            {/* Progress Bar */}
            <div className="flex items-center mb-5 mt-5">
                <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        {step > 1 ? <CheckCircle size={16} /> : '1'}
                    </div>
                    <span className="ml-2 text-sm font-medium">Envío</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        {step > 2 ? <CheckCircle size={16} /> : '2'}
                    </div>
                    <span className="ml-2 text-sm font-medium">Pago</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        {step > 3 ? <CheckCircle size={16} /> : '3'}
                    </div>
                    <span className="ml-2 text-sm font-medium">Confirmar</span>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <Truck className="mr-2 text-blue-600" size={20} />
                            <h3 className="text-lg font-semibold">Información de Envío</h3>
                        </div>
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
                                        <Input type="email" placeholder="ejemplo@correo.com" {...field} />
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
                    <><div className="flex items-center mb-4">
                        <CreditCard className="mr-2 text-blue-600" size={20} />
                        <h3 className="text-lg font-semibold">Método de Pago</h3>
                    </div>
                        <Card className="border-0 shadow-none ">
                            <CardContent className="grid gap-5">
                                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                                    <div>
                                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
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
                                            Card
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value="paypal"
                                            id="paypal"
                                            className="peer sr-only" />
                                        <Label
                                            htmlFor="paypal"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Icons.paypal className="mb-3 h-6 w-6" />
                                            Paypal
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                                        <Label
                                            htmlFor="apple"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Icons.apple className="mb-3 h-6 w-6" />
                                            MercadoPago
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="First Last" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="number">Card number</Label>
                                    <Input id="number" placeholder="" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="month">Expires</Label>
                                        <Select>
                                            <SelectTrigger id="month">
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">January</SelectItem>
                                                <SelectItem value="2">February</SelectItem>
                                                <SelectItem value="3">March</SelectItem>
                                                <SelectItem value="4">April</SelectItem>
                                                <SelectItem value="5">May</SelectItem>
                                                <SelectItem value="6">June</SelectItem>
                                                <SelectItem value="7">July</SelectItem>
                                                <SelectItem value="8">August</SelectItem>
                                                <SelectItem value="9">September</SelectItem>
                                                <SelectItem value="10">October</SelectItem>
                                                <SelectItem value="11">November</SelectItem>
                                                <SelectItem value="12">December</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Select>
                                            <SelectTrigger id="year">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 10 }, (_, i) => (
                                                    <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                                                        {new Date().getFullYear() + i}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="CVC" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card></>
                )}

                {step === 3 && (
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">Confirmar Pedido</h2>
                        {/* Aquí puedes mostrar un resumen del pedido */}
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleBack}
                        >
                            Volver
                        </Button>
                    )}
                    <Button
                        className={`${step > 1 ? 'ml-auto' : 'w-full'} bg-green-600 hover:bg-green-700 text-white`}
                        type="submit"
                        disabled={!isCurrentStepValid()}
                    >
                        {step === 3 ? "Confirmar Pedido" : "Continuar"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}