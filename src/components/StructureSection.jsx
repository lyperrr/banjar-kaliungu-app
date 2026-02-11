/** @format */

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { containerVariants, itemVariants } from "@/lib/animation";
import { User } from "lucide-react";
import klianProfile from "@/assets/image/structure/klian.png";

const Structure = () => {
  const structureData = [
    {
      name: "I Wayan Sudarma",
      position: "Klian Adat",
      image: klianProfile,
    },
    {
      name: "I Nyoman Suardana",
      position: "Kelian Desa",
      image: klianProfile,
    },
  ];
  return (
    <>
      <section className="pt-14">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="tertiary" className="uppercase">
                Struktur Desa Adat
              </Badge>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="h2" className="sm:max-w-2xl mx-auto mt-3!">
                Struktur Desa Adat Banjar Kaliungu Kaja
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="muted" className="sm:max-w-3xl mx-auto">
                Susunan kepemimpinan Desa Adat Banjar Kaliungu Kaja yang
                dipimpin oleh Klian Adat serta dibantu prajuru desa dalam
                menjalankan awig-awig, kewajiban adat, dan menjaga keharmonisan
                krama banjar.
              </Typography>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center gap-8 flex-wrap"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {structureData.map((person, index) => (
              <motion.div
                key={person.name}
                className="flex flex-col items-center mb-6"
                variants={itemVariants}
              >
                <div className="overflow-hidden rounded-lg border-2 border-accent">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full max-h-90 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center mt-4">
                  <Typography variant="h5" className="font-medium">
                    {person.name}
                  </Typography>
                  <Badge variant="tertiary">{person.position}</Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Structure;
