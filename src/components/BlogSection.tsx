
import BlogPostCard from './BlogPostCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample blog post data
const blogPosts = [
  {
    title: '10 Tips for Negotiating the Best Car Price',
    excerpt: 'Learn how to get the best deal when buying a used car with these expert negotiation tactics that can save you thousands.',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'Apr 1, 2025',
    author: 'John Smith',
    slug: 'negotiating-best-car-price'
  },
  {
    title: 'The Rise of Electric Vehicles: Market Trends',
    excerpt: 'How electric vehicles are reshaping the automotive industry and what to consider before making the switch.',
    image: 'https://images.unsplash.com/photo-1593941707882-a56bbc8abd6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'Mar 28, 2025',
    author: 'Sarah Johnson',
    slug: 'electric-vehicles-trends'
  },
  {
    title: 'Essential Maintenance Tips for Longevity',
    excerpt: 'Simple maintenance routines that can extend your car\'s life and save you money on repairs in the long run.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'Mar 20, 2025',
    author: 'Mike Williams',
    slug: 'car-maintenance-tips'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="mb-2">Car Tips & News</h2>
            <p className="text-muted-foreground">Stay informed with the latest automotive insights</p>
          </div>
          <Link to="/blog">
            <Button variant="outline">View All Articles</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              author={post.author}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
