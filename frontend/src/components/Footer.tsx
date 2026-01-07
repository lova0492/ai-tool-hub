import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

interface FooterProps {
  onNavigate: (page: 'home' | 'privacy' | 'terms') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-card/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Tools Hub
            </h3>
            <p className="text-sm text-muted-foreground">
              Empowering creators with cutting-edge AI technology for content generation and creative workflows.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiX className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              contact@aitoolshub.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2025. Built with 
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline-block" /> 
            using 
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
