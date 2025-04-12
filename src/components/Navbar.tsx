
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, User, Car, Heart, Search, FileText, HelpCircle, Info } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold">DriveDealHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cars" className="text-foreground hover:text-accent transition-colors">Browse Cars</Link>
            <Link to="/sell-car" className="text-foreground hover:text-accent transition-colors">Sell Your Car</Link>
            <Link to="/blog" className="text-foreground hover:text-accent transition-colors">Blog</Link>
            <Link to="/about-us" className="text-foreground hover:text-accent transition-colors">About Us</Link>
            <Link to="/contact-us" className="text-foreground hover:text-accent transition-colors">Contact</Link>
          </div>
          
          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/sell-car">
              <Button className="bg-accent text-white hover:bg-accent/90 flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Sell Now</span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/cars" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Browse Cars</span>
                </div>
              </Link>
              <Link 
                to="/sell-car" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Sell Your Car</span>
                </div>
              </Link>
              <Link 
                to="/blog" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Blog</span>
                </div>
              </Link>
              <Link 
                to="/about-us" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>About Us</span>
                </div>
              </Link>
              <Link 
                to="/contact-us" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Contact</span>
                </div>
              </Link>
              <Link 
                to="/dashboard" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link 
                to="/login" 
                className="px-2 py-1 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </div>
              </Link>
              <Link to="/sell-car" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-accent text-white hover:bg-accent/90">
                  Sell Your Car Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
