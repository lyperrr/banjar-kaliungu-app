import { useEffect } from "react";

const News = () => {
  useEffect(() => {
    document.title = "Berita - Banjar Kaliungu Kaja";
  }, []);

  return <>Halloo ini di page News</>;
};

export default News;
