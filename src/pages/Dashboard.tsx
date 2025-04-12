
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Car } from '@/components/CarCard';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { DashboardModals } from '@/components/dashboard/DashboardModals';
import { ListingItem } from '@/components/dashboard/MyListingsTab';

// Sample data
const myListings: ListingItem[] = [
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
  { id: 1, type: 'view' as const, message: 'Someone viewed your 2019 Ford Mustang GT', time: '20 minutes ago' },
  { id: 2, type: 'inquiry' as const, message: 'New message about Toyota RAV4 Hybrid', time: '2 hours ago' },
  { id: 3, type: 'saved' as const, message: 'Your listing was saved by a potential buyer', time: '5 hours ago' },
  { id: 4, type: 'review' as const, message: 'You received a 5-star seller rating', time: 'Yesterday' },
  { id: 5, type: 'sale' as const, message: 'You sold your Honda Accord for $22,500', time: '3 days ago' },
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
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter(n => !n.read).length);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [selectedListing, setSelectedListing] = useState<null | ListingItem>(null);
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
  
  // Handlers for listing actions
  const viewListingDetails = (listing: ListingItem) => {
    setSelectedListing(listing);
    setIsViewModalOpen(true);
  };
  
  const editListing = (listing: ListingItem) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };
  
  const deleteListing = (listing: ListingItem) => {
    setSelectedListing(listing);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Component */}
          <DashboardSidebar 
            userData={userData}
            setUserData={setUserData}
            stats={stats}
            recentActivities={recentActivities}
            notificationsList={notificationsList}
            unreadNotifications={unreadNotifications}
            setUnreadNotifications={setUnreadNotifications}
            setNotificationsList={setNotificationsList}
          />
          
          {/* Main Content with Tabs */}
          <div className="md:w-3/4">
            <DashboardTabs 
              myListings={myListings}
              savedCars={savedCars}
              onViewListing={viewListingDetails}
              onEditListing={editListing}
              onDeleteListing={deleteListing}
            />
          </div>
        </div>
      </main>
      
      {/* Modals Component */}
      <DashboardModals 
        selectedListing={selectedListing}
        isViewModalOpen={isViewModalOpen}
        setIsViewModalOpen={setIsViewModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        setSelectedListing={setSelectedListing}
      />
    </div>
  );
};

export default Dashboard;
