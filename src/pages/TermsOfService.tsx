
import Navbar from "@/components/Navbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="lead text-muted-foreground">
              Last Updated: April 12, 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to DriveDealHub. These terms and conditions outline the rules and regulations for the use of our website.
              </p>
              <p>
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 
                DriveDealHub if you do not accept all of the terms and conditions stated on this page.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">2. License to Use</h2>
              <p>
                Unless otherwise stated, DriveDealHub and/or its licensors own the intellectual property rights for all material on DriveDealHub. 
                All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use 
                subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Republish material from this website</li>
                <li>Sell, rent or sub-license material from this website</li>
                <li>Reproduce, duplicate or copy material from this website</li>
                <li>Redistribute content from DriveDealHub (unless content is specifically made for redistribution)</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our website.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. 
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Listings and Content</h2>
              <p>
                As a user of the site, you may post listings and other content. You are solely responsible for the listings and content that you post, 
                including its legality, reliability, and appropriateness.
              </p>
              <p>By posting listings and content on the site, you warrant and represent that:</p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>The content is yours or you have the right to use it and grant us the rights and license as provided in these Terms</li>
                <li>The posting of your content on or through the service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person</li>
                <li>The information provided about the vehicle is accurate and truthful</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
              <p>
                You may use our website only for lawful purposes. You may not use our website:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>In any way that violates any applicable local, national, or international law or regulation</li>
                <li>To post fraudulent or misleading listings</li>
                <li>To impersonate or attempt to impersonate another person or entity</li>
                <li>To engage in any activity that interferes with or disrupts the services (or the servers and networks which are connected to the services)</li>
                <li>To harvest or collect email addresses or other contact information of other users from the service</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Transaction Disclaimer</h2>
              <p>
                DriveDealHub does not handle transactions between buyers and sellers. We solely provide a platform for users to list vehicles and for potential buyers to find vehicles. 
                All transactions occur directly between users, and we are not responsible for any aspects of these transactions.
              </p>
              <p>
                We strongly recommend users to:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Meet in safe, public locations for vehicle inspections and transactions</li>
                <li>Verify the condition and ownership of a vehicle before purchasing</li>
                <li>Use secure payment methods</li>
                <li>Complete all necessary documentation required for the legal transfer of vehicle ownership</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall DriveDealHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Any content obtained from the service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="my-4">
                <p>Email: terms@drivedealthub.com</p>
                <p>Address: 123 Car Street, Auto City, AC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
