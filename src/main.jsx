import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Loader from "@/components/Loader";

function Root() {
  const [loaded, setLoaded] = useState(false);

  return (
    <StrictMode>
      {!loaded && <Loader onFinish={() => setLoaded(true)} />}
      <BrowserRouter>{loaded && <App />}</BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
