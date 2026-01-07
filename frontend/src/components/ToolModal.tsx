import { useState, useEffect } from 'react';
import { Copy, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import type { ToolType } from '../App';
import VideoCreatorModal from './VideoCreatorModal';
import ThumbnailGeneratorModal from './ThumbnailGeneratorModal';
import { 
  generateAvatar, 
  generatePost, 
  generateMessage,
  generateImagePrompt,
  generateCaption,
  generateScript
} from '../lib/aiGenerators';

interface ToolModalProps {
  tool: ToolType;
  isOpen: boolean;
  onClose: () => void;
}

const toolConfig = {
  video: {
    title: 'AI Video Creator',
    description: 'Configure video parameters and generate professional content',
    placeholder: '',
    outputType: 'video',
  },
  avatar: {
    title: 'Avatar Generator',
    description: 'Describe your ideal avatar style and characteristics',
    placeholder: 'Example: Create a professional female avatar with a friendly smile, wearing business casual attire...',
    outputType: 'image',
  },
  post: {
    title: 'Post Generator',
    description: 'Tell us about your post topic and target audience',
    placeholder: 'Example: Write a motivational LinkedIn post about overcoming challenges in entrepreneurship...',
    outputType: 'text',
  },
  message: {
    title: 'Message Composer',
    description: 'Describe the message you want to compose',
    placeholder: 'Example: Write a professional follow-up email after a networking event...',
    outputType: 'text',
  },
  imagePrompt: {
    title: 'Image Prompt Generator',
    description: 'Enter a theme or idea to generate a creative image prompt',
    placeholder: 'Example: A futuristic city at sunset, Minimalist aesthetic workspace...',
    outputType: 'text',
  },
  caption: {
    title: 'Caption & Hashtag Generator',
    description: 'Enter keywords or topics to generate captions and hashtags',
    placeholder: 'Example: Travel adventure, morning coffee, fitness motivation...',
    outputType: 'caption',
  },
  thumbnail: {
    title: 'Thumbnail Generator',
    description: 'Configure thumbnail parameters and generate eye-catching designs',
    placeholder: '',
    outputType: 'thumbnail',
  },
  script: {
    title: 'YouTube Script Generator',
    description: 'Enter a topic and style to generate a complete video script',
    placeholder: 'Example: Topic: AI in healthcare, Style: informative and engaging...',
    outputType: 'script',
  },
};

export default function ToolModal({ tool, isOpen, onClose }: ToolModalProps) {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [outputTitle, setOutputTitle] = useState<string | null>(null);
  const [outputDescription, setOutputDescription] = useState<string | null>(null);
  const [captionData, setCaptionData] = useState<{ caption: string; hashtags: string[]; tone: string } | null>(null);
  const [scriptData, setScriptData] = useState<{ intro: string; body: string; outro: string; topic: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = tool ? toolConfig[tool] : null;
  const charCount = input.length;
  const maxChars = 500;

  // Always call hooks at the top level - before any conditional returns
  useEffect(() => {
    if (!isOpen) {
      setInput('');
      setOutput(null);
      setOutputImage(null);
      setOutputTitle(null);
      setOutputDescription(null);
      setCaptionData(null);
      setScriptData(null);
      setProgress(0);
      setIsGenerating(false);
      setCopied(false);
      setError(null);
    }
  }, [isOpen]);

  // Use specialized modals for video and thumbnail - after all hooks
  if (tool === 'video') {
    return <VideoCreatorModal isOpen={isOpen} onClose={onClose} />;
  }

  if (tool === 'thumbnail') {
    return <ThumbnailGeneratorModal isOpen={isOpen} onClose={onClose} />;
  }

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter a prompt to generate content.');
      return;
    }

    if (!tool) return;

    setIsGenerating(true);
    setProgress(0);
    setOutput(null);
    setOutputImage(null);
    setOutputTitle(null);
    setOutputDescription(null);
    setCaptionData(null);
    setScriptData(null);
    setError(null);

    try {
      if (tool === 'avatar') {
        const result = await generateAvatar(input, (prog) => setProgress(prog));
        setOutputImage(result.image);
        setOutputTitle(result.style);
        setOutputDescription('Your custom AI-generated avatar based on your description.');
        setProgress(100);
      } else if (tool === 'post') {
        setProgress(20);
        const result = await generatePost(input, (partial) => {
          setOutput(partial);
          const estimatedProgress = 20 + (partial.length / 500) * 80;
          setProgress(Math.min(estimatedProgress, 100));
        });
        setOutput(result);
        setProgress(100);
      } else if (tool === 'message') {
        setProgress(20);
        const result = await generateMessage(input, (partial) => {
          setOutput(partial);
          const estimatedProgress = 20 + (partial.length / 500) * 80;
          setProgress(Math.min(estimatedProgress, 100));
        });
        setOutput(result);
        setProgress(100);
      } else if (tool === 'imagePrompt') {
        setProgress(20);
        const result = await generateImagePrompt(input, (partial) => {
          setOutput(partial);
          const estimatedProgress = 20 + (partial.length / 300) * 80;
          setProgress(Math.min(estimatedProgress, 100));
        });
        setOutput(result);
        setProgress(100);
      } else if (tool === 'caption') {
        setProgress(20);
        const result = await generateCaption(input, (partial) => {
          setCaptionData({ caption: partial, hashtags: [], tone: 'Generating...' });
          const estimatedProgress = 20 + (partial.length / 200) * 80;
          setProgress(Math.min(estimatedProgress, 100));
        });
        setCaptionData(result);
        setProgress(100);
      } else if (tool === 'script') {
        setProgress(20);
        const result = await generateScript(input, (partialJson) => {
          try {
            const partial = JSON.parse(partialJson);
            setScriptData(partial);
            const totalLength = partial.intro.length + partial.body.length + partial.outro.length;
            const estimatedProgress = 20 + (totalLength / 800) * 80;
            setProgress(Math.min(estimatedProgress, 100));
          } catch (e) {
            // Ignore JSON parse errors during progressive updates
          }
        });
        setScriptData(result);
        setProgress(100);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content. Please try again.';
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    let textToCopy = '';
    
    if (output) {
      textToCopy = output;
    } else if (captionData) {
      textToCopy = `${captionData.caption}\n\n${captionData.hashtags.join(' ')}`;
    } else if (scriptData) {
      textToCopy = `${scriptData.topic}\n\n[INTRO]\n${scriptData.intro}\n\n[BODY]\n${scriptData.body}\n\n[OUTRO]\n${scriptData.outro}`;
    } else if (outputTitle && outputDescription) {
      textToCopy = `${outputTitle}\n\n${outputDescription}`;
    }

    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${tool}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (captionData) {
      const content = `${captionData.caption}\n\n${captionData.hashtags.join(' ')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-caption-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (scriptData) {
      const content = `${scriptData.topic}\n\n[INTRO]\n${scriptData.intro}\n\n[BODY]\n${scriptData.body}\n\n[OUTRO]\n${scriptData.outro}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-script-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (outputImage) {
      window.open(outputImage, '_blank');
    }
  };

  if (!config) return null;

  const hasOutput = output || outputImage || captionData || scriptData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {config.title}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Your Prompt</label>
              <span className={`text-xs ${charCount > maxChars ? 'text-destructive' : 'text-muted-foreground'}`}>
                {charCount} / {maxChars}
              </span>
            </div>
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value.slice(0, maxChars));
                setError(null);
              }}
              placeholder={config.placeholder}
              className="min-h-[120px] resize-none"
              disabled={isGenerating}
            />
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating || charCount > maxChars}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate with AI'
            )}
          </Button>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                AI is processing your request... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Output Section */}
          {hasOutput && !isGenerating && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <CheckCircle className="w-4 h-4" />
                Generated Successfully!
              </div>
              
              {/* Text Output */}
              {output && (
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{output}</pre>
                </div>
              )}

              {/* Caption Output */}
              {captionData && (
                <div className="bg-muted/50 rounded-lg p-6 border border-border space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {captionData.tone} tone
                      </Badge>
                    </div>
                    <p className="text-base leading-relaxed">{captionData.caption}</p>
                  </div>
                  {captionData.hashtags.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Hashtags:</p>
                      <div className="flex flex-wrap gap-2">
                        {captionData.hashtags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Script Output */}
              {scriptData && (
                <div className="bg-muted/50 rounded-lg p-6 border border-border space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">{scriptData.topic}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {scriptData.intro && (
                      <div>
                        <Badge variant="outline" className="mb-2">INTRO</Badge>
                        <p className="text-sm leading-relaxed pl-4 border-l-2 border-primary/30">
                          {scriptData.intro}
                        </p>
                      </div>
                    )}
                    
                    {scriptData.body && (
                      <div>
                        <Badge variant="outline" className="mb-2">BODY</Badge>
                        <p className="text-sm leading-relaxed pl-4 border-l-2 border-primary/30">
                          {scriptData.body}
                        </p>
                      </div>
                    )}
                    
                    {scriptData.outro && (
                      <div>
                        <Badge variant="outline" className="mb-2">OUTRO</Badge>
                        <p className="text-sm leading-relaxed pl-4 border-l-2 border-primary/30">
                          {scriptData.outro}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Image Output (Avatar) */}
              {outputImage && (
                <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-4">
                  <img 
                    src={outputImage} 
                    alt={outputTitle || 'Generated content'}
                    className="w-full rounded-lg shadow-lg animate-in fade-in duration-500"
                  />
                  {outputTitle && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{outputTitle}</h3>
                      {outputDescription && (
                        <p className="text-sm text-muted-foreground">{outputDescription}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
