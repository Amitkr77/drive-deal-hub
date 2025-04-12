
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Car, Pencil, Trash, Filter, Eye, Plus, Search } from 'lucide-react';

const CarListingsSection = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  
  // Mock data for demonstration
  const listings = [
    { id: 1, title: "2020 Audi A4", seller: "David Williams", price: "$28,500", status: "approved", date: "2023-04-10", description: "Excellent condition, one owner, full service history, low mileage." },
    { id: 2, title: "2019 BMW 3 Series", seller: "Emily Parker", price: "$26,900", status: "pending", date: "2023-04-11", description: "Well maintained, no accidents, premium package, leather seats." },
    { id: 3, title: "2021 Tesla Model 3", seller: "Michael Johnson", price: "$42,000", status: "approved", date: "2023-04-09", description: "Like new, autopilot, premium sound system, extended range." },
    { id: 4, title: "2018 Mercedes-Benz C-Class", seller: "Jennifer Adams", price: "$24,500", status: "approved", date: "2023-04-08", description: "Good condition, AMG package, panoramic roof, heated seats." },
    { id: 5, title: "2022 Toyota Camry", seller: "Sarah Johnson", price: "$27,800", status: "rejected", date: "2023-04-12", description: "Brand new, hybrid engine, advanced safety features." },
  ];

  const filteredListings = listings
    .filter(listing => filter === "all" ? true : listing.status === filter)
    .filter(listing => 
      searchQuery === "" ? true : 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      listing.seller.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleView = (listing) => {
    setSelectedListing(listing);
    setIsViewModalOpen(true);
  };

  const handleEdit = (listing) => {
    setSelectedListing({...listing});
    setIsEditModalOpen(true);
  };

  const handleDelete = (listing) => {
    setSelectedListing(listing);
    setIsDeleteAlertOpen(true);
  };

  const handleAddNew = () => {
    setSelectedListing({
      id: null,
      title: "",
      seller: "",
      price: "",
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      description: ""
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    // In a real app, would save the changes to the backend
    console.log("Saving changes to:", selectedListing);
    setIsEditModalOpen(false);
  };

  const handleSaveNew = () => {
    // In a real app, would save the new listing to the backend
    console.log("Saving new listing:", selectedListing);
    setIsAddModalOpen(false);
  };

  const confirmDelete = () => {
    // In a real app, would delete the listing from the backend
    console.log("Deleting listing:", selectedListing);
    setIsDeleteAlertOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car Listings</h1>
        <Button className="bg-accent hover:bg-accent/90" onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Filter className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search listings..." 
            className="pl-10 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Listing</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{listing.seller}</TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : listing.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {listing.status}
                  </span>
                </TableCell>
                <TableCell>{listing.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(listing)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(listing)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(listing)}>
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Car Listing</DialogTitle>
            <DialogDescription>
              Detailed information about this car listing.
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="py-4 space-y-4">
              <div>
                <h3 className="font-medium text-lg">{selectedListing.title}</h3>
                <p className="text-muted-foreground">ID: {selectedListing.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2">
                <div>
                  <p className="text-sm font-medium">Seller</p>
                  <p>{selectedListing.seller}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p>{selectedListing.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="capitalize">{selectedListing.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p>{selectedListing.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="mt-1">{selectedListing.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Car Listing</DialogTitle>
            <DialogDescription>
              Make changes to the car listing information.
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="py-4 space-y-4">
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedListing.title}
                    onChange={(e) => setSelectedListing({...selectedListing, title: e.target.value})}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="seller">Seller</Label>
                  <Input
                    id="seller"
                    value={selectedListing.seller}
                    onChange={(e) => setSelectedListing({...selectedListing, seller: e.target.value})}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={selectedListing.price}
                    onChange={(e) => setSelectedListing({...selectedListing, price: e.target.value})}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={selectedListing.status}
                    onValueChange={(value) => setSelectedListing({...selectedListing, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={selectedListing.description}
                    onChange={(e) => setSelectedListing({...selectedListing, description: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Car Listing</DialogTitle>
            <DialogDescription>
              Create a new car listing with detailed information.
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="py-4 space-y-4">
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-title">Title</Label>
                  <Input
                    id="new-title"
                    value={selectedListing.title}
                    onChange={(e) => setSelectedListing({...selectedListing, title: e.target.value})}
                    placeholder="e.g. 2023 Toyota Camry"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-seller">Seller</Label>
                  <Input
                    id="new-seller"
                    value={selectedListing.seller}
                    onChange={(e) => setSelectedListing({...selectedListing, seller: e.target.value})}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-price">Price</Label>
                  <Input
                    id="new-price"
                    value={selectedListing.price}
                    onChange={(e) => setSelectedListing({...selectedListing, price: e.target.value})}
                    placeholder="e.g. $32,500"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-status">Status</Label>
                  <Select 
                    value={selectedListing.status}
                    onValueChange={(value) => setSelectedListing({...selectedListing, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-description">Description</Label>
                  <Textarea
                    id="new-description"
                    value={selectedListing.description}
                    onChange={(e) => setSelectedListing({...selectedListing, description: e.target.value})}
                    placeholder="Enter detailed description of the vehicle..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveNew}>Add Listing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the car listing
              {selectedListing && ` "${selectedListing.title}"`} and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CarListingsSection;
