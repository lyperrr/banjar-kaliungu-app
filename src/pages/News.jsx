import { useEffect } from "react";
import NewsSection from "@/components/NewsComponent/NewsSection";
import NewsHeroSection from "@/components/NewsComponent/NewsHeroSection";

const News = () => {
  useEffect(() => {
    document.title = "Berita - Banjar Kaliungu Kaja";
  }, []);

  return (
    <>
      <NewsHeroSection />
      <div id="news-content">
        <NewsSection />
      </div>
    </>
  );
};

export default News;
