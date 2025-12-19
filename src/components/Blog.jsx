import React from "react";
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

// Komponen BlogCard
const BlogCard = ({ post }) => (
  <Card className="p-0 gap-0 overflow-hidden hover:shadow-md hover:shadow-primary transition-shadow">
    <div className="max-h-70 w-full overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>

    <CardHeader className="p-4 py-0 xl:p-6">
      <div className="flex justify-between items-start">
        <Typography className="flex items-center text-xs">
          <Calendar className="size-4 mr-2" />
          <span>{post.date}</span>
        </Typography>
        <Badge variant="tertiary">
          {post.category}
        </Badge>
      </div>
      <Link to="/">
        <CardTitle className="text-lg font-bold line-clamp-2 cursor-pointer hover:text-accent transition-colors">
          {post.title}
        </CardTitle>
      </Link>
      <CardDescription className="text-muted-foreground line-clamp-3">
        {post.excerpt}
      </CardDescription>
    </CardHeader>

    <CardFooter className="border-t p-4! xl:p-6!">
      <Button
        variant="ghost"
        className="ml-auto group p-0 h-auto hover:bg-transparent text-sm!"
        onClick={() => console.log(`Membaca selengkapnya: ${post.title}`)}
      >
        <Link to="/" className="flex items-center gap-2">
          Selengkapnya
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

// Komponen utama Blog
const Blog = () => {
  // Data blog dalam array objek
  const blogPosts = [
    {
      id: 1,
      title: "Perancangan website banjar kaliungu kaja",
      category: "Berita",
      date: "06 Maret 2024",
      image: "banjar-kaliungu.png",
      excerpt:
        "Perancangan website banjar kaliungu kaja sebagai sarana informasi dan komunikasi bagi masyarakat banjar kaliungu kaja.",
    },
    {
      id: 2,
      title: "Perancangan website banjar kaliungu kaja",
      category: "Pengumuman",
      date: "17 Maret 2024",
      image: "banjar-kaliungu.png",
      excerpt:
        "Perancangan website banjar kaliungu kaja sebagai sarana informasi dan komunikasi bagi masyarakat banjar kaliungu kaja.",
    },
    {
      id: 3,
      title: "Perancangan website banjar kaliungu kaja",
      category: "Berita",
      date: "24 Desember 2024",
      image: "banjar-kaliungu.png",
      excerpt:
        "Perancangan website banjar kaliungu kaja sebagai sarana informasi dan komunikasi bagi masyarakat banjar kaliungu kaja.",
    },
  ];

  return (
    <motion.section
      className="container py-10"
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
          <motion.div key={post.id} variants={itemStatCenter}>
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

export default Blog;
