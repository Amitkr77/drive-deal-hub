
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Heart } from 'lucide-react';
import { MyListingsTab, ListingItem } from './MyListingsTab';
import { SavedCarsTab } from './SavedCarsTab';
import { Car as CarType } from '@/components/CarCard';

interface DashboardTabsProps {
  myListings: ListingItem[];
  savedCars: CarType[];
  onViewListing: (listing: ListingItem) => void;
  onEditListing: (listing: ListingItem) => void;
  onDeleteListing: (listing: ListingItem) => void;
}

export const DashboardTabs = ({
  myListings,
  savedCars,
  onViewListing,
  onEditListing,
  onDeleteListing
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="listings" className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="listings" className="text-base">
          <Car className="h-4 w-4 mr-2" />
          My Listings
        </TabsTrigger>
        <TabsTrigger value="saved" className="text-base">
          <Heart className="h-4 w-4 mr-2" />
          Saved Cars
        </TabsTrigger>
      </TabsList>
      
      {/* My Listings Tab */}
      <TabsContent value="listings">
        <MyListingsTab 
          myListings={myListings}
          onViewListing={onViewListing}
          onEditListing={onEditListing}
          onDeleteListing={onDeleteListing}
        />
      </TabsContent>
      
      {/* Saved Cars Tab */}
      <TabsContent value="saved">
        <SavedCarsTab savedCars={savedCars} />
      </TabsContent>
    </Tabs>
  );
};
