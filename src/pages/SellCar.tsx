
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Check, Car, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.string().regex(/^\d{4}$/, 'Year must be a valid 4-digit year'),
  price: z.string().min(1, 'Price is required'),
  mileage: z.string().min(1, 'Mileage is required'),
  location: z.string().min(1, 'Location is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  transmission: z.string().min(1, 'Transmission is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
});

type FormValues = z.infer<typeof formSchema>;

const SellCar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      brand: '',
      model: '',
      year: '',
      price: '',
      mileage: '',
      location: '',
      fuelType: '',
      transmission: '',
      description: '',
      phone: '',
      email: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to 5 images
      if (images.length + filesArray.length > 5) {
        toast({
          title: "Too many images",
          description: "Maximum 5 images allowed",
          variant: "destructive"
        });
        return;
      }
      
      setImages(prev => [...prev, ...filesArray]);
      
      // Create preview URLs
      const newUploadedImages = filesArray.map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newUploadedImages]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (values: FormValues) => {
    if (images.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one image of your car",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would upload images and submit form data to an API
    console.log({ ...values, images });
    
    toast({
      title: "Listing submitted",
      description: "Your car has been listed successfully!",
    });
    
    // Navigate to dashboard after form submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="mb-3">Sell Your Car</h1>
            <p className="text-muted-foreground">
              Complete the form below to list your car on DriveDealHub.
              Quality listings with detailed information and clear images get the most attention.
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Car Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Car Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Listing Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2021 BMW 3 Series 330i" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Brand" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="toyota">Toyota</SelectItem>
                                <SelectItem value="honda">Honda</SelectItem>
                                <SelectItem value="ford">Ford</SelectItem>
                                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                                <SelectItem value="bmw">BMW</SelectItem>
                                <SelectItem value="mercedes">Mercedes</SelectItem>
                                <SelectItem value="audi">Audi</SelectItem>
                                <SelectItem value="tesla">Tesla</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 3 Series" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2021" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 42999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="mileage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mileage</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 25400" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Chicago, IL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fuelType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fuel Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Fuel Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Gasoline">Gasoline</SelectItem>
                                <SelectItem value="Diesel">Diesel</SelectItem>
                                <SelectItem value="Electric">Electric</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transmission</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Transmission" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Automatic">Automatic</SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your car in detail including condition, features, and any other relevant information." 
                              rows={6}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Images */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Car Images</h2>
                    
                    <div className="border border-dashed border-input rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      
                      <label htmlFor="images" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="bg-secondary rounded-full p-3 mb-2">
                            <Upload className="h-6 w-6" />
                          </div>
                          <p className="font-medium mb-1">Click to upload images</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Max 5 images, JPEG or PNG
                          </p>
                          <Button type="button" variant="outline" size="sm">
                            Browse Files
                          </Button>
                        </div>
                      </label>
                      
                      {/* Preview Images */}
                      {uploadedImages.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image} 
                                alt={`Car preview ${index + 1}`} 
                                className="h-32 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. (123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Terms and Submit */}
                  <div>
                    <div className="bg-accent/10 p-4 rounded-lg flex items-start mb-6">
                      <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 mr-3" />
                      <p className="text-sm">
                        By submitting this form, you agree to our <a href="#" className="text-accent underline">Terms of Service</a> and <a href="#" className="text-accent underline">Privacy Policy</a>. 
                        You are responsible for ensuring all information provided is accurate and that you own or have the right to sell this vehicle.
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full bg-accent text-white hover:bg-accent/90">
                      <Car className="h-4 w-4 mr-2" />
                      List My Car
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SellCar;
