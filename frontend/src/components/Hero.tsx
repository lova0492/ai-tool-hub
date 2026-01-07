import { Video, UserCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ToolType } from '../App';

interface HeroProps {
  onGetStarted: () => void;
  onToolOpen: (tool: ToolType) => void;
}

export default function Hero({ onGetStarted, onToolOpen }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
      style={{
        backgroundImage: 'url(/assets/generated/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            <Sparkles className="w-4 h-4 inline-block mr-2" />
            Powered by Advanced AI Technology
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom duration-700">
            All-in-One AI Tools for Creators
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Transform your creative workflow with cutting-edge AI tools. Generate videos, avatars, posts, and messages in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onToolOpen('video')}
              className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 group"
            >
              <Video className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Try Video Creator
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-in fade-in duration-700 delay-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Free to Try</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
