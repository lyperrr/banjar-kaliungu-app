import React from "react";
import Navbar from "@/components/Navbar.jsx";

const AppLayout = ({ children, showNavbar = true /*showFooter = true*/ }) => {
  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <main>{children}</main>
      {/* {showFooter && <Footer />} */}
    </div>
  );
};

export default AppLayout;
