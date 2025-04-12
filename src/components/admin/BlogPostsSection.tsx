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
import { Textarea } from "@/components/ui/textarea";
import { FileEdit, Pencil, Trash, Eye, Plus, Calendar, Search, Image, Upload } from 'lucide-react';

const BlogPostsSection = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  
  const posts = [
    { 
      id: 1, 
      title: "Top 10 Car Maintenance Tips", 
      author: "Admin User", 
      status: "published", 
      date: "2023-04-10", 
      views: 1250,
      excerpt: "Learn the essential maintenance tips to keep your car running smoothly and extend its lifespan.",
      content: "Regular maintenance is crucial for keeping your car in good condition and avoiding costly repairs down the line. Here are our top 10 tips: 1. Change your oil regularly...",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tags: ["maintenance", "tips", "car care"]
    },
    { 
      id: 2, 
      title: "How to Get the Best Price When Selling Your Car", 
      author: "Jane Smith", 
      status: "published", 
      date: "2023-04-05", 
      views: 980,
      excerpt: "Maximize your car's selling price with these proven strategies and tips from industry experts.",
      content: "Selling your car can be a challenging process, but with the right approach, you can maximize your return. Here's how to get the best price: 1. Time your sale wisely...",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tags: ["selling", "car value", "negotiation"]
    },
    { 
      id: 3, 
      title: "Electric vs Gas Cars: What's Right for You?", 
      author: "Admin User", 
      status: "draft", 
      date: "2023-04-12", 
      views: 0,
      excerpt: "A comprehensive comparison of electric and gas vehicles to help you make an informed decision.",
      content: "As electric vehicles become more mainstream, many buyers are faced with the choice between electric and traditional gas cars. Let's examine the pros and cons of each: Electric Cars: Advantages...",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tags: ["electric vehicles", "comparison", "buying guide"]
    },
    { 
      id: 4, 
      title: "Understanding Car Financing Options", 
      author: "Michael Chen", 
      status: "published", 
      date: "2023-04-01", 
      views: 1520,
      excerpt: "Navigate the complex world of auto financing with our straightforward guide for buyers.",
      content: "Financing a car purchase can be confusing with all the available options. Here's a breakdown of the most common financing methods: 1. Traditional Auto Loans...",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tags: ["financing", "auto loans", "budgeting"]
    },
    { 
      id: 5, 
      title: "Common Mistakes to Avoid When Buying Used Cars", 
      author: "Admin User", 
      status: "draft", 
      date: "2023-04-11", 
      views: 0,
      excerpt: "Don't fall into these common traps when purchasing a used vehicle. Our expert advice keeps you protected.",
      content: "Buying a used car can save you money, but it comes with risks. Here are the most common mistakes to avoid: 1. Skipping the pre-purchase inspection...",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tags: ["used cars", "buying tips", "car inspection"]
    },
  ];

  const filteredPosts = posts
    .filter(post => filter === "all" ? true : post.status === filter)
    .filter(post => 
      searchQuery === "" ? true : 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleView = (post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const handleEdit = (post) => {
    setSelectedPost({...post});
    setIsEditModalOpen(true);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setIsDeleteAlertOpen(true);
  };

  const handleCreate = () => {
    setSelectedPost({
      id: null,
      title: "",
      author: "Admin User",
      status: "draft",
      date: new Date().toISOString().split('T')[0],
      views: 0,
      excerpt: "",
      content: "",
      image: "",
      tags: []
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving changes to:", selectedPost);
    setIsEditModalOpen(false);
  };

  const handlePublish = () => {
    console.log(`Publishing post: ${selectedPost.title}`);
    setIsEditModalOpen(false);
  };

  const handleCreatePost = () => {
    console.log("Creating new post:", selectedPost);
    setIsCreateModalOpen(false);
  };

  const confirmDelete = () => {
    console.log("Deleting post:", selectedPost);
    setIsDeleteAlertOpen(false);
  };

  const handleTagInput = (e, post) => {
    if (e.key === 'Enter' && e.target.value) {
      const newTag = e.target.value.trim();
      if (newTag && !post.tags.includes(newTag)) {
        const updatedPost = { ...post, tags: [...post.tags, newTag] };
        setSelectedPost(updatedPost);
        e.target.value = '';
      }
      e.preventDefault();
    }
  };

  const removeTag = (tag, post) => {
    const updatedTags = post.tags.filter(t => t !== tag);
    setSelectedPost({ ...post, tags: updatedTags });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/800x400?text=Image+Preview";
  };

  const PostForm = ({ post, isCreating = false }) => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          value={post.title}
          onChange={(e) => setSelectedPost({...post, title: e.target.value})}
          placeholder="Enter blog post title"
        />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={post.excerpt}
          onChange={(e) => setSelectedPost({...post, excerpt: e.target.value})}
          placeholder="Brief summary of the post"
          rows={2}
        />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={post.content}
          onChange={(e) => setSelectedPost({...post, content: e.target.value})}
          placeholder="Main content of the blog post"
          rows={8}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={post.status}
            onValueChange={(value) => setSelectedPost({...post, status: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={post.author}
            onChange={(e) => setSelectedPost({...post, author: e.target.value})}
          />
        </div>
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="image">Featured Image URL</Label>
        <div className="flex gap-2">
          <Input
            id="image"
            value={post.image}
            onChange={(e) => setSelectedPost({...post, image: e.target.value})}
            placeholder="Enter image URL"
            className="flex-1"
          />
          <Button variant="outline" className="h-10 w-10 p-0">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag, index) => (
            <div key={index} className="flex items-center bg-accent/20 text-accent px-2 py-1 rounded-full text-sm">
              {tag}
              <button 
                type="button"
                className="ml-1 text-accent/70 hover:text-accent"
                onClick={() => removeTag(tag, post)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Input
          id="tags"
          placeholder="Add a tag and press Enter"
          onKeyDown={(e) => handleTagInput(e, post)}
        />
      </div>
      
      {post.image && (
        <div className="mt-4">
          <Label className="mb-2 block">Image Preview</Label>
          <div className="relative rounded-md overflow-hidden h-40 bg-muted">
            <img 
              src={post.image} 
              alt="Featured" 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts Management</h1>
        <Button className="bg-accent hover:bg-accent/90" onClick={handleCreate}>
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
                    <Button variant="outline" size="sm" onClick={() => handleView(post)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(post)}>
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

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>View Blog Post</DialogTitle>
            <DialogDescription>
              Preview of how the blog post appears to users.
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {selectedPost.image && (
                <div className="rounded-md overflow-hidden aspect-video bg-muted">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selectedPost.date}
                  </span>
                  <span>By {selectedPost.author}</span>
                  {selectedPost.views > 0 && <span>{selectedPost.views} views</span>}
                </div>
              </div>
              
              <div>
                <p className="italic text-muted-foreground">{selectedPost.excerpt}</p>
              </div>
              
              <div className="prose max-w-none">
                {selectedPost.content}
              </div>
              
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Tags:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span key={index} className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleEdit(selectedPost)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Make changes to your blog post here.
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="py-4 max-h-[70vh] overflow-y-auto">
              <PostForm post={selectedPost} />
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePublish}
              className={selectedPost?.status === "published" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : "bg-green-100 text-green-800 hover:bg-green-200"}
            >
              {selectedPost?.status === "published" ? "Unpublish" : "Publish"}
            </Button>
            <Button type="button" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Create a new blog post to publish on your website.
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="py-4 max-h-[70vh] overflow-y-auto">
              <PostForm post={selectedPost} isCreating={true} />
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleCreatePost} 
              className="bg-accent hover:bg-accent/90"
            >
              {selectedPost?.status === "published" ? "Create & Publish" : "Create as Draft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              {selectedPost && ` "${selectedPost.title}"`} and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogPostsSection;
