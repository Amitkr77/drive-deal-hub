
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PackageFeature {
  text: string;
  included: boolean;
}

interface PackageProps {
  name: string;
  price: string;
  description: string;
  features: PackageFeature[];
  popular?: boolean;
  buttonText: string;
  buttonLink: string;
}

const PackageCard = ({ name, price, description, features, popular, buttonText, buttonLink }: PackageProps) => {
  return (
    <Card className={`flex flex-col h-full overflow-hidden ${popular ? 'ring-2 ring-accent relative shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-accent text-white text-xs font-semibold">
          Most Popular
        </div>
      )}
      <CardHeader className="pb-0">
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="mt-2 mb-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-muted-foreground"> /listing</span>}
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3 mt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`mr-2 mt-0.5 ${feature.included ? 'text-accent' : 'text-muted-foreground'}`}>
                <Check className="h-5 w-5" />
              </div>
              <span className={feature.included ? '' : 'text-muted-foreground line-through'}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={buttonLink} className="w-full">
          <Button 
            className={`w-full ${popular ? 'bg-accent hover:bg-accent/90' : ''}`}
            variant={popular ? 'default' : 'outline'}
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const ListingPackages = () => {
  const packages = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for casual sellers',
      popular: false,
      features: [
        { text: 'List one vehicle', included: true },
        { text: 'Standard listing visibility', included: true },
        { text: 'Up to 5 photos', included: true },
        { text: 'Basic vehicle details', included: true },
        { text: 'Listed for 30 days', included: true },
        { text: 'Featured status', included: false },
        { text: 'Premium placement', included: false },
        { text: 'Social media promotion', included: false },
      ],
      buttonText: 'List for Free',
      buttonLink: '/sell-car'
    },
    {
      name: 'Featured',
      price: '$19.99',
      description: 'For faster selling results',
      popular: true,
      features: [
        { text: 'List one vehicle', included: true },
        { text: 'Enhanced visibility', included: true },
        { text: 'Up to 15 photos', included: true },
        { text: 'Detailed vehicle specs', included: true },
        { text: 'Listed for 60 days', included: true },
        { text: 'Featured in search results', included: true },
        { text: 'Premium placement', included: false },
        { text: 'Social media promotion', included: false },
      ],
      buttonText: 'Choose Featured',
      buttonLink: '/sell-car?package=featured'
    },
    {
      name: 'Premium',
      price: '$39.99',
      description: 'Maximum exposure',
      popular: false,
      features: [
        { text: 'List one vehicle', included: true },
        { text: 'Maximum visibility', included: true },
        { text: 'Up to 30 photos', included: true },
        { text: 'Complete vehicle history', included: true },
        { text: 'Listed until sold', included: true },
        { text: 'Featured in search results', included: true },
        { text: 'Premium homepage placement', included: true },
        { text: 'Social media promotion', included: true },
      ],
      buttonText: 'Choose Premium',
      buttonLink: '/sell-car?package=premium'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-3">Listing Packages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect listing package to sell your vehicle quickly and efficiently
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard
              key={index}
              name={pkg.name}
              price={pkg.price}
              description={pkg.description}
              features={pkg.features}
              popular={pkg.popular}
              buttonText={pkg.buttonText}
              buttonLink={pkg.buttonLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListingPackages;
