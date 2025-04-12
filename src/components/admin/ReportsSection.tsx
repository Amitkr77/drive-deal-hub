
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
import { Textarea } from "@/components/ui/textarea";
import { Flag, AlertTriangle, CheckCircle, XCircle, Search, Car, User, Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';

const ReportsSection = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isResolveAlertOpen, setIsResolveAlertOpen] = useState(false);
  const [isDismissAlertOpen, setIsDismissAlertOpen] = useState(false);
  const [resolution, setResolution] = useState("");
  
  // Mock data for demonstration
  const reports = [
    { 
      id: 1, 
      reason: "Suspicious Price", 
      description: "The price for this car is way below market value, seems like a scam.",
      listing: { id: 23, title: "2018 Mercedes-Benz" }, 
      reporter: { id: 5, name: "John Smith", email: "john.smith@example.com" },
      status: "pending", 
      date: "2023-04-10",
      images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"]
    },
    { 
      id: 2, 
      reason: "Misleading Information", 
      description: "The listing says the car has no damage, but photos clearly show dents on the side door.",
      listing: { id: 45, title: "2021 Ford Mustang" }, 
      reporter: { id: 12, name: "Sarah Johnson", email: "sarah.j@example.com" },
      status: "pending", 
      date: "2023-04-11",
      images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"]
    },
    { 
      id: 3, 
      reason: "Scam Attempt", 
      description: "Seller is asking for a deposit before viewing the car, claims to be out of country.",
      listing: { id: 78, title: "2020 Tesla Model S" }, 
      reporter: { id: 18, name: "Michael Chen", email: "m.chen@example.com" },
      status: "resolved", 
      date: "2023-04-05",
      resolution: "Listing removed and seller account suspended.",
      resolvedBy: "Admin User",
      resolvedOn: "2023-04-06",
      images: []
    },
    { 
      id: 4, 
      reason: "Wrong Category", 
      description: "This vehicle is listed as an SUV but it's clearly a sedan.",
      listing: { id: 56, title: "2019 Toyota Camry" }, 
      reporter: { id: 24, name: "Emily Wilson", email: "emily@example.com" },
      status: "dismissed", 
      date: "2023-04-08",
      resolution: "The model has both SUV and sedan variants. Listing is correct.",
      resolvedBy: "Admin User",
      resolvedOn: "2023-04-09",
      images: []
    },
    { 
      id: 5, 
      reason: "Fake Listing", 
      description: "I found the same photos used on another website from 2020, this is not a real listing.",
      listing: { id: 89, title: "2022 BMW X5" }, 
      reporter: { id: 30, name: "David Miller", email: "davidm@example.com" },
      status: "resolved", 
      date: "2023-04-02",
      resolution: "Confirmed fraudulent listing. Account suspended and IP banned.",
      resolvedBy: "Admin User",
      resolvedOn: "2023-04-03",
      images: []
    },
  ];

  const filteredReports = reports
    .filter(report => filter === "all" ? true : report.status === filter)
    .filter(report => 
      searchQuery === "" ? true : 
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.reporter.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleView = (report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const handleResolve = (report) => {
    setSelectedReport(report);
    setResolution("");
    setIsResolveAlertOpen(true);
  };

  const handleDismiss = (report) => {
    setSelectedReport(report);
    setResolution("");
    setIsDismissAlertOpen(true);
  };

  const confirmResolve = () => {
    // In a real app, would update report status in the backend
    console.log(`Resolving report #${selectedReport.id} with resolution: ${resolution}`);
    setIsResolveAlertOpen(false);
  };

  const confirmDismiss = () => {
    // In a real app, would update report status in the backend
    console.log(`Dismissing report #${selectedReport.id} with reason: ${resolution}`);
    setIsDismissAlertOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports Management</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
            <AlertTriangle className="h-4 w-4 mr-2" /> 
            {reports.filter(r => r.status === "pending").length} Pending
          </Button>
          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
            <CheckCircle className="h-4 w-4 mr-2" /> 
            {reports.filter(r => r.status === "resolved").length} Resolved
          </Button>
          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
            <XCircle className="h-4 w-4 mr-2" /> 
            {reports.filter(r => r.status === "dismissed").length} Dismissed
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search reports..." 
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
              <TableHead>Reason</TableHead>
              <TableHead>Listing</TableHead>
              <TableHead>Reported By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.reason}</TableCell>
                <TableCell>{report.listing.title}</TableCell>
                <TableCell>{report.reporter.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : report.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {report.status}
                  </span>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    {report.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700" onClick={() => handleResolve(report)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDismiss(report)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleView(report)}>
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Report Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              Detailed information about this report.
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="py-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">{selectedReport.reason}</h3>
                  <p className="text-muted-foreground">Report ID: {selectedReport.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedReport.status === 'resolved' 
                    ? 'bg-green-100 text-green-800' 
                    : selectedReport.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">Report Description</span>
                </div>
                <p>{selectedReport.description}</p>
                
                {selectedReport.images && selectedReport.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {selectedReport.images.map((img, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-md aspect-video">
                        <img src={img} alt="Report evidence" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Car className="h-4 w-4" />
                    <span className="text-sm font-medium">Reported Listing</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedReport.listing.title}</p>
                      <p className="text-sm text-muted-foreground">ID: {selectedReport.listing.id}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Reported By</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedReport.reporter.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedReport.reporter.email}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Reported on {selectedReport.date}</span>
              </div>
              
              {selectedReport.status !== 'pending' && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Resolution</h4>
                  <p>{selectedReport.resolution}</p>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <span className="text-sm">Resolved by {selectedReport.resolvedBy} on {selectedReport.resolvedOn}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedReport && selectedReport.status === 'pending' && (
              <>
                <Button type="button" variant="destructive" onClick={() => handleDismiss(selectedReport)}>
                  Dismiss
                </Button>
                <Button type="button" className="bg-green-600 hover:bg-green-700" onClick={() => handleResolve(selectedReport)}>
                  Resolve
                </Button>
              </>
            )}
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Report Dialog */}
      <AlertDialog open={isResolveAlertOpen} onOpenChange={setIsResolveAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resolve Report</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide details on how this report was resolved. This information will be stored in the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <Textarea 
              placeholder="Enter resolution details..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmResolve} className="bg-green-600 hover:bg-green-700">
              Confirm Resolution
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dismiss Report Dialog */}
      <AlertDialog open={isDismissAlertOpen} onOpenChange={setIsDismissAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dismiss Report</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for dismissing this report. This information will be stored in the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <Textarea 
              placeholder="Enter reason for dismissal..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDismiss} className="bg-red-600 hover:bg-red-700">
              Confirm Dismissal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReportsSection;
