
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Car } from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Share2,
  Phone,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Sample car data (normally would come from API)
const CARS_DATA: Record<string, Car & { 
  description: string,
  features: string[],
  sellerName: string,
  sellerJoined: string,
  sellerPhone: string,
  sellerEmail: string,
  additionalImages?: string[]
}> = {
  '1': {
    id: '1',
    title: '2021 BMW 3 Series 330i',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    price: 42999,
    year: 2021,
    mileage: 25400,
    location: 'Chicago, IL',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    isFeatured: true,
    description: 'This 2021 BMW 3 Series 330i is in excellent condition with only one previous owner. The vehicle features a sleek Alpine White exterior paired with black leather interior. It comes with the Premium Package including heated seats, navigation system, and a panoramic sunroof. The car has been well maintained with full service records available.',
    features: [
      'Premium Package',
      'Navigation System',
      'Heated Seats',
      'Panoramic Sunroof',
      'Blind Spot Detection',
      'LED Headlights',
      'Apple CarPlay & Android Auto',
      '18" Alloy Wheels'
    ],
    sellerName: 'Michael Johnson',
    sellerJoined: 'January 2020',
    sellerPhone: '(312) 555-1234',
    sellerEmail: 'michael@example.com',
    additionalImages: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1556189217-7acd05577332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
      'https://images.unsplash.com/photo-1577494232403-c2c95854b7c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    ]
  },
  '2': {
    id: '2',
    title: '2022 Tesla Model 3 Long Range',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    price: 48900,
    year: 2022,
    mileage: 12800,
    location: 'Austin, TX',
    fuelType: 'Electric',
    transmission: 'Automatic',
    isNew: true,
    isFeatured: true,
    description: 'This 2022 Tesla Model 3 Long Range is in pristine condition with only 12,800 miles. It features the premium black interior with wood decor, 19" Sport Wheels, and Enhanced Autopilot. The vehicle has a range of approximately 358 miles on a full charge and includes a Tesla Wall Connector for home charging (installation not included).',
    features: [
      'Enhanced Autopilot',
      'Premium Interior',
      '19" Sport Wheels',
      'Glass Roof',
      'Premium Audio System',
      'Heated Front and Rear Seats',
      'Full Self-Driving Capability',
      'Home Charging Solution'
    ],
    sellerName: 'Sarah Williams',
    sellerJoined: 'March 2021',
    sellerPhone: '(512) 555-6789',
    sellerEmail: 'sarah@example.com',
    additionalImages: [
      'https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1619809571328-b1cf85a0a210?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1797&q=80',
      'https://images.unsplash.com/photo-1601392540373-ad70e8c50066?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80'
    ]
  }
};

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<(typeof CARS_DATA)[string] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [savedToWishlist, setSavedToWishlist] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (id && CARS_DATA[id]) {
        setCar(CARS_DATA[id]);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Handle image navigation
  const nextImage = () => {
    if (!car || !car.additionalImages) return;
    const allImages = [car.image, ...car.additionalImages];
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    if (!car || !car.additionalImages) return;
    const allImages = [car.image, ...car.additionalImages];
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };
  
  // Handle wishlist toggle
  const toggleWishlist = () => {
    setSavedToWishlist(!savedToWishlist);
    // In a real app, this would make an API request to update the user's wishlist
  };
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-80 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-10 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded-lg mb-8 w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-40 bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-60 bg-gray-200 rounded-lg"></div>
              </div>
              <div>
                <div className="h-80 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!car) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="mb-4">Car Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the car you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/cars">
            <Button>Browse Other Cars</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Prepare all images array
  const allImages = [car.image, ...(car.additionalImages || [])];
  const currentImage = allImages[activeImageIndex];
  
  return (
    <div>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/cars" className="hover:text-accent transition-colors">Cars</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{car.title}</span>
        </div>
        
        {/* Car Gallery */}
        <div className="mb-8">
          <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
            {/* Main Image */}
            <img 
              src={currentImage} 
              alt={car.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {allImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-[16/10] rounded-md overflow-hidden ${
                  activeImageIndex === index ? 'ring-2 ring-accent' : ''
                }`}
              >
                <img 
                  src={img} 
                  alt={`${car.title} - Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
                <div className="text-muted-foreground mb-4">{car.location}</div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.isNew && (
                    <Badge className="bg-accent text-white">New Listing</Badge>
                  )}
                  {car.isFeatured && (
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-accent mb-2">${car.price.toLocaleString()}</div>
                <div className="flex justify-end gap-3 text-muted-foreground">
                  <button 
                    onClick={toggleWishlist}
                    className={`flex items-center gap-1 hover:text-accent transition-colors ${
                      savedToWishlist ? 'text-accent' : ''
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedToWishlist ? 'fill-current' : ''}`} />
                    <span>{savedToWishlist ? 'Saved' : 'Save'}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-accent transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-lg mb-8">
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Year</div>
                <div className="font-semibold">{car.year}</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Mileage</div>
                <div className="font-semibold">{car.mileage.toLocaleString()} mi</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Fuel Type</div>
                <div className="font-semibold">{car.fuelType}</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Transmission</div>
                <div className="font-semibold">{car.transmission}</div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground">{car.description}</p>
            </div>
            
            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Seller Information */}
          <div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Seller Information</h3>
              
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  {car.sellerName.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{car.sellerName}</div>
                  <div className="text-sm text-muted-foreground">Member since {car.sellerJoined}</div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <Button className="w-full flex items-center justify-center gap-2 bg-accent text-white hover:bg-accent/90">
                  <Phone className="h-4 w-4" />
                  <span>{car.sellerPhone}</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Seller</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>By contacting the seller, I agree to the terms and privacy policy of DriveDealHub.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;
