
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import BlogPostCard from "@/components/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Tag } from "lucide-react";

// Sample blog posts data
const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Car Buyers",
    slug: "essential-tips-first-time-car-buyers",
    excerpt: "Buying your first car can be exciting but also intimidating. Here are 10 essential tips to help you navigate the process and make a smart purchase.",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=500&fit=crop",
    date: "April 10, 2025",
    author: "Sarah Johnson",
    category: "Buying Guide"
  },
  {
    id: 2,
    title: "How to Negotiate the Best Price When Selling Your Car",
    slug: "negotiate-best-price-selling-car",
    excerpt: "Learn proven negotiation strategies to get the maximum value for your vehicle when it's time to sell.",
    image: "https://images.unsplash.com/photo-1560457079-9a6532ccb118?w=800&h=500&fit=crop",
    date: "April 5, 2025",
    author: "Michael Chen",
    category: "Selling Tips"
  },
  {
    id: 3,
    title: "Electric vs. Gas Cars: A Comprehensive Comparison",
    slug: "electric-vs-gas-cars-comparison",
    excerpt: "Considering an electric vehicle? We break down the pros and cons of electric vs. gas cars to help you make an informed decision.",
    image: "https://images.unsplash.com/photo-1593941707882-a56bbc8ba5f9?w=800&h=500&fit=crop",
    date: "March 28, 2025",
    author: "David Williams",
    category: "Market Trends"
  },
  {
    id: 4,
    title: "Car Maintenance 101: Essential Care Tips for Every Owner",
    slug: "car-maintenance-101-essential-tips",
    excerpt: "Regular maintenance is key to extending your car's life. Learn the basics every car owner should know.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=500&fit=crop",
    date: "March 20, 2025",
    author: "Jessica Martinez",
    category: "Maintenance"
  },
  {
    id: 5,
    title: "The Future of Autonomous Vehicles: What to Expect",
    slug: "future-autonomous-vehicles",
    excerpt: "Self-driving cars are no longer science fiction. Explore how autonomous technology is shaping the future of transportation.",
    image: "https://images.unsplash.com/photo-1577494201894-da76196dcd76?w=800&h=500&fit=crop",
    date: "March 15, 2025",
    author: "Robert Chang",
    category: "Technology"
  },
  {
    id: 6,
    title: "How to Inspect a Used Car Before Buying",
    slug: "inspect-used-car-before-buying",
    excerpt: "Don't get stuck with a lemon. Follow this comprehensive checklist when inspecting a used car to avoid costly mistakes.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop",
    date: "March 8, 2025",
    author: "Emily Parker",
    category: "Buying Guide"
  }
];

// Extract unique categories
const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Filter posts based on search term and category
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">DriveDealHub Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights, tips, and news about buying, selling, and maintaining vehicles.
          </p>
        </div>
        
        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Blog posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map(post => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                author={post.author}
                slug={post.slug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
            <Button variant="outline" onClick={() => {setSearchTerm(''); setCategoryFilter('')}}>
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Categories section */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setCategoryFilter(category === categoryFilter ? '' : category)}
              >
                <Tag className="h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-card rounded-lg shadow-md p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter to receive the latest automotive news, tips, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button className="bg-accent hover:bg-accent/90">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
