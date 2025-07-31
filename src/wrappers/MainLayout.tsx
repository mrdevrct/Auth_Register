import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
