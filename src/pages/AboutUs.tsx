
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Car, Users, ShieldCheck, MessageSquare } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About DriveDealHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting car buyers and sellers with a seamless, transparent platform since 2023.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              DriveDealHub was born from a simple idea: make car buying and selling easier, safer, and more transparent for everyone.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founders, avid car enthusiasts, were frustrated with the complex and often opaque process of buying and selling vehicles online. 
              They envisioned a platform where users could connect directly, access honest information, and complete transactions with confidence.
            </p>
            <p className="text-muted-foreground">
              Today, DriveDealHub serves thousands of users nationwide, helping them find their perfect vehicle match or sell their car quickly and at a fair price.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Team working" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Our Mission & Values */}
        <div className="bg-card rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission & Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To create the most trusted marketplace for automotive buyers and sellers, where transparency, 
                security, and user experience come together to redefine how people trade vehicles.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the go-to platform for all vehicle transactions, known for our commitment to user 
                satisfaction, innovative features, and contribution to a more efficient automotive marketplace.
              </p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <Car className="h-10 w-10 text-accent mb-4" />
              <h4 className="font-semibold mb-2">Transparency</h4>
              <p className="text-sm text-muted-foreground">
                We believe in honest listings and open communication between parties.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <Users className="h-10 w-10 text-accent mb-4" />
              <h4 className="font-semibold mb-2">Community</h4>
              <p className="text-sm text-muted-foreground">
                We foster a supportive community of car enthusiasts and everyday drivers.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <ShieldCheck className="h-10 w-10 text-accent mb-4" />
              <h4 className="font-semibold mb-2">Security</h4>
              <p className="text-sm text-muted-foreground">
                We prioritize user safety in both online interactions and real-world meetings.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <MessageSquare className="h-10 w-10 text-accent mb-4" />
              <h4 className="font-semibold mb-2">Support</h4>
              <p className="text-sm text-muted-foreground">
                We provide exceptional customer service and resources for successful transactions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Leadership Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">John Carmichael</h3>
              <p className="text-muted-foreground">CEO & Co-Founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Sarah Johnson</h3>
              <p className="text-muted-foreground">CTO & Co-Founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop" 
                  alt="COO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Michael Chen</h3>
              <p className="text-muted-foreground">COO</p>
            </div>
          </div>
        </div>
        
        {/* Join Us Section */}
        <div className="bg-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Whether you're looking to find your dream car or sell your current vehicle, 
            DriveDealHub provides the tools and community to make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/cars">Browse Cars</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/sell-car">List Your Car</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
