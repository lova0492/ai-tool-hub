import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TermsPageProps {
  onNavigate: (page: 'home' | 'privacy' | 'terms') => void;
}

export default function TermsPage({ onNavigate }: TermsPageProps) {
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
          Terms of Service
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: January 5, 2026
        </p>

        <section className="space-y-6 text-foreground/90">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing and using AI Tools Hub ("Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily use the AI Tools Hub service for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and under this 
              license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the Service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Content Ownership and Usage Rights</h2>
            <p>
              You retain all rights to the content you create using our AI tools. However, by using our service, 
              you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your 
              prompts and generated content for the purpose of:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Providing and improving our services</li>
              <li>Training and improving our AI models</li>
              <li>Marketing and promotional purposes (with your explicit consent)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. User Responsibilities</h2>
            <p>As a user of our service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide accurate and complete information when using our services</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Not generate content that is harmful, offensive, or violates any laws</li>
              <li>Not attempt to gain unauthorized access to any portion of the service</li>
              <li>Not use the service to transmit any viruses, malware, or other malicious code</li>
              <li>Comply with all applicable local, state, national, and international laws</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Prohibited Content</h2>
            <p>You may not use our service to create or generate:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Content that infringes on intellectual property rights</li>
              <li>Defamatory, obscene, or offensive content</li>
              <li>Content that promotes violence, discrimination, or illegal activities</li>
              <li>Spam or unsolicited commercial content</li>
              <li>Content that violates privacy rights or contains personal information without consent</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Service Availability</h2>
            <p>
              We strive to provide uninterrupted access to our service, but we do not guarantee that the service 
              will be available at all times. We reserve the right to modify, suspend, or discontinue the service 
              at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Disclaimer</h2>
            <p>
              The materials on AI Tools Hub are provided on an 'as is' basis. AI Tools Hub makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including, without 
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
              or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitations</h2>
            <p>
              In no event shall AI Tools Hub or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising out of 
              the use or inability to use the materials on AI Tools Hub, even if AI Tools Hub or an authorized 
              representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Accuracy of Materials</h2>
            <p>
              The materials appearing on AI Tools Hub could include technical, typographical, or photographic 
              errors. AI Tools Hub does not warrant that any of the materials on its website are accurate, 
              complete, or current. AI Tools Hub may make changes to the materials contained on its website 
              at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Links</h2>
            <p>
              AI Tools Hub has not reviewed all of the sites linked to its website and is not responsible for 
              the contents of any such linked site. The inclusion of any link does not imply endorsement by 
              AI Tools Hub of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Modifications</h2>
            <p>
              AI Tools Hub may revise these terms of service for its website at any time without notice. By 
              using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you 
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              Email: legal@aitoolshub.com<br />
              Address: AI Tools Hub, 123 Innovation Street, Tech City, TC 12345
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
