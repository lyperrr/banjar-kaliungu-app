/** @format */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import img3 from "../assets/image/gallery/3.png";
import img1 from "../assets/image/gallery/1.png";
import img2 from "../assets/image/gallery/2.png";
import img4 from "../assets/image/gallery/4.png";
import img5 from "../assets/image/gallery/5.png";
import img6 from "../assets/image/gallery/6.png";
import img7 from "../assets/image/gallery/7.png";
import img8 from "../assets/image/gallery/8.png";

const images = [img4, img1, img7, img3, img2, img6, img8, img5];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [loadingTimers, setLoadingTimers] = useState({});

  const handleImageLoad = (key) => {
    const startTime = loadingTimers[key] || Date.now();
    const elapsed = Date.now() - startTime;
    const minLoadingTime = 500; // Minimum loading time in ms

    const remainingTime = Math.max(0, minLoadingTime - elapsed);

    setTimeout(() => {
      setLoadedImages((prev) => ({ ...prev, [key]: true }));
    }, remainingTime);
  };

  const handleImageStart = (key) => {
    setLoadingTimers((prev) => ({ ...prev, [key]: Date.now() }));
  };

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage !== null) {
        if (e.key === "ArrowRight") nextImage(e);
        if (e.key === "ArrowLeft") prevImage(e);
        if (e.key === "Escape") closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section id="gallery" className="py-14">
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
              galeri desa adat
            </Badge>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h2" className="sm:max-w-2xl mx-auto mt-3!">
              Galeri Banjar Kaliungu Kaja
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="muted" className="sm:max-w-3xl mx-auto">
              Dokumentasi kegiatan adat, upacara, serta kebersamaan krama Banjar
              Kaliungu Kaja sebagai cerminan nilai budaya dan keharmonisan desa
              adat.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Gallery Grid - Pinterest Style */}
        <motion.div
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-lg break-inside-avoid mb-4 shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => openLightbox(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-foreground">
                {/* Loading Spinner */}
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                  </div>
                )}
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className={`w-full h-auto object-cover transition-transform duration-200 group-hover:scale-105 ${
                    loadedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoadStart={() => handleImageStart(index)}
                  onLoad={() => handleImageLoad(index)}
                />

                {/* Simple Overlay */}
                <div
                  className={`absolute bottom-0 h-10 left-0 w-full bg-linear-to-t from-black/50 via-black/20 to-black/0 transition-opacity duration-200 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Simple Hover Icon */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                    hoveredIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
                  <div className="bg-primary-foreground backdrop-blur-md rounded-full p-3 z-20">
                    <Search className="w-6 h-6 text-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-opacity duration-150"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 z-50 bg-primary-foreground/90 text-foreground rounded-full w-12 h-12 flex items-center justify-center hover:bg-primary-foreground transition-all duration-150 hover:scale-105 active:scale-95" // Changed to regular button with CSS transitions
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 bg-primary-foreground/90 text-foreground rounded-full w-12 h-12 flex items-center justify-center hover:bg-primary-foreground transition-all duration-150 hover:scale-105 active:scale-95"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 bg-primary-foreground/90 text-foreground rounded-full w-12 h-12 flex items-center justify-center hover:bg-primary-foreground transition-all duration-150 hover:scale-105 active:scale-95"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image Container */}
              <div
                className="relative max-w-4xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[60vh] flex items-center justify-center">
                  {/* Loading Spinner for Lightbox */}
                  {!loadedImages[`lightbox-${selectedImage}`] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-16 h-16 text-primary-foreground animate-spin" />
                    </div>
                  )}
                  <img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={`Gallery ${selectedImage + 1}`}
                    className={`w-full h-[60vh] object-contain rounded-lg shadow-lg transition-opacity duration-150 ${
                      loadedImages[`lightbox-${selectedImage}`]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onLoadStart={() =>
                      handleImageStart(`lightbox-${selectedImage}`)
                    }
                    onLoad={() => handleImageLoad(`lightbox-${selectedImage}`)}
                  />
                </div>
                <div className="mb-6"></div>

                {/* Thumbnail Preview */}
                <div className="flex flex-wrap justify-center gap-2 max-w-full max-h-32 overflow-y-auto">
                  {images.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`hidden md:block shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-150 hover:scale-105 active:scale-95 ${
                        selectedImage === index
                          ? "border-primary shadow-md"
                          : "border-foreground hover:border-foreground"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Image Counter */}
                <div className="mt-4 bg-primary-foreground/90 text-foreground px-4 py-2 rounded-md font-medium transition-opacity duration-150">
                  {selectedImage + 1} / {images.length}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
