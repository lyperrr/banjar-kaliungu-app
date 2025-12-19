import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import News from "@/pages/News";
import History from "@/pages/History";
import CustomaryLaw from "@/pages/CustomaryLaw";
import DetailServices from "@/components/DetailServices";

function App() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);


  return (
    <Routes>
      <Route
        path="/"
        index
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route path="/pelayanan" element={<Navigate to="/#pelayanan" replace />} />
      <Route
        path="/pelayanan/:serviceName"
        element={
          <AppLayout showNavbar={false}>
            <DetailServices />
          </AppLayout>
        }
      />
      <Route
        index
        element={
          <AppLayout>
            <Navigate to="/" replace />
          </AppLayout>
        }
      />
      <Route
        path="/berita"
        element={
          <AppLayout>
            <News />
          </AppLayout>
        }
      />
      <Route
        path="/sejarah"
        element={
          <AppLayout>
            <History />
          </AppLayout>
        }
      />
      <Route
        path="/detail-sejarah"
        element={
          <AppLayout>
            <History />
          </AppLayout>
        }
      />
      <Route
        path="/awig-awig"
        element={
          <AppLayout>
            <CustomaryLaw />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;
