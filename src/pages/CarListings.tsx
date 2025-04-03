
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CarCard, { Car } from '@/components/CarCard';
import SearchBar from '@/components/SearchBar';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

// Sample car data
const ALL_CARS: Car[] = [
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
  },
  {
    id: '5',
    title: '2018 Ford Mustang GT',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 34900,
    year: 2018,
    mileage: 38500,
    location: 'Los Angeles, CA',
    fuelType: 'Gasoline',
    transmission: 'Manual',
  },
  {
    id: '6',
    title: '2023 Kia Telluride SX',
    image: 'https://images.unsplash.com/photo-1669217589378-23fc663323d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    price: 45775,
    year: 2023,
    mileage: 5200,
    location: 'Phoenix, AZ',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    isNew: true
  },
  {
    id: '7',
    title: '2021 Mazda CX-5 Grand Touring',
    image: 'https://images.unsplash.com/photo-1612911912304-22e2b5be0008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 29995,
    year: 2021,
    mileage: 18700,
    location: 'Denver, CO',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
  },
  {
    id: '8',
    title: '2020 Subaru Outback Limited',
    image: 'https://images.unsplash.com/photo-1638618164682-12b986227557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 31450,
    year: 2020,
    mileage: 28600,
    location: 'Minneapolis, MN',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
  }
];

const CarListings = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2023]);
  
  // Initial load
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCars(ALL_CARS);
      setFilteredCars(ALL_CARS);
      setLoading(false);
    }, 500);
  }, []);
  
  // Apply filters when search params or filter states change
  useEffect(() => {
    if (cars.length === 0) return;
    
    let results = [...cars];
    
    // Apply search query filter
    const query = searchParams.get('query')?.toLowerCase();
    if (query) {
      results = results.filter(car => 
        car.title.toLowerCase().includes(query) || 
        car.location.toLowerCase().includes(query)
      );
    }
    
    // Apply brand filter
    const brand = searchParams.get('brand')?.toLowerCase();
    if (brand) {
      results = results.filter(car => 
        car.title.toLowerCase().includes(brand)
      );
    }
    
    // Apply price range filter from URL
    const priceParam = searchParams.get('price');
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(p => parseInt(p) || 0);
      results = results.filter(car => {
        if (max) {
          return car.price >= min && car.price <= max;
        } else {
          // Handle cases like "50000+" where there's only a minimum
          return car.price >= min;
        }
      });
    } else {
      // Apply price range from state
      results = results.filter(car => 
        car.price >= priceRange[0] && car.price <= priceRange[1]
      );
    }
    
    // Apply fuel type filter
    if (fuelTypes.length > 0) {
      results = results.filter(car => fuelTypes.includes(car.fuelType));
    }
    
    // Apply transmission filter
    if (transmissions.length > 0) {
      results = results.filter(car => transmissions.includes(car.transmission));
    }
    
    // Apply year range filter
    results = results.filter(car => 
      car.year >= yearRange[0] && car.year <= yearRange[1]
    );
    
    setFilteredCars(results);
  }, [searchParams, cars, priceRange, fuelTypes, transmissions, yearRange]);
  
  // Handle fuel type checkbox change
  const handleFuelTypeChange = (type: string) => {
    setFuelTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  
  // Handle transmission checkbox change
  const handleTransmissionChange = (type: string) => {
    setTransmissions(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 100000]);
    setFuelTypes([]);
    setTransmissions([]);
    setYearRange([2010, 2023]);
  };
  
  return (
    <div>
      <Navbar />
      
      <main className="pb-16">
        {/* Search Bar Header */}
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-primary-foreground mb-6">Find Your Perfect Car</h1>
            <SearchBar />
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset All
                  </Button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100000]}
                      max={100000}
                      step={1000}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Year Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Year Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[2010, 2023]}
                      min={2010}
                      max={2023}
                      step={1}
                      value={yearRange}
                      onValueChange={(value) => setYearRange(value as [number, number])}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Fuel Type */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Fuel Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-gasoline"
                        checked={fuelTypes.includes('Gasoline')}
                        onCheckedChange={() => handleFuelTypeChange('Gasoline')}
                      />
                      <label htmlFor="fuel-gasoline" className="ml-2 text-sm">Gasoline</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-diesel"
                        checked={fuelTypes.includes('Diesel')}
                        onCheckedChange={() => handleFuelTypeChange('Diesel')}
                      />
                      <label htmlFor="fuel-diesel" className="ml-2 text-sm">Diesel</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-hybrid"
                        checked={fuelTypes.includes('Hybrid')}
                        onCheckedChange={() => handleFuelTypeChange('Hybrid')}
                      />
                      <label htmlFor="fuel-hybrid" className="ml-2 text-sm">Hybrid</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-electric"
                        checked={fuelTypes.includes('Electric')}
                        onCheckedChange={() => handleFuelTypeChange('Electric')}
                      />
                      <label htmlFor="fuel-electric" className="ml-2 text-sm">Electric</label>
                    </div>
                  </div>
                </div>
                
                {/* Transmission */}
                <div>
                  <h4 className="font-semibold mb-4">Transmission</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="trans-automatic"
                        checked={transmissions.includes('Automatic')}
                        onCheckedChange={() => handleTransmissionChange('Automatic')}
                      />
                      <label htmlFor="trans-automatic" className="ml-2 text-sm">Automatic</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="trans-manual"
                        checked={transmissions.includes('Manual')}
                        onCheckedChange={() => handleTransmissionChange('Manual')}
                      />
                      <label htmlFor="trans-manual" className="ml-2 text-sm">Manual</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Car Listings */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium">{filteredCars.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  {/* Sort options could go here */}
                </div>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="h-80 animate-pulse bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">No cars match your search</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                  <Button onClick={resetFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarListings;
