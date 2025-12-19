import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import Hero from "@/assets/image/sejarah-1.png";
import Thumb from "@/assets/image/sejarah-2.png";
import pdfFile from "@/assets/pdf/Sejarah Banjar Kaliungu Kaja.pdf";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  itemLeftVariants,
  itemRightVariants,
} from "@/lib/animation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const DetailHistory = ({ data = null }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const defaultData = {
    titleSmall: "SEJARAH BANJAR",
    titleLarge: "KALIUNGU KAJA",
    intro:
      "Kisah kata 'kaliungu' diperkirakan sudah digunakan pada zaman Kerajaan Badung sekitar tahun 1836, pasca terjadinya perang antara pasukan Sikep Badung dan pasukan Gaok Buleleng.",

    content: `Kaliungu yang dikenang sebagai peristiwa bersejarah rupanya menginspirasi para pemimpin dan duta-duta sebagai nama Banjar Kaliungu. Peristiwa tersebut diperkirakan terjadi di sebelah Utara Banjar Kaliungu yang ada sekarang. Sedangkan wilayah pada saat itu berisikan pemerintahan bernama Banjar Tempak Gangsul. Seiring berjalannya waktu, Banjar tersebut dikenal sebagai Banjar Kaliungu Kaja.`,
    paragraph1: `Kosa kata "kaliungu" diperkirakan sudah digunakan pada jaman Kerajaan  Badung sekitar tahun 1836, pasca terjadinya perang antara pasukan Sikep  Badung melawan pasukan Goak Buleleng. Perang dahasyat tersebut terjadi di  wilayah Taensiat yang kemudian diabadikan menjadi nama Banjar Taensiat.  Menurut Babad Mengwi, dalam pertempuran tersebut pasukan Sikep Badung  mengalami tekanan dan terdesak ke arah Puri Pemecutan. Melihat situasi  tersebut, Raja Badung I Gusti Ngurah Pemecutan langsung turun tangan dan  memberi komando kepada Sikep Badung untuk berbalik menyerang  menggunakan sejata tajam dan endut (lumpur) yang dilemparkan ke mata  pasukan Goak. Perang kembali bergolak sehingga menimbulkan banyak korban  di kedua belah pihak. Tumpahan darah pasukan yang gugur saat itu bercampur  dengan lumpur dan mengalir  ke parit-parit persawahan, sehingga menyebabkan  air di parit-parit sawah berubah warna menjadi biru keunguan. Aliran darah  berwarna keunguan itulah yang kemudian disebut “kaliungu”.`,
    paragraph2: `Kaliungu yang dikenang sebagai peristiwa bersejarah rupanya menginspirasi  para pendiri banjar dan diadopsi sebagai nama Banjar Kaliungu. Peristiwa  tersebut diperkirakan terjadi di sebelah Utara banjar Kaliungu yang ada  sekarang. Sedangkan wilayah pada saat Raja Pemecutan memberi perintah  kepada pasukan Sikep Badung berbalik menyerang pasukan Goak disebut  “tapak wangsul” yang kemudian menjadi nama Banjar Tampak Gangsul.  (Dihimpun dari beberapa sumber).`,
    hero: Hero,
    image1: Hero,
    image2: Thumb,
    downloadUrl: pdfFile,
  };

  const info = { ...defaultData, ...(data || {}) };

  const handleDownload = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    // Simulate download preparation delay
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = info.downloadUrl;
      link.download = "Sejarah Banjar Kaliungu Kaja.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div>
        {/* Hero */}
        <motion.div
          className="relative bg-history bg-cover bg-center h-80 md:h-96 lg:h-[40vh] overflow-hidden pt-44"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <Badge
                variant="secondary"
                className="text-sm tracking-widest uppercase font-semibold mb-2"
              >
                {info.titleSmall}
              </Badge>
              <Typography
                variant="h1"
                className="text-primary-foreground tracking-widest"
              >
                {info.titleLarge}
              </Typography>

              {/* Breadcrumb inside hero */}
              <div className="mt-4 flex justify-center">
                <div className="inline-block px-3 py-1">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link
                            to="/"
                            className="text-primary-foreground/90 hover:text-primary-foreground"
                          >
                            Beranda
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator />

                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link
                            to="/sejarah"
                            className="text-primary-foreground/90 hover:text-primary-foreground"
                          >
                            Sejarah
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator />

                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-primary-foreground">
                          {info.titleLarge}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <section className="container py-12">
          <div className="text-center mb-8">
            <motion.div variants={itemVariants}>
              <Badge
                variant="tertiary"
                className="font-semibold uppercase mb-2"
              >
                SEJARAH BANJAR
              </Badge>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="h2">{info.titleLarge}</Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="p"
                className="text-muted-foreground mt-4 max-w-3xl mx-auto"
              >
                {info.intro}
              </Typography>
            </motion.div>
          </div>

          {/* Section 1: image left, paragraph right */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="md:col-span-1 flex items-start"
              variants={itemLeftVariants}
            >
              <div className="overflow-hidden rounded-lg shadow-lg w-full">
                <img
                  src={info.image1}
                  alt="Sejarah 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div className="md:col-span-2" variants={itemRightVariants}>
              <Typography variant="h3">Sejarah Singkat</Typography>
              <Typography
                variant="p"
                className="text-muted-foreground leading-relaxed"
              >
                {info.paragraph1 || info.content}
              </Typography>
            </motion.div>
          </motion.div>

          {/* Section 2: paragraph left, image right */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
            variants={itemVariants}
          >
            <motion.div className="md:col-span-2" variants={itemLeftVariants}>
              <Typography variant="h3">Keterangan Lokasi</Typography>
              <Typography
                variant="p"
                className="text-muted-foreground leading-relaxed"
              >
                {info.paragraph2 ||
                  "Kaliungu yang dikenang sebagai peristiwa bersejarah ini membentuk pola sosial dan tradisi yang bertahan hingga kini."}
              </Typography>
            </motion.div>

            <motion.div
              className="md:col-span-1 flex items-start"
              variants={itemRightVariants}
            >
              <div className="overflow-hidden rounded-lg shadow-lg w-full">
                <img
                  src={info.image2 || info.image}
                  alt="Sejarah 2"
                  className="w-full h-full object-cover shrink-0"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Download button (left on md, centered on mobile) */}
          <motion.div
            className="mt-8 md:text-left text-center"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="px-8!"
              disabled={isDownloading}
              onClick={handleDownload}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Download
                </>
              )}
            </Button>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default DetailHistory;
