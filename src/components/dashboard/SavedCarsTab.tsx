
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import CarCard, { Car } from '@/components/CarCard';

interface SavedCarsTabProps {
  savedCars: Car[];
}

export const SavedCarsTab = ({ savedCars }: SavedCarsTabProps) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Saved Cars</h2>
        <p className="text-muted-foreground">Cars you've saved to your wishlist</p>
      </div>
      
      {savedCars.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-primary/70" />
            </div>
            <CardTitle className="mb-2">No Saved Cars</CardTitle>
            <CardDescription className="mb-6">
              You haven't saved any cars to your wishlist yet. Browse cars and click the heart icon to save them here.
            </CardDescription>
            <Link to="/cars">
              <Button className="bg-accent text-white hover:bg-accent/90">
                Browse Cars
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </>
  );
};
