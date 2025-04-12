
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Users, Flag, FileEdit, BarChart2, Settings, LogOut, Search } from "lucide-react";

// Admin section components
import CarListingsSection from '@/components/admin/CarListingsSection';
import UsersSection from '@/components/admin/UsersSection';
import ReportsSection from '@/components/admin/ReportsSection';
import BlogPostsSection from '@/components/admin/BlogPostsSection';
import SettingsSection from '@/components/admin/SettingsSection';

// Dashboard overview component
const DashboardOverview = () => {
  return (
    <div className="p-6">
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
            <BarChart2 className="h-5 w-5 text-accent" />
          </div>
          <p className="text-3xl font-bold">$2,830</p>
          <p className="text-sm text-muted-foreground mt-2">
            From premium listings
          </p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-card rounded-lg shadow-sm p-6">
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
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Function to render the appropriate section based on activeSection state
  const renderSection = () => {
    switch(activeSection) {
      case "listings":
        return <CarListingsSection />;
      case "users":
        return <UsersSection />;
      case "reports":
        return <ReportsSection />;
      case "blog":
        return <BlogPostsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <DashboardOverview />;
    }
  };

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
          <button 
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center w-full p-2 rounded-md ${
              activeSection === "dashboard" 
                ? 'bg-accent/10 text-accent' 
                : 'hover:bg-accent/10'
            }`}
          >
            <BarChart2 className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </button>
          
          <button 
            onClick={() => setActiveSection("listings")}
            className={`flex items-center w-full p-2 rounded-md ${
              activeSection === "listings" 
                ? 'bg-accent/10 text-accent' 
                : 'hover:bg-accent/10'
            }`}
          >
            <Car className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Car Listings</span>}
          </button>
          
          <button 
            onClick={() => setActiveSection("users")}
            className={`flex items-center w-full p-2 rounded-md ${
              activeSection === "users" 
                ? 'bg-accent/10 text-accent' 
                : 'hover:bg-accent/10'
            }`}
          >
            <Users className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Users</span>}
          </button>
          
          <button 
            onClick={() => setActiveSection("reports")}
            className={`flex items-center w-full p-2 rounded-md ${
              activeSection === "reports" 
                ? 'bg-accent/10 text-accent' 
                : 'hover:bg-accent/10'
            }`}
          >
            <Flag className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </button>
          
          <button 
            onClick={() => setActiveSection("blog")}
            className={`flex items-center w-full p-2 rounded-md ${
              activeSection === "blog" 
                ? 'bg-accent/10 text-accent' 
                : 'hover:bg-accent/10'
            }`}
          >
            <FileEdit className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Blog Posts</span>}
          </button>
          
          <button 
            onClick={() => setActiveSection("settings")}
            className={`flex items-center w-full p-2 rounded-md ${
              activeSection === "settings" 
                ? 'bg-accent/10 text-accent' 
                : 'hover:bg-accent/10'
            }`}
          >
            <Settings className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </button>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t">
          <a href="/" className="flex items-center p-2 rounded-md hover:bg-accent/10">
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Back to Site</span>}
          </a>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">
            {activeSection === "dashboard" && "Dashboard Overview"}
            {activeSection === "listings" && "Car Listings"}
            {activeSection === "users" && "User Management"}
            {activeSection === "reports" && "Reports"}
            {activeSection === "blog" && "Blog Posts"}
            {activeSection === "settings" && "Settings"}
          </h1>
          
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
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
