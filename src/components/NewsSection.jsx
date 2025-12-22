import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
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
import { fetchAllNews, getImageUrl } from "@/api/newsApi";

// Komponen BlogCard
const BlogCard = ({ post }) => {
  const blocks = post.blocks || [];
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString("id-ID")
    : "";

  // Function to render preview blocks
  const renderPreviewBlocks = () => {
    // Find the first paragraph block
    const firstParagraph = blocks.find(
      (block) => block.type === "paragraph" || block.type === "text"
    );
    if (firstParagraph) {
      return (
        <Typography
          variant="small"
          className="text-muted-foreground mb-2 line-clamp-2 mt-0!"
        >
          {firstParagraph.content}
        </Typography>
      );
    }
    // Fallback if no paragraph found
    return (
      <Typography
        variant="small"
        className="text-muted-foreground mb-2 line-clamp-2 mt-0!"
      >
        {blocks[0]?.content || "No content available"}
      </Typography>
    );
  };

  return (
    <Card className="p-0 gap-0 overflow-hidden hover:shadow-md hover:shadow-primary transition-shadow h-full flex flex-col">
      {(post.image_url || post.image) && (
        <div className="h-56 w-full overflow-hidden">
          <img
            src={getImageUrl(post.image_url || post.image)}
            alt={post.title}
            className="object-cover h-full w-full hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
              e.target.style.display = "none"; // Hide broken image
            }}
          />
        </div>
      )}

      <CardHeader className="p-4 xl:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start w-full">
          {date && (
            <Typography className="flex items-center text-xs">
              <Calendar className="size-4 mr-2" />
              <span>{date}</span>
            </Typography>
          )}
          <Badge variant="tertiary">{post.category}</Badge>
        </div>
        <Link to={`/berita/${post.id}`}>
          <CardTitle className="text-lg font-bold line-clamp-2 cursor-pointer hover:text-accent transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <div className="text-muted-foreground">
          {post.excerpt ? (
            <p className="text-sm mb-2 line-clamp-2">{post.excerpt}</p>
          ) : (
            renderPreviewBlocks()
          )}
        </div>
      </CardHeader>

      <CardFooter className="border-t p-4! xl:p-6!">
        <Button
          variant="ghost"
          className="ml-auto group p-0 h-auto hover:bg-transparent text-sm!"
          asChild
        >
          <Link to={`/berita/${post.id}`} className="flex items-center gap-2">
            Selengkapnya
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Komponen utama NewsSection
const NewsSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllNews();
        console.log("Fetched news data:", data); // Debug log
        setBlogPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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
      className="container py-10 pt-26"
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

      {/* Informasi tambahan */}
      <motion.div variants={itemVariants} className="mt-10 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Menampilkan {blogPosts.length} berita terbaru
        </p>
        <Button
          variant="default"
          size="lg"
          className="group"
          onClick={() => console.log("Melihat semua artikel")}
        >
          Lihat Semua Artikel
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default NewsSection;
