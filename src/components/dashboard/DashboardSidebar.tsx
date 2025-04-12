
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  CarIcon,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Heart,
  Plus,
  Settings
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Component types
type UserData = {
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  avatar: string;
  location: string;
  bio: string;
};

type Notification = {
  id: number;
  message: string;
  read: boolean;
  date: string;
};

type ActivityItem = {
  id: number;
  type: 'view' | 'inquiry' | 'saved' | 'review' | 'sale';
  message: string;
  time: string;
};

type Stats = {
  totalListings: number;
  activeListings: number;
  totalSaved: number;
  totalViews: number;
  averageViewsPerListing: number;
  totalSold: number;
  averageResponseTime: string;
};

interface DashboardSidebarProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  stats: Stats;
  recentActivities: ActivityItem[];
  notificationsList: Notification[];
  unreadNotifications: number;
  setUnreadNotifications: React.Dispatch<React.SetStateAction<number>>;
  setNotificationsList: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const DashboardSidebar = ({
  userData,
  setUserData,
  stats,
  recentActivities,
  notificationsList,
  unreadNotifications,
  setUnreadNotifications,
  setNotificationsList
}: DashboardSidebarProps) => {
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

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

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    toast({
      title: "Success", 
      description: "Your profile has been updated"
    });
    setIsProfileEditOpen(false);
  };

  return (
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
  );
};
