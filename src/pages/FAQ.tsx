
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqItems = [
    {
      question: "How do I list my car for sale?",
      answer: "To list your car, log in to your account and click on the 'Sell Your Car' button. Fill out the required details about your vehicle, upload photos, set your price, and submit your listing for review."
    },
    {
      question: "Is it free to list my car?",
      answer: "Yes, we offer a basic free listing package. However, to increase your car's visibility, you can choose from our premium packages that offer additional features like featured placement and longer listing duration."
    },
    {
      question: "How do I contact a seller?",
      answer: "On each car listing page, you'll find contact options including direct call, WhatsApp, or email buttons. Simply click on your preferred method to get in touch with the seller directly."
    },
    {
      question: "Can I edit my listing after publishing?",
      answer: "Yes, you can edit your listing at any time from your dashboard. Go to 'My Listings', find the car you want to edit, and click on 'Edit Listing'."
    },
    {
      question: "How long does my listing stay active?",
      answer: "Basic listings remain active for 30 days. Premium and Featured listings can stay active for 60-90 days depending on the package you choose."
    },
    {
      question: "Is there a limit to how many cars I can list?",
      answer: "Free users can list up to 2 cars simultaneously. Premium users can list up to 5 cars, and business accounts have unlimited listings."
    },
    {
      question: "How do I report a suspicious listing?",
      answer: "If you spot a suspicious listing, click the 'Report' button on the listing page. Provide details about why you believe the listing is suspicious, and our team will review it promptly."
    },
    {
      question: "Does DriveDealHub handle transactions?",
      answer: "No, we only facilitate connections between buyers and sellers. All negotiations and transactions happen directly between the involved parties. We recommend meeting in safe, public locations for vehicle inspections and transactions."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to 'Account Settings' in your dashboard, scroll to the bottom, and click on 'Delete Account'. Please note that all your listings and saved cars will be permanently removed."
    },
    {
      question: "What happens after I contact a seller?",
      answer: "After you contact a seller, it's up to both parties to arrange further communications, vehicle inspection, and potential purchase. We recommend keeping all initial communications through our platform for security."
    }
  ];
  
  const filteredFAQs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find answers to common questions about using DriveDealHub to buy or sell vehicles.
        </p>
        
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for questions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-md p-6">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No questions found matching your search.</p>
            </div>
          )}
        </div>
        
        {/* Still have questions section */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            If you couldn't find the answer you were looking for, please contact our support team.
          </p>
          <a href="/contact-us" className="inline-block bg-accent text-white px-6 py-3 rounded-md hover:bg-accent/90 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
