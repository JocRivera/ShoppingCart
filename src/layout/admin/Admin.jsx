import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../public/HomeNavbar";
import Sidebar from "../client/Sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <main className="flex flex-col p-4 pt-24 mt-4">
        <Outlet />
      </main>
    </div>
  );
}
