
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, RefreshCw } from 'lucide-react';

const SettingsSection = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "AutoMarket",
    siteDescription: "Buy and sell cars easily with our marketplace",
    contactEmail: "admin@automarket.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Market Street, San Francisco, CA",
    maintenanceMode: false
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@automarket.com",
    smtpPassword: "••••••••••••",
    fromEmail: "no-reply@automarket.com",
    fromName: "AutoMarket Notifications"
  });

  const [listingSettings, setListingSettings] = useState({
    requireApproval: true,
    maxPhotos: "10",
    allowAnonBrowsing: true,
    featuredListingDuration: "30",
    premiumListingDuration: "60",
    standardListingDuration: "30"
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setGeneralSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleListingSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setListingSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleListingToggleChange = (name: string, checked: boolean) => {
    setListingSettings(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your website's basic information and appearance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea 
                  id="siteDescription" 
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    name="phoneNumber"
                    value={generalSettings.phoneNumber}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode" className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, the site will show a maintenance page to visitors.
                  </p>
                </div>
                <Switch 
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleToggleChange('maintenanceMode', checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button className="bg-accent hover:bg-accent/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email server settings for notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input 
                    id="smtpServer" 
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input 
                    id="smtpPort" 
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input 
                    id="smtpUsername" 
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input 
                    id="smtpPassword" 
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input 
                    id="fromEmail" 
                    name="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input 
                    id="fromName" 
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Test Connection</Button>
              <Button className="bg-accent hover:bg-accent/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>Listing Settings</CardTitle>
              <CardDescription>
                Configure how car listings function on your site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireApproval" className="text-base">Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, all new listings require admin approval.
                  </p>
                </div>
                <Switch 
                  id="requireApproval"
                  checked={listingSettings.requireApproval}
                  onCheckedChange={(checked) => handleListingToggleChange('requireApproval', checked)}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowAnonBrowsing" className="text-base">Allow Anonymous Browsing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow non-registered users to view car listings.
                  </p>
                </div>
                <Switch 
                  id="allowAnonBrowsing"
                  checked={listingSettings.allowAnonBrowsing}
                  onCheckedChange={(checked) => handleListingToggleChange('allowAnonBrowsing', checked)}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <Label htmlFor="maxPhotos">Maximum Photos per Listing</Label>
                <Input 
                  id="maxPhotos" 
                  name="maxPhotos"
                  type="number"
                  value={listingSettings.maxPhotos}
                  onChange={handleListingSettingsChange}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <Label className="text-base">Listing Durations (days)</Label>
                
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="standardListingDuration">Standard</Label>
                    <Input 
                      id="standardListingDuration" 
                      name="standardListingDuration"
                      type="number"
                      value={listingSettings.standardListingDuration}
                      onChange={handleListingSettingsChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="featuredListingDuration">Featured</Label>
                    <Input 
                      id="featuredListingDuration" 
                      name="featuredListingDuration"
                      type="number"
                      value={listingSettings.featuredListingDuration}
                      onChange={handleListingSettingsChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="premiumListingDuration">Premium</Label>
                    <Input 
                      id="premiumListingDuration" 
                      name="premiumListingDuration"
                      type="number"
                      value={listingSettings.premiumListingDuration}
                      onChange={handleListingSettingsChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button className="bg-accent hover:bg-accent/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage security and access control settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passwordPolicy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="passwordPolicy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (minimum 6 characters)</SelectItem>
                    <SelectItem value="medium">Medium (minimum 8 characters, 1 number)</SelectItem>
                    <SelectItem value="strong">Strong (min 10 chars, uppercase, number, symbol)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                <Input id="loginAttempts" type="number" defaultValue="5" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth" className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require two-factor authentication for admin accounts.
                  </p>
                </div>
                <Switch id="twoFactorAuth" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ipRestriction" className="text-base">IP Restriction</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict admin access to specific IP addresses.
                  </p>
                </div>
                <Switch id="ipRestriction" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-accent hover:bg-accent/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsSection;
