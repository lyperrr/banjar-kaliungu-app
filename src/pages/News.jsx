import { useEffect } from "react";
import NewsSection from "@/components/NewsSection";

const News = () => {
  useEffect(() => {
    document.title = "Berita - Banjar Kaliungu Kaja";
  }, []);

  return <NewsSection />;
};

export default News;
