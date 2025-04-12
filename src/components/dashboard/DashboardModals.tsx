
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { ListingItem } from './MyListingsTab';

interface DashboardModalsProps {
  selectedListing: ListingItem | null;
  isViewModalOpen: boolean;
  setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedListing: React.Dispatch<React.SetStateAction<ListingItem | null>>;
}

export const DashboardModals = ({
  selectedListing,
  isViewModalOpen,
  setIsViewModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  setSelectedListing
}: DashboardModalsProps) => {
  
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

  const handleSaveListing = () => {
    // In a real app, this would make an API call to update the listing
    toast({
      title: "Success",
      description: "Your listing has been updated",
    });
    setIsEditModalOpen(false);
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would make an API call to delete the listing
    toast({
      title: "Success",
      description: `"${selectedListing?.title}" has been deleted`,
    });
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
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
    </>
  );
};
