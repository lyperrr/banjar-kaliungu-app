/** @format */

import { useEffect } from "react";
import Hero from "@/components/HeroSection";
import History from "@/components/HistorySection";
import StatisticStats from "@/components/StatisticStats";
import Service from "@/components/ServiceSection";
import Rules from "@/components/RulesSection";
import NewsSection from "@/components/NewsComponent/NewsSection";
import Structure from "@/components/StructureSection";

const Home = () => {
  useEffect(() => {
    document.title = "Beranda - Banjar Kaliungu Kaja";
  }, []);

  return (
    <>
      <Hero />
      <History />
      <StatisticStats />
      <Structure />
      <Service />
      <Rules />
      {/* <NewsSection /> */}
    </>
  );
};

export default Home;
