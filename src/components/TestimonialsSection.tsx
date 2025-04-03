
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Car Seller',
    content: 'Sold my BMW in just 3 days! The process was incredibly smooth, and I got a fair price without any commission fees.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Sarah Williams',
    role: 'Car Buyer',
    content: 'Found my dream car within my budget. Communication with the seller was direct and hassle-free. Highly recommend this platform!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Car Enthusiast',
    content: 'The detailed listings and direct contact with sellers helped me find the exact vintage model I was looking for. Outstanding service!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-3">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from satisfied buyers and sellers who have used our platform to connect and make deals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
