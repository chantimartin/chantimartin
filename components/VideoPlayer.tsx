
import React from 'react';
import Loader from './Loader';
import { TvIcon, ErrorIcon } from './Icons';

interface VideoPlayerProps {
  isLoading: boolean;
  videoUrl: string | null;
  error: string | null;
  progressMessage: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ isLoading, videoUrl, error, progressMessage }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <Loader />
          <p className="mt-4 text-lg font-semibold text-orange-600 animate-pulse">{progressMessage}</p>
          <p className="mt-2 text-sm text-slate-500">Please keep this window open.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-600 bg-red-50 p-6 rounded-lg">
          <ErrorIcon className="w-12 h-12 mb-4" />
          <h3 className="text-lg font-semibold">Animation Failed</h3>
          <p className="mt-2 text-sm text-red-500">{error}</p>
        </div>
      );
    }
    if (videoUrl) {
      return (
        <video 
          src={videoUrl} 
          controls 
          autoPlay 
          className="w-full rounded-lg shadow-2xl"
          aria-label="Generated animation"
        >
          Your browser does not support the video tag.
        </video>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center text-slate-500">
        <TvIcon className="w-24 h-24 text-slate-300" />
        <p className="mt-4 text-lg">Your animation will appear here</p>
        <p className="text-sm">Click the "Generate Animation" button to begin.</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm aspect-video w-full rounded-xl shadow-inner-lg p-2 flex items-center justify-center ring-1 ring-slate-900/10">
      <div className="bg-black w-full h-full rounded-lg flex items-center justify-center p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default VideoPlayer;
