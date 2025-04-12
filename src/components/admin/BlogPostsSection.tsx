
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
import { FileEdit, Pencil, Trash, Eye, Plus, Calendar, Search } from 'lucide-react';

const BlogPostsSection = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for demonstration
  const posts = [
    { id: 1, title: "Top 10 Car Maintenance Tips", author: "Admin User", status: "published", date: "2023-04-10", views: 1250 },
    { id: 2, title: "How to Get the Best Price When Selling Your Car", author: "Jane Smith", status: "published", date: "2023-04-05", views: 980 },
    { id: 3, title: "Electric vs Gas Cars: What's Right for You?", author: "Admin User", status: "draft", date: "2023-04-12", views: 0 },
    { id: 4, title: "Understanding Car Financing Options", author: "Michael Chen", status: "published", date: "2023-04-01", views: 1520 },
    { id: 5, title: "Common Mistakes to Avoid When Buying Used Cars", author: "Admin User", status: "draft", date: "2023-04-11", views: 0 },
  ];

  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(post => post.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts Management</h1>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search posts..." 
            className="pl-10 w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.views}</TableCell>
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

export default BlogPostsSection;
