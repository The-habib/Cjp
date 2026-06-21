import { VideoData } from '../data/videos';

/**
 * Utility functions for working with Remotion video generation
 * Used to create animated thumbnails and video intros
 */

interface RemotionCompositionConfig {
  compositionId: string;
  videoId: string;
  duration: number; // in frames
  fps: number;
  width: number;
  height: number;
}

/**
 * Get Remotion composition config for a video
 */
export const getRemotionConfig = (
  video: VideoData,
  duration: number = 60
): RemotionCompositionConfig => ({
  compositionId: `thumbnail-${video.id}`,
  videoId: video.id,
  duration: duration * 60, // Convert seconds to frames at 60fps
  fps: 60,
  width: 1920,
  height: 1080,
});

/**
 * Generate preview image URL for a video (simulated)
 * In production, this would call your Remotion Lambda or similar service
 */
export const generateVideoThumbnail = async (videoId: string): Promise<string> => {
  // For now, return a placeholder
  // In production, integrate with Remotion Lambda or similar
  return `https://via.placeholder.com/1920x1080?text=${videoId}`;
};

/**
 * Animation timing presets for video generation
 */
export const animationPresets = {
  quick: {
    duration: 30, // 30 frames
    easing: [0.33, 1, 0.68, 1],
  },
  standard: {
    duration: 60, // 60 frames
    easing: [0.16, 1, 0.3, 1],
  },
  smooth: {
    duration: 120, // 120 frames
    easing: [0.16, 1, 0.3, 1],
  },
  bouncy: {
    duration: 90, // 90 frames
    easing: 'spring',
  },
} as const;

/**
 * Get animation timing based on preset name
 */
export const getAnimationTiming = (
  preset: keyof typeof animationPresets = 'standard'
) => animationPresets[preset];
