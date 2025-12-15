import React from "react";
import Navbar from "@/components/Navbar";
import FloatingAction from "@/components/FloatingAction";

const AppLayout = ({
  children,
  showNavbar = true,
  /*showFooter = true*/ showFloatingAction = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="h-1000">{children}</main>
      {/* {showFooter && <Footer />} */}
      {showFloatingAction && <FloatingAction />}
    </div>
  );
};

export default AppLayout;
