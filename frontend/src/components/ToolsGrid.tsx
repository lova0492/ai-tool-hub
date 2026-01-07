import { Video, UserCircle, FileText, MessageSquare, Lightbulb, Hash, Image, FileVideo } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ToolType } from '../App';

interface ToolsGridProps {
  onToolOpen: (tool: ToolType) => void;
}

const tools = [
  {
    id: 'video' as ToolType,
    title: 'AI Video Creator',
    description: 'Generate professional videos from text prompts with AI-powered editing and effects.',
    icon: Video,
    gradient: 'from-blue-500 to-purple-500',
    image: '/assets/generated/video-icon.png',
  },
  {
    id: 'avatar' as ToolType,
    title: 'Avatar Generator',
    description: 'Create unique AI-generated avatars and profile pictures in various artistic styles.',
    icon: UserCircle,
    gradient: 'from-purple-500 to-pink-500',
    image: '/assets/generated/avatar-icon.png',
  },
  {
    id: 'post' as ToolType,
    title: 'Post Generator',
    description: 'Craft engaging social media posts and content with AI-powered writing assistance.',
    icon: FileText,
    gradient: 'from-pink-500 to-orange-500',
    image: '/assets/generated/post-icon.png',
  },
  {
    id: 'message' as ToolType,
    title: 'Message Composer',
    description: 'Compose professional emails and messages with AI-enhanced tone and clarity.',
    icon: MessageSquare,
    gradient: 'from-orange-500 to-yellow-500',
    image: '/assets/generated/message-icon.png',
  },
  {
    id: 'imagePrompt' as ToolType,
    title: 'Image Prompt Generator',
    description: 'Transform your ideas into creative, descriptive prompts for AI image generation.',
    icon: Lightbulb,
    gradient: 'from-yellow-500 to-green-500',
    image: '/assets/generated/prompt-icon.png',
  },
  {
    id: 'caption' as ToolType,
    title: 'Caption & Hashtag Generator',
    description: 'Generate engaging captions and trending hashtags for your social media posts.',
    icon: Hash,
    gradient: 'from-green-500 to-teal-500',
    image: '/assets/generated/caption-icon.png',
  },
  {
    id: 'thumbnail' as ToolType,
    title: 'Thumbnail Generator',
    description: 'Create eye-catching thumbnails from URLs for YouTube videos and articles.',
    icon: Image,
    gradient: 'from-teal-500 to-cyan-500',
    image: '/assets/generated/thumbnail-icon.png',
  },
  {
    id: 'script' as ToolType,
    title: 'YouTube Script Generator',
    description: 'Generate complete video scripts with intro, body, and outro for your content.',
    icon: FileVideo,
    gradient: 'from-cyan-500 to-blue-500',
    image: '/assets/generated/script-icon.png',
  },
];

export default function ToolsGrid({ onToolOpen }: ToolsGridProps) {
  return (
    <section id="tools" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            AI-Powered Tools Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our suite of powerful AI tools designed to supercharge your creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id}
                className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onToolOpen(tool.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${tool.gradient} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <img 
                      src={tool.image} 
                      alt={tool.title}
                      className="w-12 h-12 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary group-hover:translate-x-2 transition-transform">
                    Try it now →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ad Placeholder - Sidebar */}
        <div className="mt-16 max-w-xs mx-auto">
          <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
            <p className="text-xs text-muted-foreground">Advertisement Space</p>
            <p className="text-xs text-muted-foreground mt-1">300x250</p>
          </div>
        </div>
      </div>
    </section>
  );
}
