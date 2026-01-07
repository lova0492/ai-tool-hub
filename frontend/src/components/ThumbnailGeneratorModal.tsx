import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, AlertCircle, Sparkles, Palette, RefreshCw, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useBuildThumbnailPrompt, useGenerateTextImage } from '../hooks/useQueries';

interface ThumbnailGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThumbnailGeneratorModal({ isOpen, onClose }: ThumbnailGeneratorModalProps) {
  // Form state
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('excited');
  const [colorPrefs, setColorPrefs] = useState('vibrant');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [builtPrompt, setBuiltPrompt] = useState('');
  
  // Output state
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [outputTitle, setOutputTitle] = useState<string | null>(null);
  const [outputDescription, setOutputDescription] = useState<string | null>(null);
  const [thumbnailData, setThumbnailData] = useState<{
    thumbnailText: string;
    hook: string;
    style: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Backend hooks
  const buildPromptMutation = useBuildThumbnailPrompt();
  const generateTextImageMutation = useGenerateTextImage();

  useEffect(() => {
    if (!isOpen) {
      // Reset all state
      setText('');
      setEmotion('excited');
      setColorPrefs('vibrant');
      setIsGenerating(false);
      setProgress(0);
      setCurrentStep('');
      setBuiltPrompt('');
      setOutputImage(null);
      setOutputTitle(null);
      setOutputDescription(null);
      setThumbnailData(null);
      setError(null);
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter text or a URL for the thumbnail.');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep('Initializing...');
    setBuiltPrompt('');
    setOutputImage(null);
    setOutputTitle(null);
    setOutputDescription(null);
    setThumbnailData(null);
    setError(null);

    try {
      // Step 1: Build prompt (15%)
      setCurrentStep('Building AI prompt from your parameters...');
      setProgress(5);
      
      const prompt = await buildPromptMutation.mutateAsync({
        text,
        emotion,
        colorPrefs,
      });
      
      setBuiltPrompt(prompt);
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Send to OpenAI API via backend (70%)
      setCurrentStep('Sending request to OpenAI API...');
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setCurrentStep('Processing image generation with OpenAI...');
      setProgress(30);
      
      // Call backend which makes HTTP outcall to OpenAI
      const thumbnailResult = await generateTextImageMutation.mutateAsync({
        text,
        emotion,
        colorPrefs,
      });
      
      setProgress(60);
      setCurrentStep('Receiving image from OpenAI...');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Step 3: Process response (90%)
      setCurrentStep('Processing image response...');
      setProgress(75);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Extract image URL from response
      if (thumbnailResult && thumbnailResult.content) {
        const imageUrl = thumbnailResult.content.getDirectURL();
        setOutputImage(imageUrl);
        setOutputTitle(thumbnailResult.description || `${text} - ${emotion}`);
        setOutputDescription(`Generated with ${emotion} emotion and ${colorPrefs} color scheme`);
        
        // Generate thumbnail metadata
        setThumbnailData({
          thumbnailText: text.length > 50 ? text.substring(0, 50) + '...' : text,
          hook: emotion.charAt(0).toUpperCase() + emotion.slice(1),
          style: thumbnailResult.style || colorPrefs,
        });
      } else {
        throw new Error('No image content received from OpenAI API');
      }
      
      // Step 4: Finalize (100%)
      setCurrentStep('Finalizing output...');
      setProgress(95);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress(100);
      setCurrentStep('Complete!');
      
    } catch (err) {
      let errorMessage = 'Failed to generate thumbnail. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('generateTextImage method not available')) {
          errorMessage = 'Image generation API is not yet available. The backend needs to implement the generateTextImage method with OpenAI integration.';
        } else if (err.message.includes('API')) {
          errorMessage = `API Error: ${err.message}`;
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetryGeneration = () => {
    setError(null);
    handleGenerate();
  };

  const hasOutput = outputImage && thumbnailData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2">
            <Palette className="w-6 h-6 text-teal-500" />
            AI Thumbnail Generator
          </DialogTitle>
          <DialogDescription>
            Configure your thumbnail parameters and let OpenAI create eye-catching designs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="text">Thumbnail Text or URL *</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError(null);
                }}
                placeholder="e.g., AI Programming Tutorial or https://youtube.com/watch?v=example"
                disabled={isGenerating}
              />
              <p className="text-xs text-muted-foreground">
                Enter a topic, title, or YouTube URL to generate a thumbnail
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emotion">Emotion / Tone</Label>
              <Select value={emotion} onValueChange={setEmotion} disabled={isGenerating}>
                <SelectTrigger id="emotion">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excited">Excited</SelectItem>
                  <SelectItem value="curious">Curious</SelectItem>
                  <SelectItem value="shocked">Shocked</SelectItem>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="serious">Serious</SelectItem>
                  <SelectItem value="mysterious">Mysterious</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="colorPrefs">Color Preference</Label>
              <Select value={colorPrefs} onValueChange={setColorPrefs} disabled={isGenerating}>
                <SelectTrigger id="colorPrefs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vibrant">Vibrant & Bold</SelectItem>
                  <SelectItem value="dark">Dark & Dramatic</SelectItem>
                  <SelectItem value="light">Light & Bright</SelectItem>
                  <SelectItem value="neon">Neon Glow</SelectItem>
                  <SelectItem value="pastel">Soft Pastel</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="gradient">Modern Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p>{error}</p>
                  <Button
                    onClick={handleRetryGeneration}
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                  >
                    <RefreshCw className="w-3 h-3 mr-2" />
                    Retry Generation
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!text.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating with OpenAI...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Thumbnail with OpenAI
              </>
            )}
          </Button>

          {/* Progress Section */}
          {isGenerating && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{currentStep}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              {builtPrompt && (
                <div className="mt-4 p-3 bg-background rounded-md border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Built Prompt:</p>
                  <p className="text-sm font-mono">{builtPrompt}</p>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Zap className="w-3 h-3" />
                <span>Powered by OpenAI API</span>
              </div>
            </div>
          )}

          {/* Output Section */}
          {hasOutput && !isGenerating && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle className="w-4 h-4" />
                Thumbnail Generated Successfully with OpenAI!
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border space-y-4">
                {/* Thumbnail Design Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Thumbnail Text:</p>
                    <p className="text-3xl font-black text-primary tracking-tight leading-tight">
                      {thumbnailData.thumbnailText}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hook:</p>
                      <Badge variant="secondary" className="text-sm">
                        {thumbnailData.hook}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Style:</p>
                      <Badge variant="secondary" className="text-sm">
                        {thumbnailData.style}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="outline">{emotion}</Badge>
                    <Badge variant="outline">{colorPrefs}</Badge>
                    <Badge variant="outline" className="ml-auto">
                      <Zap className="w-3 h-3 mr-1" />
                      OpenAI
                    </Badge>
                  </div>
                </div>
                
                {/* Preview Image */}
                {outputImage && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                    <img 
                      src={outputImage} 
                      alt={outputTitle || 'Generated thumbnail'}
                      className="w-full rounded-lg shadow-lg animate-in fade-in duration-500"
                    />
                  </div>
                )}
                
                {/* Title and Description */}
                {outputTitle && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <h4 className="text-sm font-medium">{outputTitle}</h4>
                    {outputDescription && (
                      <p className="text-sm text-muted-foreground">{outputDescription}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
