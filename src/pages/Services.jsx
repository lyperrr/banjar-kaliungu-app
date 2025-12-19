import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DetailServices from "@/components/DetailServices";

const Services = () => {
  useEffect(() => {
    document.title = "Layanan - Banjar Kaliungu Kaja";

    // Update meta description for services overview
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Pelajari berbagai layanan yang tersedia di Banjar Kaliungu Kaja, termasuk kesehatan, keamanan, dan layanan masyarakat lainnya."
      );
    }
  }, []);

  return <Routes></Routes>;
};

export default Services;
