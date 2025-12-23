import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemStatCenter,
  itemVariants,
} from "@/lib/animation";
import { fetchAllNews } from "@/api/newsApi";
import BlogCard from "@/components/NewsComponent/NewsCard";

// Komponen utama NewsSection
const NewsSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async (page = 1) => {
      try {
        setLoading(true);
        const data = await fetchAllNews(page);
        console.log("Fetched news data:", data); // Debug log

        let posts = data.data || [];
        let total = data.total || 0;
        let lastPage = data.last_page || 1;

        if (location.pathname !== "/berita") {
          // Limit to 3 posts and no pagination for non-news pages
          posts = posts.slice(0, 3);
          total = Math.min(total, 3);
          lastPage = 1;
        }

        setBlogPosts(posts);
        setCurrentPage(data.current_page || 1);
        setTotalPages(lastPage);
        setTotalPosts(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts(currentPage);

    // Auto-refresh every 60 seconds to check for new posts
    const interval = setInterval(() => {
      loadPosts(currentPage);
    }, 60000);

    return () => clearInterval(interval);
  }, [currentPage, location.pathname]);

  if (loading) {
    return (
      <section className="container py-10 pt-26">
        <div className="text-center">Loading news...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-10 pt-26">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <motion.section
      className="container py-10 pt-44"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="text-center mb-8">
        <motion.div variants={itemVariants}>
          <Badge variant="tertiary" className="uppercase">
            berita terbaru
          </Badge>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="h2" className="sm:max-w-2xl mx-auto mt-3!">
            Temukan artikel informatif di lingkungan Banjar Kaliungu Kaja
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="muted" className="sm:max-w-3xl mx-auto">
            Pedoman adat Banjar Kaliungu Kaja yang mengatur tata kehidupan
            krama, pelaksanaan kewajiban adat, serta menjaga keharmonisan dan
            kebersamaan banjar.
          </Typography>
        </motion.div>
      </div>

      {/* Grid Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemStatCenter}
            className="h-full"
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center items-center gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10 h-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </motion.div>
      )}

      {/* Informasi tambahan */}
      <motion.div variants={itemVariants} className="mt-10 text-center">
        <Typography variant="p" className="mb-4 text-muted-foreground">
          {location.pathname === "/berita"
            ? `Menampilkan ${blogPosts.length} dari ${totalPosts} berita terbaru`
            : `Menampilkan ${blogPosts.length} berita terbaru`}
        </Typography>
        {location.pathname !== "/berita" && (
          <Button
            variant="default"
            size="lg"
            className="group cursor-pointer"
            onClick={() => navigate("/berita")}
          >
            Lihat Semua Artikel
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </motion.div>
    </motion.section>
  );
};

export default NewsSection;
