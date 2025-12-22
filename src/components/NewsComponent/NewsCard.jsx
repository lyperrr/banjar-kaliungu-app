import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { getImageUrl } from "@/api/newsApi";

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
    <Card className="group p-0 gap-0 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {(post.image_url || post.image) && (
        <div className="h-64 w-full overflow-hidden">
          <img
            src={getImageUrl(post.image_url || post.image)}
            alt={post.title}
            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
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
          <CardTitle className="text-lg text-primary! font-bold line-clamp-2 cursor-pointer hover:text-accent! transition-colors">
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

export default BlogCard;
