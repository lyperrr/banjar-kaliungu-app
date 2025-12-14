import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout.jsx";
import Home from "@/pages/Home.jsx";
import Services from "@/pages/Services.jsx";
import News from "@/pages/News.jsx";
import History from "@/pages/History.jsx";
import CustomaryLaw from "@/pages/CustomaryLaw.jsx";

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
