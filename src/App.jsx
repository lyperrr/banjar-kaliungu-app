import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import News from "@/pages/News";
import History from "@/pages/History";
import CustomaryLaw from "@/pages/CustomaryLaw";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/pelayanan/*"
        element={
          <AppLayout>
            <Services />
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
