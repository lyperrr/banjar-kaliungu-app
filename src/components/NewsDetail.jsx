import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation";
import { Link } from "react-router-dom";
import { fetchNewsDetail, getImageUrl } from "@/api/newsApi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlogRenderer from "@/components/NewsRenderer";

const NewsDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Detail Berita - Banjar Kaliungu Kaja";
  }, []);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsDetail(id);
        console.log("Fetched post data:", data); // Debug log
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-10 pt-26">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10 pt-26">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/berita" replace />;
  }

  // Generate excerpt from content if not provided
  const blocks = post.blocks || [];
  console.log("Blocks data:", blocks); // Debug log

  // Format date from created_at
  const date = post.created_at
    ? new Date(post.created_at).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const finalBlocks =
    blocks.length > 0 ? blocks : [{ type: "paragraph", content: post.content }];

  return (
    <motion.article
      className="container lg:max-w-5xl py-10 pt-28"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Breadcrumb */}
      <motion.div variants={itemVariants} className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-primary/50 hover:text-primary">
                  Beranda
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/berita"
                  className="text-primary/50 hover:text-primary"
                >
                  Berita
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">
                {post.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="tertiary">{post.category}</Badge>
          <Typography className="flex items-center mt-0! text-sm text-muted-foreground text-left">
            <Calendar className="size-4 mr-2" />
            <span>{date}</span>
          </Typography>
        </div>

        <Typography variant="h2" className="mb-4 text-left">
          {post.title}
        </Typography>

        <Typography variant="muted" className="text-lg text-left">
          {post.excerpt}
        </Typography>
      </motion.div>

      {/* Featured Image */}
      {(post.image_url || post.image) && (
        <motion.div
          variants={itemVariants}
          className="mb-8 overflow-hidden rounded-lg shadow-lg max-w-2xl max-h-110 mx-auto"
        >
          <img
            src={getImageUrl(post.image_url || post.image)}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 mx-auto"
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
              e.target.style.display = "none"; // Hide broken image
            }}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div variants={itemVariants}>
        <BlogRenderer blocks={finalBlocks} />
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mt-12 pt-8 border-t"
      >
        <Link to="/berita">
          <Button variant="outline" className="hover:bg-primary/10">
            <ArrowLeft className="size-4 mr-2" />
            Kembali ke Berita
          </Button>
        </Link>

        {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="size-4 mr-2" />
            Bagikan
          </Button>
          <Button variant="ghost" size="sm">
            <Bookmark className="size-4 mr-2" />
            Simpan
          </Button>
        </div> */}
      </motion.div>

      {/* Related Posts or Comments could be added here */}
    </motion.article>
  );
};

export default NewsDetail;
