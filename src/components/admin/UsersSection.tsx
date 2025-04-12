
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
import { Users, User, UserPlus, Ban, Check, Search, Filter, Mail, Phone } from 'lucide-react';

const UsersSection = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusAlertOpen, setIsStatusAlertOpen] = useState(false);
  const [statusAction, setStatusAction] = useState("");
  
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "buyer", phone: "555-123-4567", status: "active", registered: "2023-01-15", lastLogin: "2023-04-12", listings: 0, purchases: 3 },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "seller", phone: "555-987-6543", status: "active", registered: "2023-02-20", lastLogin: "2023-04-10", listings: 2, purchases: 0 },
    { id: 3, name: "Robert Johnson", email: "robert.johnson@example.com", role: "buyer/seller", phone: "555-456-7890", status: "inactive", registered: "2023-01-05", lastLogin: "2023-03-01", listings: 1, purchases: 1 },
    { id: 4, name: "Emily Wilson", email: "emily.wilson@example.com", role: "seller", phone: "555-222-3333", status: "active", registered: "2023-03-10", lastLogin: "2023-04-11", listings: 4, purchases: 0 },
    { id: 5, name: "Michael Brown", email: "michael.brown@example.com", role: "buyer", phone: "555-888-9999", status: "suspended", registered: "2023-02-28", lastLogin: "2023-03-15", listings: 0, purchases: 2 },
  ];

  const filteredUsers = users
    .filter(user => filter === "all" ? true : user.status === filter)
    .filter(user => 
      searchQuery === "" ? true : 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleStatusChange = (user, action) => {
    setSelectedUser(user);
    setStatusAction(action);
    setIsStatusAlertOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser({
      id: null,
      name: "",
      email: "",
      phone: "",
      role: "buyer",
      status: "active",
      registered: new Date().toISOString().split('T')[0]
    });
    setIsAddModalOpen(true);
  };

  const confirmStatusChange = () => {
    // In a real app, would update user status in the backend
    console.log(`Changing user ${selectedUser.name} status to ${statusAction}`);
    setIsStatusAlertOpen(false);
  };

  const handleSaveNewUser = () => {
    // In a real app, would save the new user to the backend
    console.log("Creating new user:", selectedUser);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button className="bg-accent hover:bg-accent/90" onClick={handleAddNew}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Filter className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search users..." 
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : user.status === 'inactive' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.registered}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(user)}>
                      <User className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {user.status === 'active' ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleStatusChange(user, "suspend")}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleStatusChange(user, "activate")}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Activate
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View User Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">User ID: {selectedUser.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Mail className="h-4 w-4" /> Email
                  </p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Phone className="h-4 w-4" /> Phone
                  </p>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Role</p>
                  <p className="capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedUser.status === 'inactive' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Registered Date</p>
                  <p>{selectedUser.registered}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Last Login</p>
                  <p>{selectedUser.lastLogin}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 border-t pt-4">
                <div>
                  <p className="text-sm font-medium mb-1">Active Listings</p>
                  <p className="text-xl font-semibold">{selectedUser.listings}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Purchases</p>
                  <p className="text-xl font-semibold">{selectedUser.purchases}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 space-y-4">
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-name">Full Name</Label>
                  <Input
                    id="new-name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    placeholder="e.g. john.doe@example.com"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-phone">Phone Number</Label>
                  <Input
                    id="new-phone"
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                    placeholder="e.g. 555-123-4567"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-role">Role</Label>
                  <Select 
                    value={selectedUser.role}
                    onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="buyer/seller">Buyer/Seller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="new-status">Status</Label>
                  <Select 
                    value={selectedUser.status}
                    onValueChange={(value) => setSelectedUser({...selectedUser, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveNewUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Confirmation */}
      <AlertDialog open={isStatusAlertOpen} onOpenChange={setIsStatusAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusAction === "suspend" ? "Suspend User" : "Activate User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {statusAction === "suspend" 
                ? `Are you sure you want to suspend ${selectedUser?.name}'s account? They will not be able to use the platform until reactivated.`
                : `Are you sure you want to activate ${selectedUser?.name}'s account? They will regain full access to the platform.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange} className={statusAction === "suspend" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}>
              {statusAction === "suspend" ? "Suspend" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersSection;
