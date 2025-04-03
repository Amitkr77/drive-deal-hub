
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogPostProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}

const BlogPostCard = ({ title, excerpt, image, date, author, slug }: BlogPostProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="text-accent font-medium hover:underline">
          Read More
        </Link>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t text-sm text-muted-foreground flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{date} • {author}</span>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
