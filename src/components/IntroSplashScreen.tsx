import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import introVideo from '../assets/intro spotsufy.mp4';

interface IntroSplashScreenProps {
  onComplete: () => void;
}

export const IntroSplashScreen: React.FC<IntroSplashScreenProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartPlay = () => {
    setIsPlaying(true);
    // Allow DOM to mount the video element, then initiate playback
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => onComplete());
          }
        });
      }
    }, 50);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden">
      {!isPlaying ? (
        <button
          onClick={handleStartPlay}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-[0_0_50px_rgba(29,185,84,0.35)] hover:shadow-[0_0_80px_rgba(29,185,84,0.6)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Play Intro"
          title="Putar Intro Spotsufy"
        >
          <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-black text-black ml-1.5 transition-transform" />
        </button>
      ) : (
        <video
          ref={videoRef}
          src={introVideo}
          playsInline
          autoPlay
          onEnded={onComplete}
          onError={onComplete}
          className="w-full h-full object-contain bg-black cursor-pointer"
          onClick={onComplete}
          title="Klik untuk lewati intro"
        />
      )}
    </div>
  );
};
