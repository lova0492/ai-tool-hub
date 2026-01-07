import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivacyPageProps {
  onNavigate: (page: 'home' | 'privacy' | 'terms') => void;
}

export default function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <main className="container mx-auto px-4 py-32 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => onNavigate('home')}
        className="mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: January 5, 2026
        </p>

        <section className="space-y-6 text-foreground/90">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p>
              Welcome to AI Tools Hub. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, 
              time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
              <li><strong>Content Data:</strong> includes the prompts and content you generate using our AI tools.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your 
            personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being 
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access 
              to your personal data to those employees, agents, contractors and other third parties who have a 
              business need to know.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected 
              it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Cookies</h2>
            <p>
              Our website uses cookies to distinguish you from other users of our website. This helps us to 
              provide you with a good experience when you browse our website and also allows us to improve our site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins and applications. Clicking on 
              those links or enabling those connections may allow third parties to collect or share data about you. 
              We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: privacy@aitoolshub.com<br />
              Address: AI Tools Hub, 123 Innovation Street, Tech City, TC 12345
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
