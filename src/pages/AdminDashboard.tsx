
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Car, Users, Flag, FileEdit, BarChart2, Settings, LogOut, Plus, Search } from "lucide-react";

// Note: This is a basic admin dashboard structure. In a real implementation,
// you would connect this to your backend to display real data.

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className={`bg-card border-r shrink-0 ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        {/* Admin brand */}
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center">
              <Car className="h-6 w-6 text-accent mr-2" />
              <span className="font-bold">Admin Panel</span>
            </div>
          ) : (
            <Car className="h-6 w-6 text-accent mx-auto" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? '<' : '>'}
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center p-2 rounded-md bg-accent/10 text-accent hover:bg-accent/20">
            <BarChart2 className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          
          <Link to="/admin/listings" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <Car className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Car Listings</span>}
          </Link>
          
          <Link to="/admin/users" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <Users className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Users</span>}
          </Link>
          
          <Link to="/admin/reports" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <Flag className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </Link>
          
          <Link to="/admin/blog" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <FileEdit className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Blog Posts</span>}
          </Link>
          
          <Link to="/admin/settings" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <Settings className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Link>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t">
          <Link to="/" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Back to Site</span>}
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard Overview</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                A
              </div>
              {/* Add dropdown menu for admin account if needed */}
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="p-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground">Total Listings</h3>
                <Car className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-bold">263</p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-green-500">↑ 12%</span> from last month
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground">Active Users</h3>
                <Users className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-bold">1,542</p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-green-500">↑ 8%</span> from last month
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground">New Reports</h3>
                <Flag className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-red-500">↑ 3</span> since yesterday
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground">Total Sales</h3>
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-bold">$2,830</p>
              <p className="text-sm text-muted-foreground mt-2">
                From premium listings
              </p>
            </div>
          </div>
          
          {/* Main content tabs */}
          <Tabs defaultValue="recent">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                <TabsTrigger value="reports">Recent Reports</TabsTrigger>
              </TabsList>
              
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                New Action
              </Button>
            </div>
            
            <TabsContent value="recent" className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {/* Activity items */}
                <div className="flex items-start pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p><span className="font-medium">John Doe</span> created a new account</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <p><span className="font-medium">Sarah Johnson</span> listed a new car: <span className="font-medium">2022 Toyota Camry</span></p>
                    <p className="text-sm text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4">
                    <Flag className="h-5 w-5" />
                  </div>
                  <div>
                    <p><span className="font-medium">Michael Chen</span> reported a listing: <span className="font-medium">Suspicious Price</span></p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4">
                    <FileEdit className="h-5 w-5" />
                  </div>
                  <div>
                    <p><span className="font-medium">Admin User</span> published a new blog post: <span className="font-medium">Car Maintenance Tips</span></p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Listings Pending Approval</h2>
              
              <div className="space-y-4">
                {/* Sample pending listings */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=60&h=60&fit=crop" alt="Car" className="w-12 h-12 rounded object-cover mr-4" />
                    <div>
                      <p className="font-medium">2020 Audi A4</p>
                      <p className="text-sm text-muted-foreground">Listed by: David Williams</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Reject</Button>
                    <Button size="sm" className="bg-accent hover:bg-accent/90">Approve</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=60&h=60&fit=crop" alt="Car" className="w-12 h-12 rounded object-cover mr-4" />
                    <div>
                      <p className="font-medium">2019 BMW 3 Series</p>
                      <p className="text-sm text-muted-foreground">Listed by: Emily Parker</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Reject</Button>
                    <Button size="sm" className="bg-accent hover:bg-accent/90">Approve</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
              
              <div className="space-y-4">
                {/* Sample reports */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-4">
                      <Flag className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Suspicious Price: 2018 Mercedes-Benz</p>
                      <p className="text-sm text-muted-foreground">Reported by: John Smith</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Dismiss</Button>
                    <Button variant="destructive" size="sm">Remove Listing</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-4">
                      <Flag className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Misleading Information: 2021 Ford Mustang</p>
                      <p className="text-sm text-muted-foreground">Reported by: Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Dismiss</Button>
                    <Button variant="destructive" size="sm">Remove Listing</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
