
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, ArrowLeft, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// Sample blog posts data (same as in Blog.tsx)
const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Car Buyers",
    slug: "essential-tips-first-time-car-buyers",
    excerpt: "Buying your first car can be exciting but also intimidating. Here are 10 essential tips to help you navigate the process and make a smart purchase.",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=500&fit=crop",
    date: "April 10, 2025",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    category: "Buying Guide",
    readTime: "8 min read",
    content: `
      <p class="lead">Buying your first car is a significant milestone. It represents freedom, responsibility, and for many, the culmination of months or even years of saving. But with so many options and factors to consider, the process can quickly become overwhelming.</p>
      
      <p>Whether you're a recent graduate, a young professional, or simply someone who's never owned a car before, these ten essential tips will help guide you through the car-buying process with confidence.</p>
      
      <h2>1. Determine Your Budget</h2>
      <p>Before you even start browsing car listings, it's crucial to establish a realistic budget. Remember, the cost of owning a car extends beyond the purchase price. Consider:</p>
      <ul>
        <li>Monthly payments (if financing)</li>
        <li>Insurance costs</li>
        <li>Fuel expenses</li>
        <li>Regular maintenance</li>
        <li>Potential repairs</li>
      </ul>
      <p>A good rule of thumb is that your car expenses shouldn't exceed 20% of your monthly income.</p>
      
      <h2>2. Research Different Models</h2>
      <p>Once you have a budget in mind, research cars that fit within that range. Consider your lifestyle and needs:</p>
      <ul>
        <li>Do you have a long commute? Prioritize fuel efficiency.</li>
        <li>Do you live in an area with harsh winters? All-wheel drive might be essential.</li>
        <li>Do you frequently transport large items? Consider cargo space.</li>
      </ul>
      
      <h2>3. Understand the Total Cost of Ownership</h2>
      <p>Different cars come with different long-term costs. Some models are more expensive to insure, while others might require premium fuel or have higher maintenance costs. Research the total cost of ownership for any car you're seriously considering.</p>
      
      <h2>4. New vs. Used</h2>
      <p>Deciding between a new or used car is a significant decision. New cars come with warranties and the latest features but depreciate quickly. Used cars offer better value but might have hidden issues. Weigh the pros and cons based on your budget and preferences.</p>
      
      <h2>5. Check Reliability Ratings</h2>
      <p>Before settling on a model, check its reliability ratings from sources like Consumer Reports or J.D. Power. A car with high reliability ratings can save you money and headaches in the long run.</p>
      
      <h2>6. Get Pre-Approved for Financing</h2>
      <p>If you're planning to finance your purchase, get pre-approved for a loan before visiting dealerships. This gives you a clear idea of what you can afford and provides leverage during negotiations.</p>
      
      <h2>7. Test Drive Multiple Cars</h2>
      <p>Never buy a car without test driving it first. And don't just test one car – drive multiple models to get a feel for different driving experiences. Pay attention to comfort, visibility, handling, and noise levels.</p>
      
      <h2>8. Have a Used Car Inspected</h2>
      <p>If you're buying a used car, have it inspected by a trusted mechanic before finalizing the purchase. This can uncover potential issues that might not be immediately apparent.</p>
      
      <h2>9. Negotiate Effectively</h2>
      <p>Don't be afraid to negotiate the price. Research the fair market value of the car beforehand, and be prepared to walk away if the seller isn't willing to meet a reasonable price.</p>
      
      <h2>10. Read the Fine Print</h2>
      <p>Before signing any contracts, read all the fine print. Understand the terms of the sale, any warranties, and, if applicable, the financing agreement.</p>
      
      <h2>Conclusion</h2>
      <p>Buying your first car is an exciting journey, but it's important to approach it with knowledge and preparation. By following these ten essential tips, you'll be better equipped to make a decision that aligns with your needs, preferences, and budget. Happy car hunting!</p>
    `
  },
  {
    id: 2,
    title: "How to Negotiate the Best Price When Selling Your Car",
    slug: "negotiate-best-price-selling-car",
    excerpt: "Learn proven negotiation strategies to get the maximum value for your vehicle when it's time to sell.",
    image: "https://images.unsplash.com/photo-1560457079-9a6532ccb118?w=800&h=500&fit=crop",
    date: "April 5, 2025",
    author: "Michael Chen",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    category: "Selling Tips",
    readTime: "6 min read",
    content: `
      <p class="lead">When it's time to sell your car, getting the best possible price should be your priority. With the right approach to negotiation, you can maximize your return and ensure a smooth transaction.</p>
      
      <p>Whether you're selling to a private buyer, a dealership, or through an online platform, these strategies will help you negotiate effectively and get top dollar for your vehicle.</p>
      
      <h2>Know Your Car's Value</h2>
      <p>Before entering any negotiation, research your car's market value using resources like Kelley Blue Book, NADA Guides, or Edmunds. Consider factors such as:</p>
      <ul>
        <li>Year, make, and model</li>
        <li>Mileage</li>
        <li>Condition</li>
        <li>Optional features</li>
        <li>Local market demand</li>
      </ul>
      <p>Having concrete data about your car's worth gives you confidence during negotiations and helps you set a realistic asking price.</p>
      
      <h2>Set the Right Asking Price</h2>
      <p>Start slightly higher than your target selling price to leave room for negotiation. However, avoid setting the price unreasonably high, as this can deter potential buyers from contacting you at all.</p>
      
      <h2>Prepare Your Car for Sale</h2>
      <p>A clean, well-maintained car commands a higher price. Before listing your car:</p>
      <ul>
        <li>Get a professional detail</li>
        <li>Address minor cosmetic issues</li>
        <li>Ensure all maintenance is up to date</li>
        <li>Collect service records</li>
        <li>Take high-quality photos from multiple angles</li>
      </ul>
      
      <h2>Create a Compelling Listing</h2>
      <p>When writing your car listing, highlight its strengths and be transparent about any issues. Include:</p>
      <ul>
        <li>Detailed specifications</li>
        <li>Maintenance history</li>
        <li>Recent repairs or upgrades</li>
        <li>Any remaining warranty</li>
        <li>Clear, honest photos</li>
      </ul>
      
      <h2>Use Silence as a Negotiation Tool</h2>
      <p>When a buyer makes an offer, resist the urge to respond immediately. A moment of silence creates slight discomfort and often leads the buyer to improve their offer or justify their price.</p>
      
      <h2>Focus on Value, Not Just Price</h2>
      <p>Emphasize what makes your car special compared to similar models on the market. Maybe it has lower-than-average mileage, a clean accident history, or desirable options. Help the buyer understand why your car commands the price you're asking.</p>
      
      <h2>Be Prepared to Walk Away</h2>
      <p>Set a minimum acceptable price before negotiations begin, and be willing to walk away if a buyer won't meet it. Having this bottom line firmly in mind helps prevent you from accepting a lowball offer out of frustration or impatience.</p>
      
      <h2>Counter Lowball Offers Effectively</h2>
      <p>When faced with a lowball offer, don't take it personally. Instead:</p>
      <ul>
        <li>Thank the buyer for their interest</li>
        <li>Restate your car's value points</li>
        <li>Make a counter-offer closer to your asking price</li>
        <li>Ask what specific concerns are driving their low offer</li>
      </ul>
      
      <h2>Use Multiple Offers as Leverage</h2>
      <p>If you're fortunate enough to have multiple interested buyers, you can mention (truthfully) that others are interested. This creates a sense of urgency and competition that can drive up offers.</p>
      
      <h2>Close the Deal Professionally</h2>
      <p>Once you've agreed on a price:</p>
      <ul>
        <li>Get the agreement in writing</li>
        <li>Be clear about payment methods you'll accept</li>
        <li>Complete all necessary paperwork</li>
        <li>Provide a detailed bill of sale</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Negotiating the best price for your car requires preparation, patience, and strategy. By knowing your car's value, presenting it well, and negotiating confidently, you can maximize your return and ensure a satisfactory selling experience.</p>
    `
  },
  // More post data would be here...
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(post => post.slug === slug);
  
  // Related posts (simple implementation - just showing other posts)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.slug !== slug)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <Link to="/blog" className="inline-flex items-center text-accent hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          {/* Article header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">{post.category}</span>
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {post.date}</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {post.readTime}</span>
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">Automotive Writer</p>
              </div>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Article content */}
          <div 
            className="prose max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Article footer with share buttons */}
          <div className="border-t border-b py-6 mb-12">
            <div className="flex justify-between items-center">
              <p className="font-medium">Share this article:</p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground">{relatedPost.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
