import React from 'react';
import { Composition } from 'remotion';
import { VideoThumbnail } from './VideoThumbnail';
import { cjpVideos } from '../../data/videos';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Create compositions for each video */}
      {cjpVideos.map((video) => (
        <Composition
          key={`thumbnail-${video.id}`}
          id={`thumbnail-${video.id}`}
          component={() => <VideoThumbnail video={video} />}
          durationInFrames={30 * 60} // 30 seconds at 60fps
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{
            video,
          }}
        />
      ))}
    </>
  );
};
