import { useEffect } from "react";
import DetailHistory from "@/components/DetailHistory";

const History = () => {
  useEffect(() => {
    document.title = "Sejarah - Banjar Kaliungu Kaja";
  }, []);

  return (
    <>
      <DetailHistory />
    </>
  );
};

export default History;
