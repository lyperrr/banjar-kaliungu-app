import React from "react";
import Navbar from "@/components/Navbar.jsx";

const AppLayout = ({ children, showNavbar = true /*showFooter = true*/ }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="h-1000">{children}</main>
      {/* {showFooter && <Footer />} */}
    </div>
  );
};

export default AppLayout;
