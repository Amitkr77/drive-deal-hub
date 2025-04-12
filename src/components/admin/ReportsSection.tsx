
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
import { Flag, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';

const ReportsSection = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for demonstration
  const reports = [
    { id: 1, reason: "Suspicious Price", listing: "2018 Mercedes-Benz", reporter: "John Smith", status: "pending", date: "2023-04-10" },
    { id: 2, reason: "Misleading Information", listing: "2021 Ford Mustang", reporter: "Sarah Johnson", status: "pending", date: "2023-04-11" },
    { id: 3, reason: "Scam Attempt", listing: "2020 Tesla Model S", reporter: "Michael Chen", status: "resolved", date: "2023-04-05" },
    { id: 4, reason: "Wrong Category", listing: "2019 Toyota Camry", reporter: "Emily Wilson", status: "dismissed", date: "2023-04-08" },
    { id: 5, reason: "Fake Listing", listing: "2022 BMW X5", reporter: "David Miller", status: "resolved", date: "2023-04-02" },
  ];

  const filteredReports = filter === "all" 
    ? reports 
    : reports.filter(report => report.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports Management</h1>
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
                <TableCell>{report.listing}</TableCell>
                <TableCell>{report.reporter}</TableCell>
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
                        <Button variant="outline" size="sm" className="text-green-500 hover:text-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          <XCircle className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                      </>
                    )}
                    {report.status !== 'pending' && (
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        View Details
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

export default ReportsSection;
