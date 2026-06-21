import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { VideoData } from '../../data/videos';

interface VideoThumbnailProps {
  video: VideoData;
  duration?: number;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video, duration = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = frame / (duration * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505' }}>
      {/* Background with gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(50, 50, 50, 0.6) 100%)`,
        }}
      />

      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at ${20 + progress * 60}% ${30 + Math.sin(progress * Math.PI * 2) * 20}%, #c8ff00 0%, transparent 50%)`,
        }}
      />

      {/* Content Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          textAlign: 'center',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '30px',
            maxWidth: '90%',
            opacity: Math.min(progress * 1.5, 1),
            transform: `translateY(${Math.max(0, (1 - progress) * 40)}px)`,
            fontFamily: 'Archivo Black, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {video.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            color: '#c8ff00',
            maxWidth: '85%',
            opacity: Math.min(Math.max(progress - 0.2) * 2, 1),
            marginBottom: '40px',
            fontFamily: 'Space Mono, monospace',
          }}
        >
          {video.description?.substring(0, 100)}...
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'rgba(200, 255, 0, 0.2)',
            border: '2px solid #c8ff00',
            borderRadius: '999px',
            color: '#c8ff00',
            fontSize: '14px',
            fontFamily: 'Space Mono, monospace',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: Math.min(Math.max(progress - 0.3) * 2, 1),
            transform: `scale(${Math.min(progress * 1.2 + 0.8, 1)})`,
          }}
        >
          {video.source || 'CJP MEDIA'}
        </div>
      </div>

      {/* Animated border */}
      <div
        style={{
          position: 'absolute',
          inset: '40px',
          border: '2px solid',
          borderColor: `rgba(200, 255, 0, ${Math.sin(progress * Math.PI * 2) * 0.3 + 0.3})`,
          pointerEvents: 'none',
        }}
      />

      {/* Animated corner elements */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          width: '30px',
          height: '30px',
          border: `2px solid #c8ff00`,
          borderRight: 'none',
          borderBottom: 'none',
          opacity: Math.min(progress * 2, 1),
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '30px',
          height: '30px',
          border: `2px solid #c8ff00`,
          borderLeft: 'none',
          borderBottom: 'none',
          opacity: Math.min(progress * 2, 1),
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          width: '30px',
          height: '30px',
          border: `2px solid #c8ff00`,
          borderRight: 'none',
          borderTop: 'none',
          opacity: Math.min(progress * 2, 1),
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          width: '30px',
          height: '30px',
          border: `2px solid #c8ff00`,
          borderLeft: 'none',
          borderTop: 'none',
          opacity: Math.min(progress * 2, 1),
        }}
      />
    </AbsoluteFill>
  );
};
