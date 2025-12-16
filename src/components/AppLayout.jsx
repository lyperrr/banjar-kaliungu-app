import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAction from "@/components/FloatingAction";

const AppLayout = ({
  children,
  showNavbar = true,
  showFooter = true,
  showFloatingAction = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main>{children}</main>
      {showFloatingAction && <FloatingAction />}
      {showFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
