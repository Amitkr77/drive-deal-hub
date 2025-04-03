
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="relative h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl text-white animate-fade-in">
          <h1 className="mb-4">Find Your Perfect Drive</h1>
          <p className="text-lg md:text-xl mb-6 text-white/90">
            Browse thousands of quality vehicles from trusted sellers in your area.
            Your dream car is just a few clicks away.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/cars" className="btn-primary text-center">
              Browse All Cars
            </Link>
            <Link to="/sell-car" className="btn-outline border-white text-white hover:bg-white/10 text-center">
              Sell Your Car
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
