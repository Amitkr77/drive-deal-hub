import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedListings from "@/components/FeaturedListings";
import ListingPackages from "@/components/ListingPackages";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { Shield, Heart, Star, Link, Search, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
          <FeaturedListings />
          {/* Why Choose Us */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="mb-3">Why Choose DriveDealHub</h2>
                <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                  We're committed to making the car buying and selling process
                  as smooth as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="flex items-start p-6 rounded-lg bg-primary-foreground/5">
                  <Shield className="h-10 w-10 text-accent flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Trusted Sellers</h3>
                    <p className="text-primary-foreground/80">
                      All sellers are verified to ensure a safe and trustworthy
                      marketplace.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start p-6 rounded-lg bg-primary-foreground/5">
                  <Heart className="h-10 w-10 text-accent flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">No Hidden Fees</h3>
                    <p className="text-primary-foreground/80">
                      We don't charge any commission or hidden fees on your
                      transactions.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start p-6 rounded-lg bg-primary-foreground/5">
                  <Star className="h-10 w-10 text-accent flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Quality Listings</h3>
                    <p className="text-primary-foreground/80">
                      We ensure all listings meet our quality standards for
                      descriptions and images.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="About DriveDealHub"
                    className="rounded-lg shadow-lg w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="mb-4">About DriveDealHub</h2>
                  <p className="text-muted-foreground mb-6">
                    DriveDealHub was founded in 2023 with a simple mission: to
                    create a transparent, user-friendly platform where car
                    buyers and sellers can connect directly without middlemen or
                    excessive fees.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Our platform is designed to streamline the car buying and
                    selling process, providing detailed listings, direct
                    communication channels, and helpful resources to ensure both
                    parties can make informed decisions.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    Whether you're looking to sell your current vehicle or find
                    your dream car, DriveDealHub offers the tools and support
                    you need to make it happen.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/about">Learn More About Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <TestimonialsSection />
          <BlogSection />
          <ListingPackages />
          {/* How It Works */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="mb-3">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  DriveDealHub makes buying and selling cars simple. Follow
                  these easy steps to get started.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Browse Listings</h3>
                  <p className="text-muted-foreground">
                    Search our extensive inventory of quality vehicles using
                    filters to find exactly what you're looking for.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Contact Seller</h3>
                  <p className="text-muted-foreground">
                    Once you find a car you like, connect directly with the
                    seller via phone, email, or WhatsApp.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Finalize Deal</h3>
                  <p className="text-muted-foreground">
                    Meet with the seller, inspect the vehicle, test drive, and
                    complete the purchase on your terms.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* CTA Banner */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="bg-accent rounded-xl p-8 md:p-12 text-white text-center">
                <h2 className="mb-4">Ready to Sell Your Car?</h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-8">
                  List your vehicle on DriveDealHub and connect with thousands
                  of potential buyers in your area. It's quick, easy, and free!
                </p>
                <Link to="/sell-car">
                  <Button className="bg-white text-accent hover:bg-white/90">
                    List Your Car Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
