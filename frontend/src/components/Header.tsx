import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onNavigate: (page: 'home' | 'privacy' | 'terms') => void;
  currentPage: 'home' | 'privacy' | 'terms';
  username: string | null;
  onLogout: () => void;
  onGetStarted: () => void;
}

export default function Header({ onNavigate, currentPage, username, onLogout, onGetStarted }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (page: 'home' | 'privacy' | 'terms', sectionId?: string) => {
    if (page !== 'home') {
      onNavigate(page);
      setIsMenuOpen(false);
    } else if (currentPage === 'home' && sectionId) {
      scrollToSection(sectionId);
    } else {
      onNavigate('home');
      setIsMenuOpen(false);
      setTimeout(() => {
        if (sectionId) scrollToSection(sectionId);
      }, 100);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      {/* Ad Placeholder - Top Banner */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-2 text-center text-xs text-muted-foreground">
          Advertisement Space - 728x90
        </div>
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <Sparkles className="w-6 h-6 text-primary" />
            AI Tools Hub
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavClick('home', 'hero')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('home', 'tools')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Tools
            </button>
            <button 
              onClick={() => handleNavClick('home', 'faq')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQs
            </button>
            
            {username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    Welcome, {username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-in slide-in-from-top">
            <button 
              onClick={() => handleNavClick('home', 'hero')}
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('home', 'tools')}
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors"
            >
              Tools
            </button>
            <button 
              onClick={() => handleNavClick('home', 'faq')}
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQs
            </button>
            
            {username ? (
              <>
                <div className="pt-2 pb-2 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Signed in as</p>
                  <p className="text-foreground font-medium">{username}</p>
                </div>
                <Button 
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full text-destructive border-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  onGetStarted();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                Get Started
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
