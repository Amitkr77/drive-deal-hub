
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedListings from "@/components/FeaturedListings";
import ListingPackages from "@/components/ListingPackages";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <SearchBar />
          <FeaturedListings />
          <ListingPackages />
          <TestimonialsSection />
          <BlogSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
