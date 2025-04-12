
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Edit, 
  Trash, 
  Car as CarIcon, 
  Filter, 
  PieChart, 
  ChevronDown, 
  CheckCircle 
} from 'lucide-react';

// Type definitions
export type ListingStatus = 'active' | 'pending' | 'sold' | 'draft';

export type ListingItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  fuelType: string;
  transmission: string;
  status: ListingStatus;
  views: number;
  publishedDate: string;
};

interface MyListingsTabProps {
  myListings: ListingItem[];
  onViewListing: (listing: ListingItem) => void;
  onEditListing: (listing: ListingItem) => void;
  onDeleteListing: (listing: ListingItem) => void;
}

export const MyListingsTab = ({
  myListings,
  onViewListing,
  onEditListing,
  onDeleteListing
}: MyListingsTabProps) => {
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredListings, setFilteredListings] = useState(myListings);

  // Effect for filtering listings
  useEffect(() => {
    let filtered = [...myListings];
    
    // Filter by status
    if (activeStatus !== 'all') {
      filtered = filtered.filter(listing => listing.status === activeStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort listings
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => b.views - a.views);
    }
    
    setFilteredListings(filtered);
  }, [activeStatus, searchTerm, sortBy, myListings]);

  // Status badge component for reuse
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending Approval</Badge>;
      case 'sold':
        return <Badge className="bg-blue-500">Sold</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Car Listings</h2>
          <Link to="/sell-car">
            <Button className="bg-accent text-white hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </Link>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="flex-grow">
            <Input
              placeholder="Search your listings..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveStatus('all')}>
                  <div className="flex items-center gap-2">
                    {activeStatus === 'all' && <CheckCircle className="h-4 w-4" />}
                    <span className={activeStatus === 'all' ? 'font-medium' : ''}>All listings</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveStatus('active')}>
                  <div className="flex items-center gap-2">
                    {activeStatus === 'active' && <CheckCircle className="h-4 w-4" />}
                    <span className={activeStatus === 'active' ? 'font-medium' : ''}>Active</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveStatus('pending')}>
                  <div className="flex items-center gap-2">
                    {activeStatus === 'pending' && <CheckCircle className="h-4 w-4" />}
                    <span className={activeStatus === 'pending' ? 'font-medium' : ''}>Pending</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveStatus('sold')}>
                  <div className="flex items-center gap-2">
                    {activeStatus === 'sold' && <CheckCircle className="h-4 w-4" />}
                    <span className={activeStatus === 'sold' ? 'font-medium' : ''}>Sold</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveStatus('draft')}>
                  <div className="flex items-center gap-2">
                    {activeStatus === 'draft' && <CheckCircle className="h-4 w-4" />}
                    <span className={activeStatus === 'draft' ? 'font-medium' : ''}>Draft</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <PieChart className="h-4 w-4 mr-2" />
                  Sort by
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  <div className="flex items-center gap-2">
                    {sortBy === 'newest' && <CheckCircle className="h-4 w-4" />}
                    <span className={sortBy === 'newest' ? 'font-medium' : ''}>Newest first</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                  <div className="flex items-center gap-2">
                    {sortBy === 'oldest' && <CheckCircle className="h-4 w-4" />}
                    <span className={sortBy === 'oldest' ? 'font-medium' : ''}>Oldest first</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')}>
                  <div className="flex items-center gap-2">
                    {sortBy === 'price-high' && <CheckCircle className="h-4 w-4" />}
                    <span className={sortBy === 'price-high' ? 'font-medium' : ''}>Price: high to low</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')}>
                  <div className="flex items-center gap-2">
                    {sortBy === 'price-low' && <CheckCircle className="h-4 w-4" />}
                    <span className={sortBy === 'price-low' ? 'font-medium' : ''}>Price: low to high</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('views')}>
                  <div className="flex items-center gap-2">
                    {sortBy === 'views' && <CheckCircle className="h-4 w-4" />}
                    <span className={sortBy === 'views' ? 'font-medium' : ''}>Most viewed</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {filteredListings.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
              <CarIcon className="h-8 w-8 text-primary/70" />
            </div>
            <CardTitle className="mb-2">No Listings Found</CardTitle>
            <CardDescription className="mb-6">
              {searchTerm || activeStatus !== 'all'
                ? "No listings match your current filters. Try adjusting your search criteria."
                : "You haven't listed any cars for sale yet. Start selling now!"}
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
          {filteredListings.map((car) => (
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
                        {getStatusBadge(car.status)}
                        <span className="text-sm text-muted-foreground">
                          {car.views} Views
                        </span>
                        {car.publishedDate && (
                          <span className="text-sm text-muted-foreground">
                            Posted: {car.publishedDate}
                          </span>
                        )}
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
                      onClick={() => onEditListing(car)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-1"
                      onClick={() => onDeleteListing(car)}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-accent text-white hover:bg-accent/90"
                      onClick={() => onViewListing(car)}
                    >
                      View Details
                    </Button>
                    
                    {car.status === 'draft' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="ml-auto text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Publish
                      </Button>
                    )}
                    
                    {car.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="ml-auto text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Mark as Sold
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
