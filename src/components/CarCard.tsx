
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Car {
  id: string;
  title: string;
  image: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  fuelType: string;
  transmission: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md group">
      <div className="relative">
        {/* Image */}
        <Link to={`/cars/${car.id}`}>
          <div className="aspect-[16/10] overflow-hidden">
            <img 
              src={car.image} 
              alt={car.title} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        
        {/* Badge if car is new */}
        {car.isNew && (
          <Badge className="absolute top-2 left-2 bg-accent text-white">New</Badge>
        )}
        
        {/* Wishlist button */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/cars/${car.id}`} className="hover:text-accent transition-colors">
            <h3 className="font-bold text-lg line-clamp-1">{car.title}</h3>
          </Link>
          <p className="font-bold text-lg text-accent">${car.price.toLocaleString()}</p>
        </div>
        
        <div className="mb-3 text-muted-foreground text-sm">
          <p className="line-clamp-1">{car.location}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">Year:</span> {car.year}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Mileage:</span> {car.mileage.toLocaleString()} mi
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Fuel:</span> {car.fuelType}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Trans:</span> {car.transmission}
          </div>
        </div>
        
        <Link to={`/cars/${car.id}`}>
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CarCard;
