
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CarCard, { Car } from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash, 
  Car as CarIcon, 
  Heart, 
  User, 
  Settings, 
  Bell, 
  ChevronDown, 
  Filter, 
  PieChart, 
  DollarSign, 
  Users, 
  Eye, 
  Clock, 
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

// Sample data
const myListings: (Car & {status: 'active' | 'pending' | 'sold' | 'draft', views: number, publishedDate: string})[] = [
  {
    id: '101',
    title: '2019 Ford Mustang GT',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 34900,
    year: 2019,
    mileage: 28500,
    location: 'San Francisco, CA',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    status: 'active',
    views: 124,
    publishedDate: '2023-05-15'
  },
  {
    id: '102',
    title: '2020 Toyota RAV4 Hybrid',
    image: 'https://images.unsplash.com/photo-1581829095498-4bb91e4631e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: 32995,
    year: 2020,
    mileage: 31500,
    location: 'Los Angeles, CA',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    status: 'pending',
    views: 45,
    publishedDate: '2023-06-21'
  },
  {
    id: '103',
    title: '2021 Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    price: 46990,
    year: 2021,
    mileage: 15200,
    location: 'Seattle, WA',
    fuelType: 'Electric',
    transmission: 'Automatic',
    status: 'sold',
    views: 89,
    publishedDate: '2023-04-10'
  },
  {
    id: '104',
    title: '2018 Honda Civic Si',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    price: 22500,
    year: 2018,
    mileage: 45600,
    location: 'Chicago, IL',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    status: 'draft',
    views: 0,
    publishedDate: ''
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
  },
  {
    id: '3',
    title: '2023 Audi Q5 Premium Plus',
    image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80',
    price: 54500,
    year: 2023,
    mileage: 5800,
    location: 'Denver, CO',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    isNew: true,
  }
];

// Sample notifications
const notifications = [
  { id: 1, message: 'Your listing "2019 Ford Mustang GT" has a new inquiry', read: false, date: '5m ago' },
  { id: 2, message: 'Your profile was viewed by 5 potential buyers today', read: false, date: '2h ago' },
  { id: 3, message: 'Price drop alert: A BMW 3 Series you saved is now $2,000 cheaper', read: true, date: '1d ago' },
  { id: 4, message: 'Congratulations! Your listing "2018 Honda Accord" was sold', read: true, date: '3d ago' },
  { id: 5, message: 'New feature: You can now add 360° photos to your listings', read: true, date: '1w ago' },
];

// Recent activities
const recentActivities = [
  { id: 1, type: 'view', message: 'Someone viewed your 2019 Ford Mustang GT', time: '20 minutes ago' },
  { id: 2, type: 'inquiry', message: 'New message about Toyota RAV4 Hybrid', time: '2 hours ago' },
  { id: 3, type: 'saved', message: 'Your listing was saved by a potential buyer', time: '5 hours ago' },
  { id: 4, type: 'review', message: 'You received a 5-star seller rating', time: 'Yesterday' },
  { id: 5, type: 'sale', message: 'You sold your Honda Accord for $22,500', time: '3 days ago' },
];

const Dashboard = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    joinedDate: 'January 2023',
    avatar: '',
    location: 'San Francisco, CA',
    bio: "Car enthusiast with a passion for classics and modern sports cars."
  });
  
  // State for the dashboard
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter(n => !n.read).length);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filteredListings, setFilteredListings] = useState(myListings);
  const [selectedListing, setSelectedListing] = useState<null | (Car & {status: string, views: number, publishedDate: string})>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Stats
  const stats = {
    totalListings: myListings.length,
    activeListings: myListings.filter(listing => listing.status === 'active').length,
    totalSaved: savedCars.length,
    totalViews: myListings.reduce((sum, listing) => sum + listing.views, 0),
    averageViewsPerListing: Math.round(myListings.reduce((sum, listing) => sum + listing.views, 0) / myListings.length),
    totalSold: myListings.filter(listing => listing.status === 'sold').length,
    averageResponseTime: '2 hours'
  };
  
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
  }, [activeStatus, searchTerm, sortBy]);
  
  // Handlers for notifications
  const markAllAsRead = () => {
    const updatedNotifications = notificationsList.map(notification => ({ 
      ...notification, 
      read: true 
    }));
    setNotificationsList(updatedNotifications);
    setUnreadNotifications(0);
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };
  
  const markAsRead = (id: number) => {
    const updatedNotifications = notificationsList.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotificationsList(updatedNotifications);
    setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
  };
  
  // Handlers for listing actions
  const viewListingDetails = (listing: Car & {status: string, views: number, publishedDate: string}) => {
    setSelectedListing(listing);
    setIsViewModalOpen(true);
  };
  
  const editListing = (listing: Car & {status: string, views: number, publishedDate: string}) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };
  
  const deleteListing = (listing: Car & {status: string, views: number, publishedDate: string}) => {
    setSelectedListing(listing);
    setIsDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would make an API call to delete the listing
    toast({
      title: "Success",
      description: `"${selectedListing?.title}" has been deleted`,
    });
    setIsDeleteDialogOpen(false);
  };
  
  const handleSaveListing = () => {
    // In a real app, this would make an API call to update the listing
    toast({
      title: "Success",
      description: "Your listing has been updated",
    });
    setIsEditModalOpen(false);
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    toast({
      title: "Success", 
      description: "Your profile has been updated"
    });
    setIsProfileEditOpen(false);
  };
  
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
    <div>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    {userData.avatar ? (
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/5 text-primary text-xl">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since {userData.joinedDate}</p>
                  <p className="text-sm text-muted-foreground mt-1">{userData.location}</p>
                  
                  <Dialog open={isProfileEditOpen} onOpenChange={setIsProfileEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Edit className="h-4 w-4 mr-1" /> Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your personal information and contact details.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateProfile}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right">
                              Name
                            </label>
                            <Input 
                              id="name" 
                              className="col-span-3" 
                              value={userData.name}
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="email" className="text-right">
                              Email
                            </label>
                            <Input 
                              id="email" 
                              className="col-span-3"
                              type="email"
                              value={userData.email}
                              onChange={(e) => setUserData({...userData, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="phone" className="text-right">
                              Phone
                            </label>
                            <Input 
                              id="phone" 
                              className="col-span-3"
                              value={userData.phone}
                              onChange={(e) => setUserData({...userData, phone: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="location" className="text-right">
                              Location
                            </label>
                            <Input 
                              id="location" 
                              className="col-span-3"
                              value={userData.location}
                              onChange={(e) => setUserData({...userData, location: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="bio" className="text-right">
                              Bio
                            </label>
                            <Input 
                              id="bio" 
                              className="col-span-3"
                              value={userData.bio}
                              onChange={(e) => setUserData({...userData, bio: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2">
                  <Link to="/sell-car" className="w-full">
                    <Button className="w-full bg-accent text-white hover:bg-accent/90 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      List a New Car
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span>Notifications</span>
                        </div>
                        {unreadNotifications > 0 && (
                          <Badge className="bg-accent ml-2 text-xs">{unreadNotifications}</Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80">
                      <DropdownMenuLabel className="flex justify-between items-center">
                        <span>Recent Notifications</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-60 overflow-y-auto">
                        {notificationsList.length > 0 ? (
                          notificationsList.map(notification => (
                            <DropdownMenuItem 
                              key={notification.id} 
                              className={`flex flex-col items-start p-3 ${!notification.read ? 'bg-muted/50' : ''}`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="text-sm w-full">{notification.message}</div>
                              <div className="text-xs text-muted-foreground mt-1 w-full flex justify-between">
                                <span>{notification.date}</span>
                                {!notification.read && <Badge variant="outline" className="text-[10px] h-5">New</Badge>}
                              </div>
                            </DropdownMenuItem>
                          ))
                        ) : (
                          <div className="p-3 text-center text-sm text-muted-foreground">
                            No notifications
                          </div>
                        )}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="justify-center" asChild>
                        <Link to="#">View all notifications</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
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
                      {userData.email}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Listings</span>
                  </div>
                  <span className="font-medium">{stats.totalListings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Active Listings</span>
                  </div>
                  <span className="font-medium">{stats.activeListings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Saved Cars</span>
                  </div>
                  <span className="font-medium">{stats.totalSaved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Views</span>
                  </div>
                  <span className="font-medium">{stats.totalViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Cars Sold</span>
                  </div>
                  <span className="font-medium">{stats.totalSold}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Avg. Response</span>
                  </div>
                  <span className="font-medium">{stats.averageResponseTime}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="bg-muted rounded-full p-1.5 mt-0.5">
                        {activity.type === 'view' && <Eye className="h-3.5 w-3.5" />}
                        {activity.type === 'inquiry' && <Bell className="h-3.5 w-3.5" />}
                        {activity.type === 'saved' && <Heart className="h-3.5 w-3.5" />}
                        {activity.type === 'review' && <CheckCircle className="h-3.5 w-3.5" />}
                        {activity.type === 'sale' && <DollarSign className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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
                                onClick={() => editListing(car)}
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-1"
                                onClick={() => deleteListing(car)}
                              >
                                <Trash className="h-4 w-4" />
                                Delete
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-accent text-white hover:bg-accent/90"
                                onClick={() => viewListingDetails(car)}
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
      
      {/* View Listing Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Listing Details</DialogTitle>
          </DialogHeader>
          
          {selectedListing && (
            <div className="space-y-4">
              <div className="aspect-[16/10] overflow-hidden rounded-md">
                <img 
                  src={selectedListing.image} 
                  alt={selectedListing.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{selectedListing.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(selectedListing.status)}
                  <span className="text-sm">${selectedListing.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Year</span>
                  <span>{selectedListing.year}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Mileage</span>
                  <span>{selectedListing.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Fuel Type</span>
                  <span>{selectedListing.fuelType}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Transmission</span>
                  <span>{selectedListing.transmission}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span>{selectedListing.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span>{selectedListing.views}</span>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setIsViewModalOpen(false);
                  setIsEditModalOpen(true);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Listing
                </Button>
                
                <Button className="bg-accent text-white hover:bg-accent/90">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Page
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Listing Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription>
              Make changes to your listing details below.
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveListing();
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input 
                    id="title" 
                    value={selectedListing.title}
                    onChange={(e) => setSelectedListing({...selectedListing, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price ($)
                  </label>
                  <Input 
                    id="price" 
                    type="number"
                    value={selectedListing.price}
                    onChange={(e) => setSelectedListing({...selectedListing, price: Number(e.target.value)})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="year" className="text-sm font-medium">
                      Year
                    </label>
                    <Input 
                      id="year" 
                      type="number"
                      value={selectedListing.year}
                      onChange={(e) => setSelectedListing({...selectedListing, year: Number(e.target.value)})}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="mileage" className="text-sm font-medium">
                      Mileage
                    </label>
                    <Input 
                      id="mileage" 
                      type="number"
                      value={selectedListing.mileage}
                      onChange={(e) => setSelectedListing({...selectedListing, mileage: Number(e.target.value)})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input 
                    id="location" 
                    value={selectedListing.location}
                    onChange={(e) => setSelectedListing({...selectedListing, location: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="fuelType" className="text-sm font-medium">
                      Fuel Type
                    </label>
                    <Input 
                      id="fuelType" 
                      value={selectedListing.fuelType}
                      onChange={(e) => setSelectedListing({...selectedListing, fuelType: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="transmission" className="text-sm font-medium">
                      Transmission
                    </label>
                    <Input 
                      id="transmission" 
                      value={selectedListing.transmission}
                      onChange={(e) => setSelectedListing({...selectedListing, transmission: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="status-active" 
                        checked={selectedListing.status === 'active'}
                        onCheckedChange={() => setSelectedListing({...selectedListing, status: 'active'})}
                      />
                      <label htmlFor="status-active" className="text-sm">Active</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="status-pending" 
                        checked={selectedListing.status === 'pending'}
                        onCheckedChange={() => setSelectedListing({...selectedListing, status: 'pending'})}
                      />
                      <label htmlFor="status-pending" className="text-sm">Pending</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="status-sold" 
                        checked={selectedListing.status === 'sold'}
                        onCheckedChange={() => setSelectedListing({...selectedListing, status: 'sold'})}
                      />
                      <label htmlFor="status-sold" className="text-sm">Sold</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="status-draft" 
                        checked={selectedListing.status === 'draft'}
                        onCheckedChange={() => setSelectedListing({...selectedListing, status: 'draft'})}
                      />
                      <label htmlFor="status-draft" className="text-sm">Draft</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
            >
              Delete Listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
