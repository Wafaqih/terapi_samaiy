import React from 'react';
import { 
  ChevronLeft, ChevronRight, Volume2, BookOpen, Layers
} from 'lucide-react';
import { SlideData } from '../types/presentation';
import spotsufyLogo from '../assets/images/logo_spotsufy.png';

interface SpotifySidebarProps {
  slides: SlideData[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  isPlayingAudio: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onGoHome: () => void;
  onOpenMusicLibrary?: () => void;
}

export const SpotifySidebar: React.FC<SpotifySidebarProps> = ({
  slides,
  currentSlideIndex,
  onSelectSlide,
  isPlayingAudio,
  isCollapsed,
  onToggleCollapse,
  onGoHome
}) => {
  return (
    <aside 
      className={`h-full bg-black flex flex-col border-r border-white/10 transition-all duration-300 select-none z-30 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-72 lg:w-80'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        {!isCollapsed ? (
          <div 
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group"
            title="Kembali ke Beranda"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shadow-md shadow-[#1DB954]/25 shrink-0 bg-black flex items-center justify-center">
              <img 
                src={spotsufyLogo} 
                alt="Spotsufy Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#1DB954] tracking-tight group-hover:underline">
                Spotsufy
              </h2>
              <p className="text-[10px] text-[#A7A7A7]">Terapi Samā‘iy (Slide 1–5)</p>
            </div>
          </div>
        ) : (
          <div 
            onClick={onGoHome}
            className="mx-auto w-9 h-9 rounded-full overflow-hidden shadow-md shadow-[#1DB954]/25 bg-black flex items-center justify-center cursor-pointer"
            title="Kembali ke Beranda"
          >
            <img 
              src={spotsufyLogo} 
              alt="Spotsufy Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          title={isCollapsed ? "Buka Daftar Slide" : "Persempit Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Playlist Header */}
      {!isCollapsed && (
        <div className="px-4 pt-3 pb-1 flex items-center justify-between text-xs text-white/50 font-mono">
          <span className="uppercase tracking-wider">Daftar Materi Slide</span>
          <span>5 Slide</span>
        </div>
      )}

      {/* 5 Slide Tracks List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        {slides.map((slide, idx) => {
          const isCurrent = currentSlideIndex === idx;

          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(idx)}
              className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-all group ${
                isCurrent 
                  ? 'bg-white/10 text-white border border-[#1DB954]/30' 
                  : 'text-[#B3B3B3] hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <div className="w-6 text-center text-xs font-mono font-bold shrink-0 pt-0.5">
                {isCurrent && isPlayingAudio ? (
                  <Volume2 className="w-4 h-4 text-[#1DB954] mx-auto animate-pulse" />
                ) : (
                  <span className={isCurrent ? 'text-[#1DB954]' : 'text-white/40'}>
                    {slide.trackNumber}
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0 pr-1">
                  <p className={`text-xs leading-snug font-semibold line-clamp-2 ${isCurrent ? 'text-[#1DB954]' : 'text-white'}`}>
                    {slide.title}
                  </p>
                  <p className="text-[10px] text-[#888888] truncate mt-1">
                    {slide.subtitle}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer info */}
      {!isCollapsed && (
        <div className="p-3.5 border-t border-white/5 bg-[#121212] text-[10px] text-[#727272] flex items-center justify-between">
          <span>Imam Al-Ghazali & Al-Farabi</span>
          <span className="text-[#1DB954] font-mono font-semibold">16:9 HD</span>
        </div>
      )}
    </aside>
  );
};
