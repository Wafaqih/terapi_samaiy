import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Heart, Volume2, VolumeX, 
  Maximize, Minimize, BookOpen, Music, Disc, ChevronDown
} from 'lucide-react';
import { SlideData, AudioTrackType } from '../types/presentation';
import { audioEngine, getTrackDisplayName } from '../utils/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';

interface SpotifyPlayerBarProps {
  currentSlide: SlideData;
  totalSlides: number;
  currentSlideIndex: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onSeekSlide: (index: number) => void;
  isPlayingAudio: boolean;
  activeAudioTrack: AudioTrackType;
  onTogglePlayAudio: () => void;
  onSelectAudioTrack: (track: AudioTrackType) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
  onOpenReferences: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onHide?: () => void;
}

export const SpotifyPlayerBar: React.FC<SpotifyPlayerBarProps> = ({
  currentSlide,
  totalSlides,
  currentSlideIndex,
  onPrevSlide,
  onNextSlide,
  onSeekSlide,
  isPlayingAudio,
  activeAudioTrack,
  onTogglePlayAudio,
  onSelectAudioTrack,
  volume,
  onVolumeChange,
  isLiked = false,
  onToggleLike,
  onOpenReferences,
  isFullscreen,
  onToggleFullscreen,
  onHide
}) => {
  const [prevVolume, setPrevVolume] = useState<number>(0.75);
  const [audioTime, setAudioTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  // Subscribe to real audio playback progress
  useEffect(() => {
    const unsubscribe = audioEngine.addTimeListener((cur, dur) => {
      setAudioTime(cur);
      setAudioDuration(dur);
    });
    return unsubscribe;
  }, []);

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(prevVolume || 0.75);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const trackInfo = getTrackDisplayName(activeAudioTrack);

  return (
    <footer className="h-20 bg-[#141414] border-t border-white/10 px-4 md:px-6 flex items-center justify-between select-none z-40 shrink-0">
      {/* Left: Current Slide Info & Album Icon */}
      <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
        <div className="relative w-12 h-12 rounded-lg bg-black border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1DB954]/25 to-black" />
          <Disc 
            className={`w-6 h-6 text-[#1DB954] relative z-10 ${isPlayingAudio ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '6s' }} 
          />
        </div>

        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold text-[#1DB954] bg-[#1DB954]/10 px-1.5 py-0.2 rounded border border-[#1DB954]/20">
              Slide {currentSlide.trackNumber}
            </span>
            <h4 className="text-xs font-bold text-white truncate">
              {currentSlide.title}
            </h4>
          </div>
          <p className="text-[10px] text-[#A7A7A7] truncate mt-0.5">
            {currentSlide.category} · {isPlayingAudio ? (trackInfo.hasRealAudio ? 'Audio Kontemplatif Aktif' : 'Musik Diputar') : 'Audio Hening'}
          </p>
        </div>

        {onToggleLike && (
          <button
            onClick={onToggleLike}
            className={`p-1.5 transition-colors ${
              isLiked ? 'text-[#1DB954]' : 'text-white/40 hover:text-white'
            }`}
            title={isLiked ? "Hapus dari Favorit" : "Tandai Slide Favorit"}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        )}

        {isPlayingAudio && (
          <div className="hidden xl:block ml-1">
            <AudioVisualizer isPlaying={isPlayingAudio} barCount={6} height={12} />
          </div>
        )}
      </div>

      {/* Center: Single, Dedicated Slide Navigation & Progress Bar */}
      <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-xl">
        <div className="flex items-center gap-4">
          {/* Previous Slide Button */}
          <button
            onClick={onPrevSlide}
            disabled={currentSlideIndex === 0}
            className="text-white/70 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-1"
            title="Slide Sebelumnya [←]"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Background Audio Play/Pause Button */}
          <button
            onClick={onTogglePlayAudio}
            className="w-10 h-10 rounded-full bg-white hover:scale-105 active:scale-95 text-black flex items-center justify-center transition-all shadow-md shadow-white/10"
            title={isPlayingAudio ? "Jeda Audio Kontemplasi [Spasi/P]" : "Putar Audio Kontemplasi [Spasi/P]"}
          >
            {isPlayingAudio ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Slide Button */}
          <button
            onClick={onNextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="text-white/70 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors p-1"
            title="Slide Berikutnya [→ / Spasi]"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* 5-Slide Step Navigator (Pristine, Proportional, No Clutter) */}
        <div className="w-full flex items-center justify-center gap-2">
          <span className="text-[11px] font-mono text-[#A7A7A7] font-semibold">
            Slide {currentSlideIndex + 1} / {totalSlides}
          </span>

          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSeekSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'w-8 bg-[#1DB954]'
                    : currentSlideIndex > idx
                    ? 'w-4 bg-white/40 hover:bg-white/60'
                    : 'w-3 bg-white/15 hover:bg-white/30'
                }`}
                title={`Lompat ke Slide ${idx + 1}`}
              />
            ))}
          </div>

          {isPlayingAudio && (
            <span className="text-[10px] font-mono text-[#1DB954] font-medium ml-2">
              {formatTime(audioTime)} / {audioDuration > 0 ? formatTime(audioDuration) : '3:00'}
            </span>
          )}
        </div>
      </div>

      {/* Right: Audio Volume, Academic References & Fullscreen Toggle */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
        {/* Ambient Contemplation Audio Toggle */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => onSelectAudioTrack(activeAudioTrack === 'none' ? 'arabian_acoustic' : 'none')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
              activeAudioTrack !== 'none'
                ? 'bg-[#1DB954]/15 border-[#1DB954] text-[#1DB954]'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
            title="Pilih Suasana Audio Klasik"
          >
            <span className="text-[11px] font-mono">
              {activeAudioTrack !== 'none' ? '🎵 Akustik Ney' : 'Hening'}
            </span>
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-1.5 w-24">
          <button 
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors"
            title={volume === 0 ? "Bunyikan" : "Bisukan"}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
            title="Volume"
          />
        </div>

        {/* Academic References Drawer Button */}
        <button
          onClick={onOpenReferences}
          className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors relative"
          title="Buka Referensi Akademik"
        >
          <BookOpen className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#1DB954]" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title={isFullscreen ? "Keluar Fullscreen [F]" : "Layar Penuh [F]"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        {/* Hide Bottom Player Bar Button */}
        {onHide && (
          <button
            onClick={onHide}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Sembunyikan Navigasi Bawah [B] (Perluas Area Slide)"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </footer>
  );
};
