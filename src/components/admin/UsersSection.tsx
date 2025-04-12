
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
import { Users, User, UserPlus, Ban, Check, Search, Filter } from 'lucide-react';

const UsersSection = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "buyer", status: "active", registered: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "seller", status: "active", registered: "2023-02-20" },
    { id: 3, name: "Robert Johnson", email: "robert.johnson@example.com", role: "buyer/seller", status: "inactive", registered: "2023-01-05" },
    { id: 4, name: "Emily Wilson", email: "emily.wilson@example.com", role: "seller", status: "active", registered: "2023-03-10" },
    { id: 5, name: "Michael Brown", email: "michael.brown@example.com", role: "buyer", status: "suspended", registered: "2023-02-28" },
  ];

  const filteredUsers = filter === "all" 
    ? users 
    : users.filter(user => user.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button className="bg-accent hover:bg-accent/90">
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
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {user.status === 'active' ? (
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        <Ban className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700">
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
    </div>
  );
};

export default UsersSection;
