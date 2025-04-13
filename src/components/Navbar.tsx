
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, User, Car, Heart, Search, FileText, HelpCircle, Info, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <User className="mr-2 h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/sell-car">
                        <Car className="mr-2 h-4 w-4" />
                        <span>Sell a Car</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
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

              {isAuthenticated ? (
                <>
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
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="px-2 py-1 rounded-md hover:bg-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Admin Panel</span>
                      </div>
                    </Link>
                  )}
                  <button
                    className="px-2 py-1 rounded-md hover:bg-secondary flex items-center space-x-2 w-full text-left"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
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
              )}
              
              {!isAuthenticated && (
                <Link to="/sell-car" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-accent text-white hover:bg-accent/90">
                    Sell Your Car Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
