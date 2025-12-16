import { UsersRound, Mars, Venus } from "lucide-react";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemLeftVariants,
  itemStatCenter,
  itemRightVariants,
} from "@/lib/animation";

const StatisticStats = () => {
  const statsPopulation = [
    {
      label: "Jumlah Penduduk",
      value: "400+",
      icon: UsersRound,
    },
    {
      label: "Jumlah Penduduk Laki-laki",
      value: "180+",
      icon: Mars,
    },
    {
      label: "Jumlah Penduduk Perempuan",
      value: "220+",
      icon: Venus,
    },
  ];

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

                    {/* Value */}
                    <Typography
                      variant="h1"
                      className="font-bold text-primary-foreground text-5xl m-0"
                    >
                      {stat.value}
                    </Typography>
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
