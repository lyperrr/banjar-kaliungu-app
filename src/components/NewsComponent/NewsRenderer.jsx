import React from "react";
import { Dot } from "lucide-react";
import Typography from "@/components/ui/typography";
import { getImageUrl } from "@/api/newsApi";

const BlogRenderer = ({ blocks }) => {
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
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BlogRenderer;