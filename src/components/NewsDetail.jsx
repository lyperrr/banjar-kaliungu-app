import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Calendar, ArrowLeft, Dot, Share2, Bookmark } from "lucide-react";
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
    : "";

  const finalBlocks = blocks.length > 0 ? blocks : testBlocks;

  // Function to render blocks
  const renderBlock = (block, index) => {
    switch (block.type) {
      case 1: // H1
        return (
          <Typography key={index} variant="h1" className="text-left">
            {block.content}
          </Typography>
        );
      case 2: // H2
        return (
          <Typography key={index} variant="h2" className="text-left">
            {block.content}
          </Typography>
        );
      case 3: // H3
        return (
          <Typography key={index} variant="h3" className="text-left">
            {block.content}
          </Typography>
        );
      case "text":
      case "paragraph":
        return (
          <Typography key={index} variant="p" className="mb-6 text-left">
            {block.content}
          </Typography>
        );
      case "image": {
        const imageSrc = block.src || block.url;
        if (!imageSrc) return null;
        return (
          <div key={index} className="mb-6">
            <img
              src={getImageUrl(imageSrc)}
              alt={block.alt || "Image"}
              className=""
            />
            {block.caption && (
              <Typography
                variant="caption"
                className="text-center mt-2 text-muted-foreground"
              >
                {block.caption}
              </Typography>
            )}
          </div>
        );
      }
      case "heading":
        return (
          <Typography
            key={index}
            variant={`h${block.level || 2}`}
            className="mb-4"
          >
            {block.content}
          </Typography>
        );
      case "list": {
        // Mendukung format array items atau string dengan \n
        let items = [];
        if (Array.isArray(block.items)) {
          items = block.items;
        } else if (block.content) {
          items = block.content
            .split("\n")
            .filter((item) => item.trim() !== "");
        }
        const isOrdered = block.style === "ordered";
        const ListTag = isOrdered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`list-disc list-inside mb-6 space-y-2 ${
              isOrdered ? "list-decimal" : ""
            }`}
          >
            {items.map((item, i) => (
              <li key={i} className="list-none flex items-center">
                <Dot />
                <Typography variant="p" className="mt-0! mb-1!">
                  {typeof item === "string" ? item.trim() : item}
                </Typography>
              </li>
            ))}
          </ListTag>
        );
      }
      default:
        return (
          <Typography key={index} variant="body" className="mb-6">
            {block.content || JSON.stringify(block)}
          </Typography>
        );
    }
  };

  return (
    <motion.article
      className="container lg:max-w-5xl py-10 pt-26"
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
      <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
        {finalBlocks.map((block, index) => renderBlock(block, index))}
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
