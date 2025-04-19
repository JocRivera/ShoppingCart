import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './HomeNavbar.jsx';

const HomeLayout = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="flex flex-col p-4 pt-24 mt-4"> {/* Aumentado el padding-top y añadido margin-top */}
                <Outlet />
            </main>
        </div>
    );
}

export default HomeLayout;