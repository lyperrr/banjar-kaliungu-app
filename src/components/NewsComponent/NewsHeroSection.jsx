import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ArrowRight, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { containerVariants, itemVariants } from "@/lib/animation";
import { motion } from "framer-motion";

const NewsHeroSection = () => {
  return (
    <section className="bg-linear-to-t from-primary via-primary/90 to-primary/80 relative h-[90vh] pt-20">
      <div className="container h-full">
        <div className="flex items-center justify-center h-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center space-y-4"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="tertiary"
                className="mx-auto px-4 py-2 uppercase gap-2"
              >
                <Newspaper className="size-5" />
                Berita & Informasi
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                className="text-primary-foreground max-w-4xl text-3xl lg:text-5xl leading-tight"
              >
                Tetap Terinformasi dengan Berita Terbaru Banjar Kaliungu Kaja
              </Typography>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="p"
                className="text-primary-foreground max-w-2xl mx-auto"
              >
                Dapatkan informasi terkini tentang kegiatan adat, pengumuman
                warga, dan berbagai berita penting dari lingkungan Banjar
                Kaliungu Kaja Denpasar.
              </Typography>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
            >
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-transparent text-accent hover:text-primary-foreground border-accent"
              >
                <Link to="/">Kembali ke Beranda</Link>
              </Button>

              <Button variant="tertiary" size="lg" asChild className="group">
                <Link to="#news-content">
                  Baca Berita Terbaru
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Shapes */}
      <div className="size-62 absolute rounded-full bg-radial from-primary-foreground/20 via-primary-foreground/5 to-primary-foreground/0 top-26 left-10 mask-radial-from-15%" />
      <div className="size-42 absolute rounded-full bg-radial from-primary-foreground/20 via-primary-foreground/5 to-primary-foreground/0 bottom-26 right-10 mask-radial-from-15%" />

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="left-1/2 -translate-x-1/2 bottom-2 sm:bottom-10 absolute text-primary-foreground z-10"
      >
        <Mouse className="size-6 lg:size-8" />
      </motion.div>

      {/* Waves */}
      <div className="absolute top-full w-full fill-primary">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default NewsHeroSection;