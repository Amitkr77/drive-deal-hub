
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
import { Car, Pencil, Trash, Filter, Eye } from 'lucide-react';

const CarListingsSection = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for demonstration
  const listings = [
    { id: 1, title: "2020 Audi A4", seller: "David Williams", price: "$28,500", status: "approved", date: "2023-04-10" },
    { id: 2, title: "2019 BMW 3 Series", seller: "Emily Parker", price: "$26,900", status: "pending", date: "2023-04-11" },
    { id: 3, title: "2021 Tesla Model 3", seller: "Michael Johnson", price: "$42,000", status: "approved", date: "2023-04-09" },
    { id: 4, title: "2018 Mercedes-Benz C-Class", seller: "Jennifer Adams", price: "$24,500", status: "approved", date: "2023-04-08" },
    { id: 5, title: "2022 Toyota Camry", seller: "Sarah Johnson", price: "$27,800", status: "rejected", date: "2023-04-12" },
  ];

  const filteredListings = filter === "all" 
    ? listings 
    : listings.filter(listing => listing.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car Listings</h1>
        <Button className="bg-accent hover:bg-accent/90">
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
          />
          <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
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
    </div>
  );
};

export default CarListingsSection;
