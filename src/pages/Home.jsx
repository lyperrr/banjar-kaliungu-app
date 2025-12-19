import { useEffect } from "react";
import Hero from "@/components/Hero";
import History from "@/components/HistorySection";
import StatisticStats from "@/components/StatisticStats";
import Service from "@/components/Service";
import Rules from "@/components/Rules";
import Blog from "@/components/Blog";

const Home = () => {
  useEffect(() => {
    document.title = "Beranda - Banjar Kaliungu Kaja";
  }, []);

  return (
    <>
      <Hero />
      <History />
      <StatisticStats />
      <Service />
      <Rules />
      <Blog />
    </>
  );
};

export default Home;
