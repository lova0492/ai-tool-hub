import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Video, Thumbnail, VideoPrompt } from '../backend';

// Video Generation Hook - Calls RunwayML via backend
export function useGenerateVideoAI() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      duration,
      topic,
      style,
      mood,
    }: {
      duration: number;
      topic: string;
      style: string;
      mood: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Call backend generateVideoAI which makes HTTP outcalls to RunwayML
      if (typeof (actor as any).generateVideoAI !== 'function') {
        throw new Error('generateVideoAI method not available on backend. The backend needs to implement this method with RunwayML API integration.');
      }
      
      const videoPrompt: VideoPrompt = {
        topic,
        style,
        mood,
        duration: BigInt(duration),
      };
      
      const video = await (actor as any).generateVideoAI(videoPrompt);
      return video;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

// Text-to-Image Generation Hook - Calls OpenAI via backend
export function useGenerateTextImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      text,
      emotion,
      colorPrefs,
    }: {
      text: string;
      emotion: string;
      colorPrefs: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Call backend generateTextImage which makes HTTP outcalls to OpenAI
      if (typeof (actor as any).generateTextImage !== 'function') {
        throw new Error('generateTextImage method not available on backend. The backend needs to implement this method with OpenAI API integration.');
      }
      
      const thumbnail = await (actor as any).generateTextImage(text, emotion, colorPrefs);
      return thumbnail;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thumbnails'] });
    },
  });
}

// Legacy Video Generation Hook (fallback)
export function useGenerateVideo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      duration,
      topic,
      style,
      mood,
    }: {
      duration: number;
      topic: string;
      style: string;
      mood: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      const videoPrompt: VideoPrompt = {
        topic,
        style,
        mood,
        duration: BigInt(duration),
      };
      
      const video = await actor.generateVideo(videoPrompt);
      return video;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

// Legacy Thumbnail Generation Hook (fallback)
export function useGenerateThumbnail() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      text,
      emotion,
      colorPrefs,
    }: {
      text: string;
      emotion: string;
      colorPrefs: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      const thumbnail = await actor.generateThumbnail(text, emotion, colorPrefs);
      return thumbnail;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thumbnails'] });
    },
  });
}

// Build Video Prompt Hook
export function useBuildVideoPrompt() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      duration,
      topic,
      style,
      mood,
    }: {
      duration: number;
      topic: string;
      style: string;
      mood: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      const videoPrompt: VideoPrompt = {
        topic,
        style,
        mood,
        duration: BigInt(duration),
      };
      
      const prompt = await actor.buildVideoPrompt(videoPrompt);
      return prompt;
    },
  });
}

// Build Thumbnail Prompt Hook
export function useBuildThumbnailPrompt() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      text,
      emotion,
      colorPrefs,
    }: {
      text: string;
      emotion: string;
      colorPrefs: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      const prompt = await actor.buildThumbnailPrompt(text, emotion, colorPrefs);
      return prompt;
    },
  });
}

// List Assets Hook
export function useListAssets() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Array<[string, string]>>({
    queryKey: ['assets'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAssets();
    },
    enabled: !!actor && !isActorFetching,
  });
}

// Get Asset Hook
export function useGetAsset(key: string) {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ['asset', key],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAsset(key);
    },
    enabled: !!actor && !isActorFetching && !!key,
  });
}
