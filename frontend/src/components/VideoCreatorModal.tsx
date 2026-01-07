import { useState, useEffect, useRef } from 'react';
import { X, Loader2, CheckCircle, AlertCircle, RefreshCw, Sparkles, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useBuildVideoPrompt, useGenerateVideoAI } from '../hooks/useQueries';

interface VideoCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoCreatorModal({ isOpen, onClose }: VideoCreatorModalProps) {
  // Form state
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('1');
  const [style, setStyle] = useState('professional');
  const [mood, setMood] = useState('inspiring');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [builtPrompt, setBuiltPrompt] = useState('');
  
  // Output state
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const [outputThumbnail, setOutputThumbnail] = useState<string | null>(null);
  const [outputTitle, setOutputTitle] = useState<string | null>(null);
  const [outputDescription, setOutputDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Video playback state
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoLoadProgress, setVideoLoadProgress] = useState(0);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Backend hooks
  const buildPromptMutation = useBuildVideoPrompt();
  const generateVideoAIMutation = useGenerateVideoAI();

  useEffect(() => {
    if (!isOpen) {
      // Reset all state
      setTopic('');
      setDuration('1');
      setStyle('professional');
      setMood('inspiring');
      setIsGenerating(false);
      setProgress(0);
      setCurrentStep('');
      setBuiltPrompt('');
      setOutputVideo(null);
      setOutputThumbnail(null);
      setOutputTitle(null);
      setOutputDescription(null);
      setError(null);
      setShowVideoPlayer(false);
      setVideoError(null);
      setIsVideoLoading(false);
      setVideoLoadProgress(0);
      setLoadAttempts(0);
    }
  }, [isOpen]);

  // Handle video loading with robust error handling
  useEffect(() => {
    if (outputVideo && videoRef.current && showVideoPlayer) {
      const videoElement = videoRef.current;
      setVideoError(null);
      setIsVideoLoading(true);
      setVideoLoadProgress(0);
      
      videoElement.pause();
      videoElement.currentTime = 0;
      
      const handleLoadStart = () => {
        setVideoLoadProgress(10);
        setIsVideoLoading(true);
      };
      
      const handleProgress = () => {
        if (videoElement.buffered.length > 0) {
          const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
          const duration = videoElement.duration;
          if (duration > 0) {
            const percentLoaded = (bufferedEnd / duration) * 100;
            setVideoLoadProgress(Math.min(percentLoaded, 90));
          }
        }
      };
      
      const handleLoadedData = () => {
        setVideoLoadProgress(70);
      };
      
      const handleLoadedMetadata = () => {
        setVideoLoadProgress(50);
      };
      
      const handleCanPlay = () => {
        setVideoLoadProgress(100);
        setIsVideoLoading(false);
        setLoadAttempts(0);
        
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log('Autoplay prevented:', err);
          });
        }
      };
      
      const handleError = (e: Event) => {
        console.error('Video loading error:', e, videoElement.error);
        setIsVideoLoading(false);
        
        if (loadAttempts < 3) {
          setLoadAttempts(prev => prev + 1);
          setTimeout(() => {
            setVideoLoadProgress(0);
            setIsVideoLoading(true);
            videoElement.load();
          }, 1000);
        } else {
          const errorMsg = videoElement.error 
            ? `Video error: ${videoElement.error.message}` 
            : 'Unable to load video after multiple attempts.';
          setVideoError(`${errorMsg} The video file may be unavailable.`);
          setVideoLoadProgress(0);
        }
      };
      
      videoElement.addEventListener('loadstart', handleLoadStart);
      videoElement.addEventListener('progress', handleProgress);
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('canplay', handleCanPlay);
      
      videoElement.src = outputVideo;
      videoElement.load();
      
      return () => {
        videoElement.removeEventListener('loadstart', handleLoadStart);
        videoElement.removeEventListener('progress', handleProgress);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [outputVideo, loadAttempts, showVideoPlayer]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a video topic.');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep('Initializing...');
    setBuiltPrompt('');
    setOutputVideo(null);
    setOutputThumbnail(null);
    setOutputTitle(null);
    setOutputDescription(null);
    setError(null);
    setShowVideoPlayer(false);
    setVideoError(null);
    setLoadAttempts(0);

    try {
      // Step 1: Build prompt (15%)
      setCurrentStep('Building AI prompt from your parameters...');
      setProgress(5);
      
      const prompt = await buildPromptMutation.mutateAsync({
        duration: parseInt(duration),
        topic,
        style,
        mood,
      });
      
      setBuiltPrompt(prompt);
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Send to RunwayML API via backend (70%)
      setCurrentStep('Sending request to RunwayML API...');
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setCurrentStep('Processing video generation with RunwayML...');
      setProgress(30);
      
      // Call backend which makes HTTP outcall to RunwayML
      const videoResult = await generateVideoAIMutation.mutateAsync({
        duration: parseInt(duration),
        topic,
        style,
        mood,
      });
      
      setProgress(60);
      setCurrentStep('Receiving video from RunwayML...');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Step 3: Process response (90%)
      setCurrentStep('Processing video response...');
      setProgress(75);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Extract video URL from response
      // The backend should return a Video object with content as a URL string
      if (videoResult && videoResult.content) {
        // Check if content is a URL string or needs processing
        let videoUrl: string;
        
        if (typeof videoResult.content === 'string') {
          // If it's a string, check if it's a URL or base64
          if (videoResult.content.startsWith('http://') || videoResult.content.startsWith('https://')) {
            videoUrl = videoResult.content;
          } else if (videoResult.content.startsWith('data:video')) {
            // Base64 video data
            videoUrl = videoResult.content;
          } else {
            // Assume it's a path to an asset
            videoUrl = videoResult.content;
          }
        } else {
          throw new Error('Invalid video content format received from backend');
        }
        
        setOutputVideo(videoUrl);
        setOutputTitle(videoResult.title || `${topic} - ${style}`);
        setOutputDescription(`Generated ${duration} minute ${style} video with ${mood} mood via RunwayML API`);
        
        // Set thumbnail if available (could be extracted from video or provided by API)
        // For now, we'll show the video player directly
        setShowVideoPlayer(true);
      } else {
        throw new Error('No video content received from RunwayML API. The backend may not have implemented the generateVideoAI method yet.');
      }
      
      // Step 4: Finalize (100%)
      setCurrentStep('Finalizing output...');
      setProgress(95);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress(100);
      setCurrentStep('Complete!');
      
    } catch (err) {
      let errorMessage = 'Failed to generate video. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('generateVideoAI method not available')) {
          errorMessage = 'Video generation API is not yet available. The backend needs to implement the generateVideoAI method with RunwayML integration.';
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

  const handlePlayVideo = () => {
    setShowVideoPlayer(true);
  };

  const handleRetryVideo = () => {
    if (videoRef.current && outputVideo) {
      setVideoError(null);
      setLoadAttempts(0);
      setVideoLoadProgress(0);
      setIsVideoLoading(true);
      const videoElement = videoRef.current;
      videoElement.src = outputVideo;
      videoElement.load();
    }
  };

  const handleRetryGeneration = () => {
    setError(null);
    handleGenerate();
  };

  const hasOutput = outputVideo;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            AI Video Creator
          </DialogTitle>
          <DialogDescription>
            Configure your video parameters and let RunwayML AI generate professional content
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="topic">Video Topic *</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setError(null);
                }}
                placeholder="e.g., Sustainable technology and green innovation"
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={duration} onValueChange={setDuration} disabled={isGenerating}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="2">2 minutes</SelectItem>
                  <SelectItem value="3">3 minutes</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="style">Video Style</Label>
              <Select value={style} onValueChange={setStyle} disabled={isGenerating}>
                <SelectTrigger id="style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="mood">Mood</Label>
              <Select value={mood} onValueChange={setMood} disabled={isGenerating}>
                <SelectTrigger id="mood">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inspiring">Inspiring</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="uplifting">Uplifting</SelectItem>
                  <SelectItem value="serious">Serious</SelectItem>
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
            disabled={!topic.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating with RunwayML...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Video with RunwayML AI
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
                <span>Powered by RunwayML API</span>
              </div>
            </div>
          )}

          {/* Output Section */}
          {hasOutput && !isGenerating && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle className="w-4 h-4" />
                Video Generated Successfully with RunwayML!
              </div>
              
              {/* Video Output */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-4">
                {/* Thumbnail preview before video loads */}
                {!showVideoPlayer && outputThumbnail && (
                  <div className="relative group cursor-pointer" onClick={handlePlayVideo}>
                    <img 
                      src={outputThumbnail} 
                      alt="Video thumbnail"
                      className="w-full rounded-lg shadow-lg animate-in fade-in duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg group-hover:bg-black/50 transition-colors">
                      <div className="w-20 h-20 rounded-full bg-blue-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">Click to play video</p>
                  </div>
                )}
                
                {/* Video player */}
                {(showVideoPlayer || !outputThumbnail) && (
                  <>
                    {isVideoLoading && (
                      <div className="space-y-2">
                        <Progress value={videoLoadProgress} className="h-2" />
                        <p className="text-xs text-center text-muted-foreground">
                          Loading video... {Math.round(videoLoadProgress)}%
                        </p>
                      </div>
                    )}
                    
                    {videoError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-2">
                            <p className="text-sm">{videoError}</p>
                            <Button
                              onClick={handleRetryVideo}
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <RefreshCw className="w-3 h-3 mr-2" />
                              Retry Loading Video
                            </Button>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <video 
                      ref={videoRef}
                      controls
                      loop
                      muted
                      playsInline
                      className="w-full rounded-lg shadow-lg bg-black animate-in fade-in duration-500"
                      preload="auto"
                    >
                      <source src={outputVideo} type='video/mp4; codecs="avc1.64001E, mp4a.40.2"' />
                      Your browser does not support the video tag.
                    </video>
                  </>
                )}
                
                {outputTitle && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{style}</Badge>
                      <Badge variant="outline">{mood}</Badge>
                      <Badge variant="outline">{duration} min</Badge>
                      <Badge variant="outline" className="ml-auto">
                        <Zap className="w-3 h-3 mr-1" />
                        RunwayML
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold">{outputTitle}</h4>
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
