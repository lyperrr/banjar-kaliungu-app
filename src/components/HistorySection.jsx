import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import HistoryImage from "/history-section.png";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemLeftVariants,
  itemRightVariants,
} from "@/lib/animation";

const HistorySection = () => {
  return (
    <section className="py-20 lg:pt-44 overflow-hidden">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* KONTEN KIRI */}
          <motion.div variants={itemLeftVariants}>
            <Badge variant="tertiary" className="uppercase">
              Sejarah Banjar
            </Badge>

            <Typography variant="h2" className="mt-2 text-justify">
              Sejarah Singkat Banjar Adat Kaliungu Kaja Denpasar
            </Typography>

            <Typography variant="p" className="text-justify">
              Banjar Adat Kaliungu Kaja didirikan pada tahun 1905 oleh
              sekelompok warga yang bermukim di daerah tersebut. Awalnya, banjar
              ini berfungsi sebagai pusat kegiatan adat dan sosial bagi
              masyarakat setempat. Seiring berjalannya waktu, Banjar Kaliungu
              Kaja berkembang menjadi komunitas yang solid dengan berbagai
              kegiatan adat, budaya, dan sosial yang rutin dilaksanakan.
            </Typography>

            <Typography variant="p" className="text-justify">
              Banjar sebagai entitas sosial bermula dari adanya sekelompok orang
              yang ingin bergabung, bermusyawarah dan kemudian menata kehidupan
              sehari-harinya dalam sebuah komunitas. Tata kelola banjar di Bali
              merupakan salah satu komponen administratif terbawah yang tidak
              terpisah dengan struktur pemerintahan di daerah. Dengan demikian
              banjar memiliki kewenangan administratif yang mengatur warganya
              dengan aturan adat maupun aturan hukum yang berlaku di Bali.
            </Typography>

            <motion.div variants={itemLeftVariants}>
              <Button
                asChild
                size="lg"
                className="group w-full sm:max-w-sm flex mx-auto sm:mx-0 mt-4"
              >
                <Link to="/sejarah">
                  Baca Selengkapnya
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* GAMBAR KANAN */}
          <motion.div className="flex justify-end" variants={itemRightVariants}>
            <img
              className="w-full mx-auto sm:w-[85%] lg:mx-0"
              src={HistoryImage}
              alt="History Image"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistorySection;
