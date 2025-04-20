import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './HomeNavbar.jsx';
import { CartProvider } from "@/context/cart";

const HomeLayout = () => {
    return (
        <CartProvider>
            <Navbar />
            <main className="flex flex-col p-4 pt-22"> {/* Aumentado el padding-top y añadido margin-top */}
                <Outlet />
            </main>
        </CartProvider>
    );
}

export default HomeLayout;