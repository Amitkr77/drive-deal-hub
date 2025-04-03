
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard, { Car } from './CarCard';

// Sample featured car data
const FEATURED_CARS: Car[] = [
  {
    id: '1',
    title: '2021 BMW 3 Series 330i',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    price: 42999,
    year: 2021,
    mileage: 25400,
    location: 'Chicago, IL',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    isFeatured: true
  },
  {
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
    isFeatured: true
  },
  {
    id: '3',
    title: '2020 Toyota RAV4 Hybrid XLE',
    image: 'https://images.unsplash.com/photo-1581829095498-4bb91e4631e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: 32995,
    year: 2020,
    mileage: 31500,
    location: 'Seattle, WA',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    isFeatured: true
  },
  {
    id: '4',
    title: '2019 Honda Accord Sport',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: 25450,
    year: 2019,
    mileage: 45200,
    location: 'Portland, OR',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    isFeatured: true
  }
];

const FeaturedListings = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setFeaturedCars(FEATURED_CARS);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="mb-2">Featured Listings</h2>
            <p className="text-muted-foreground">Explore our hand-picked selection of top vehicles</p>
          </div>
          <Link to="/cars" className="text-accent font-medium hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
