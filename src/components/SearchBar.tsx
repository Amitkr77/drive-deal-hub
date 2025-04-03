
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (brand) params.append('brand', brand);
    if (priceRange) params.append('price', priceRange);
    
    // Navigate to the search results page
    navigate(`/cars?${params.toString()}`);
  };
  
  return (
    <form onSubmit={handleSearch} className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by make, model, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="w-full md:w-40">
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="toyota">Toyota</SelectItem>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="mercedes">Mercedes</SelectItem>
            <SelectItem value="audi">Audi</SelectItem>
            <SelectItem value="ford">Ford</SelectItem>
            <SelectItem value="chevrolet">Chevrolet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-40">
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Price</SelectItem>
            <SelectItem value="0-5000">Under $5,000</SelectItem>
            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
            <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
            <SelectItem value="20000-30000">$20,000 - $30,000</SelectItem>
            <SelectItem value="30000-50000">$30,000 - $50,000</SelectItem>
            <SelectItem value="50000+">$50,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="bg-accent text-white hover:bg-accent/90">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
