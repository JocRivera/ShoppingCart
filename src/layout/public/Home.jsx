import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './HomeNavbar.jsx';
import { CartProvider } from "@/context/cart";

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <main className="flex flex-col p-4 pt-22">
                <Outlet />
            </main>
        </>
    );
}

export default HomeLayout;