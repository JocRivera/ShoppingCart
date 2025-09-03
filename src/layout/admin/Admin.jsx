import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../public/HomeNavbar";
import Sidebar from "./Sidebar";

export default function AdminLayout() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col p-4 pt-24 mt-4">
        <Outlet />
      </main>
    </div>
  );
}
