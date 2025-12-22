import { UsersRound, Mars, Venus, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  containerVariants,
  itemLeftVariants,
  itemStatCenter,
  itemRightVariants,
} from "@/lib/animation";
import pendudukApi from "@/api/pendudukApi";

const StatisticStats = () => {
  const [statsPopulation, setStatsPopulation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = await pendudukApi.fetchStatistik();
      setStatsPopulation([
        {
          label: "Jumlah Penduduk",
          value: data.jumlah_penduduk?.toString() || "0",
          icon: UsersRound,
        },
        {
          label: "Jumlah Penduduk Laki-laki",
          value: data.jumlah_laki?.toString() || "0",
          icon: Mars,
        },
        {
          label: "Jumlah Penduduk Perempuan",
          value: data.jumlah_perempuan?.toString() || "0",
          icon: Venus,
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Set error state - tetap tampilkan 0 jika error
      setStatsPopulation([
        {
          label: "Jumlah Penduduk",
          value: "Error",
          icon: UsersRound,
        },
        {
          label: "Jumlah Penduduk Laki-laki",
          value: "Error",
          icon: Mars,
        },
        {
          label: "Jumlah Penduduk Perempuan",
          value: "Error",
          icon: Venus,
        },
      ]);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-update setiap 30 detik
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(false); // Tidak tampilkan loading saat auto-update
    }, 30000); // 30 detik

    return () => clearInterval(interval); // Cleanup saat komponen unmount
  }, []);

  return (
    <section className="bg-batik bg-cover bg-center py-10 overflow-hidden">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {statsPopulation.map((stat, index) => {
            const Icon = stat.icon;

            const variants =
              index === 0
                ? itemLeftVariants
                : index === 1
                ? itemStatCenter
                : itemRightVariants;

            return (
              <motion.div key={index} variants={variants}>
                <Card
                  className="
                    bg-primary/90
                    hover:bg-primary
                    hover:border-accent
                    border-primary
                    border-4
                    transition-colors
                    text-center
                    relative
                    overflow-hidden
                  "
                >
                  <div className="z-10 w-full flex flex-col justify-between items-center h-32">
                    {/* Label */}
                    <Typography
                      variant="p"
                      className="text-primary-foreground m-0"
                    >
                      {stat.label}
                    </Typography>

                    {/* Value or Loading */}
                    {loading ? (
                      <Loader2 className="animate-spin text-primary-foreground text-5xl" />
                    ) : (
                      <Typography
                        variant="h1"
                        className="font-bold text-primary-foreground text-5xl m-0"
                      >
                        {stat.value || 0}
                      </Typography>
                    )}
                  </div>

                  {/* Icon background */}
                  <Icon
                    className="
                      size-20
                      mx-auto
                      text-accent/60
                      absolute
                      top-1/2
                      left-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                    "
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticStats;
