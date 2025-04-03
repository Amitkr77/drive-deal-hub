
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CarCard, { Car } from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Car as CarIcon, Heart, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data
const myListings: (Car & {status: 'active' | 'pending' | 'sold', views: number})[] = [
  {
    id: '101',
    title: '2019 Ford Mustang GT',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 34900,
    year: 2019,
    mileage: 28500,
    location: 'Your Location',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    status: 'active',
    views: 124
  },
  {
    id: '102',
    title: '2020 Toyota RAV4 Hybrid',
    image: 'https://images.unsplash.com/photo-1581829095498-4bb91e4631e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: 32995,
    year: 2020,
    mileage: 31500,
    location: 'Your Location',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    status: 'pending',
    views: 45
  }
];

const savedCars: Car[] = [
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
  }
];

const Dashboard = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinedDate: 'January 2023',
    phone: '(123) 456-7890'
  };
  
  return (
    <div>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since {user.joinedDate}</p>
                </div>
                
                <div className="space-y-2">
                  <Link to="/sell-car" className="w-full">
                    <Button className="w-full bg-accent text-white hover:bg-accent/90 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      List a New Car
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-muted-foreground mb-2">
                    Contact Information:
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                      {user.email}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      {user.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="listings" className="text-base">
                  <CarIcon className="h-4 w-4 mr-2" />
                  My Listings
                </TabsTrigger>
                <TabsTrigger value="saved" className="text-base">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Cars
                </TabsTrigger>
              </TabsList>
              
              {/* My Listings Tab */}
              <TabsContent value="listings">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Car Listings</h2>
                  <Link to="/sell-car">
                    <Button className="bg-accent text-white hover:bg-accent/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Listing
                    </Button>
                  </Link>
                </div>
                
                {myListings.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                        <CarIcon className="h-8 w-8 text-primary/70" />
                      </div>
                      <CardTitle className="mb-2">No Listings Yet</CardTitle>
                      <CardDescription className="mb-6">
                        You haven't listed any cars for sale yet. Start selling now!
                      </CardDescription>
                      <Link to="/sell-car">
                        <Button className="bg-accent text-white hover:bg-accent/90">
                          <Plus className="h-4 w-4 mr-2" />
                          List Your First Car
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {myListings.map((car) => (
                      <Card key={car.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          {/* Car Image */}
                          <div className="md:w-1/3">
                            <div className="aspect-[16/10]">
                              <img 
                                src={car.image} 
                                alt={car.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Car Details */}
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-xl mb-2">{car.title}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                  <Badge className={
                                    car.status === 'active' ? 'bg-green-500' : 
                                    car.status === 'pending' ? 'bg-amber-500' : 'bg-blue-500'
                                  }>
                                    {car.status === 'active' ? 'Active' : 
                                     car.status === 'pending' ? 'Pending Approval' : 'Sold'}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {car.views} Views
                                  </span>
                                </div>
                              </div>
                              <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Year:</span> {car.year}
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Mileage:</span> {car.mileage.toLocaleString()} mi
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Fuel:</span> {car.fuelType}
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Trans:</span> {car.transmission}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-1"
                              >
                                <Trash className="h-4 w-4" />
                                Delete
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-accent text-white hover:bg-accent/90"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Saved Cars Tab */}
              <TabsContent value="saved">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Saved Cars</h2>
                  <p className="text-muted-foreground">Cars you've saved to your wishlist</p>
                </div>
                
                {savedCars.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8 text-primary/70" />
                      </div>
                      <CardTitle className="mb-2">No Saved Cars</CardTitle>
                      <CardDescription className="mb-6">
                        You haven't saved any cars to your wishlist yet. Browse cars and click the heart icon to save them here.
                      </CardDescription>
                      <Link to="/cars">
                        <Button className="bg-accent text-white hover:bg-accent/90">
                          Browse Cars
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedCars.map((car) => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
