import React, { useState, useEffect } from 'react';
import { 
  Home, Search, Library, PlusSquare, Heart, ChevronLeft, ChevronRight, 
  Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Users, Info, X, Music,
  Download
} from 'lucide-react';
import { AudioTrackType } from '../types/presentation';
import { audioEngine } from '../utils/audioEngine';
import { SLIDES_DATA } from '../data/slidesData';
import spotsufyLogo from '../assets/images/logo_spotsufy.png';
import { GroupInfoModal } from './GroupInfoModal';
import { ExportPdfModal } from './ExportPdfModal';

interface SpotsufyHomeProps {
  onStartPresentation: () => void;
  isPlayingAudio: boolean;
  onTogglePlayAudio: () => void;
  activeAudioTrack: AudioTrackType;
  onSelectTrack: (track: AudioTrackType) => void;
  onOpenLiked: () => void;
  onOpenReferences: () => void;
}

export const SpotsufyHome: React.FC<SpotsufyHomeProps> = ({
  onStartPresentation,
  isPlayingAudio,
  onTogglePlayAudio,
  activeAudioTrack,
  onSelectTrack,
  onOpenLiked,
  onOpenReferences
}) => {
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [playlistNotice, setPlaylistNotice] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  useEffect(() => {
    const unsub = audioEngine.addTimeListener((cur, dur) => {
      if (!isDragging) {
        setAudioTime(cur);
        setAudioDuration(dur);
      }
    });
    return unsub;
  }, [isDragging]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full h-full bg-[#121212] text-white flex select-none overflow-hidden font-sans">
      {/* ----------------- LEFT SIDEBAR ----------------- */}
      <aside className="w-64 lg:w-72 bg-black flex flex-col justify-between p-6 border-r border-white/5 shrink-0">
        <div className="space-y-7">
          {/* Brand Logo: Spotsufy */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-[#1DB954]/25 shrink-0 flex items-center justify-center bg-black">
              <img 
                src={spotsufyLogo} 
                alt="Spotsufy Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#1DB954] flex items-center">
              Spotsufy
            </span>
          </div>

          {/* Primary Navigation Links */}
          <nav className="space-y-4">
            <button 
              className="flex items-center gap-4 text-sm font-bold text-white transition-colors w-full text-left"
            >
              <Home className="w-6 h-6" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-4 text-sm font-bold text-[#B3B3B3] hover:text-white transition-colors w-full text-left"
            >
              <Search className="w-6 h-6" />
              <span>Search</span>
            </button>
            <button 
              onClick={onOpenReferences}
              className="flex items-center gap-4 text-sm font-bold text-[#B3B3B3] hover:text-white transition-colors w-full text-left"
            >
              <Library className="w-6 h-6" />
              <span>Daftar Pustaka</span>
            </button>
          </nav>

          {/* Secondary Actions */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <button 
              onClick={() => {
                setPlaylistNotice(true);
                setTimeout(() => setPlaylistNotice(false), 3000);
              }}
              className="flex items-center gap-4 text-sm font-bold text-[#B3B3B3] hover:text-white transition-colors w-full text-left group"
            >
              <div className="w-6 h-6 rounded-sm bg-white/20 group-hover:bg-white/30 text-white flex items-center justify-center transition-colors">
                <PlusSquare className="w-4 h-4" />
              </div>
              <span>Create Playlist</span>
            </button>

            <button 
              onClick={onOpenLiked}
              className="flex items-center gap-4 text-sm font-bold text-[#B3B3B3] hover:text-white transition-colors w-full text-left group"
            >
              <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-400 text-white flex items-center justify-center transition-transform group-hover:scale-105">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Liked Songs</span>
            </button>
          </div>
        </div>

        {/* Big Giant Green Play Button at the Bottom of Sidebar */}
        <div className="pt-6">
          <button
            onClick={onStartPresentation}
            className="w-16 h-16 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-2xl shadow-[#1DB954]/40 hover:scale-105 active:scale-95 transition-all group"
            title="Mulai Putar Presentasi"
          >
            <Play className="w-8 h-8 fill-current ml-1 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </aside>

      {/* ----------------- MAIN STAGE ----------------- */}
      <main className="flex-1 bg-gradient-to-b from-[#181818] via-[#121212] to-black p-6 md:p-10 flex flex-col justify-between overflow-hidden relative">
        {/* Top Browser Navigation Pills (< >) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              disabled
              className="w-8 h-8 rounded-full bg-black/60 text-white/30 flex items-center justify-center cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={onStartPresentation}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors hover:scale-105"
              title="Lanjut ke Slide Materi"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGroupModal(true)}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors border border-white/10 flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Info Kelompok 8</span>
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors border border-white/10 flex items-center gap-1.5"
              title="Export Halaman Beranda dan Seluruh Slide ke PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Center Hero Split: Left Info vs Right Album Art */}
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center flex-1 my-auto max-w-6xl mx-auto w-full">
          {/* Left Column: Title & Presentation Launch */}
          <div className="col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1DB954] block">
                PRESENTASI AKADEMIK RESMI
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                ISLAM KLASIK · TASAWUF & TEORI MUSIK
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                KONSEP TERAPI SAMĀ‘IY<br />
                MENURUT IMAM AL-GHAZALI<br />
                DAN IMAM AL-FARABI
              </h1>
              <p className="text-xs sm:text-sm text-[#D1D5DB] max-w-xl leading-relaxed">
                Materi Slide 1–5: Hubungan antara pendengaran, musik, hati, dan pembinaan jiwa berdasarkan <em>Iḥyā’ ‘Ulūm al-Dīn</em> dan <em>Kitāb al-Mūsīqā al-Kabīr</em>.
              </p>
            </div>

            {/* Kelompok Pill Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGroupModal(true)}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors border border-white/10 flex items-center gap-2"
              >
                <Users className="w-3.5 h-3.5 text-[#1DB954]" />
                <span>KELOMPOK 8 · TASAWUF PSIKOTERAPI</span>
              </button>
            </div>

            {/* Giant Green Start Presentation CTA */}
            <div className="pt-1">
              <button
                onClick={onStartPresentation}
                className="px-8 py-3.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-sm md:text-base tracking-wider uppercase shadow-xl shadow-[#1DB954]/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>MULAI PRESENTASI SLIDE 1–5</span>
              </button>
            </div>
          </div>

          {/* Right Column: Square Album Art & Audio Controls */}
          <div className="col-span-5 flex flex-col items-center justify-center space-y-4">
            {/* Square Album Cover Box */}
            <div className="relative group w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#181818]">
              <img
                src="/src/assets/images/ghazali_farabi_manuscript_1794465711425.jpg"
                alt="Konsep Terapi Samā‘iy Imam Al-Ghazali dan Imam Al-Farabi"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-[11px] font-bold text-white/90 drop-shadow">
                  Al-Ghazali & Al-Farabi · Iḥyā’ ‘Ulūm al-Dīn & Kitāb al-Mūsīqā al-Kabīr
                </span>
              </div>
            </div>

            {/* Under-Album Audio Controls & Scrubber */}
            <div className="w-full max-w-[340px] space-y-2">
              {/* Progress Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#A7A7A7] w-8 text-right tabular-nums">
                  {formatTime(isDragging ? dragValue : audioTime)}
                </span>
                <div className="relative flex-1 group py-1 flex items-center cursor-pointer">
                  <input
                    type="range"
                    min={0}
                    max={audioDuration > 0 ? audioDuration : 180}
                    step={0.5}
                    value={isDragging ? dragValue : audioTime}
                    onMouseDown={() => {
                      setIsDragging(true);
                      setDragValue(audioTime);
                    }}
                    onTouchStart={() => {
                      setIsDragging(true);
                      setDragValue(audioTime);
                    }}
                    onChange={(e) => setDragValue(Number(e.target.value))}
                    onMouseUp={(e) => {
                      setIsDragging(false);
                      const val = Number((e.target as HTMLInputElement).value);
                      audioEngine.seek(val);
                    }}
                    onTouchEnd={() => {
                      setIsDragging(false);
                      audioEngine.seek(dragValue);
                    }}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#1DB954] hover:accent-[#1ed760] transition-colors"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#A7A7A7] w-8 tabular-nums">
                  {audioDuration > 0 ? formatTime(audioDuration) : (isPlayingAudio ? '3:00' : '0:00')}
                </span>
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-center gap-5 pt-1">
                <button 
                  onClick={() => setIsShuffle(prev => !prev)}
                  className={`p-1.5 transition-colors ${
                    isShuffle ? 'text-[#1DB954]' : 'text-white/60 hover:text-white'
                  }`}
                  title="Acak"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => onSelectTrack('calm_acoustic')}
                  className="p-1.5 text-white/80 hover:text-white transition-colors"
                  title="Suasana Tenang"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                {/* Big White Circular Play Button */}
                <button
                  onClick={onTogglePlayAudio}
                  className="w-10 h-10 rounded-full bg-white hover:scale-105 active:scale-95 text-black flex items-center justify-center transition-all shadow-lg shadow-white/10"
                  title={isPlayingAudio ? "Jeda Audio" : "Putar Audio Kontemplatif"}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button 
                  onClick={() => onSelectTrack('arabian_acoustic')}
                  className="p-1.5 text-white/80 hover:text-white transition-colors"
                  title="Alunan Akustik Klasik"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>

                <button 
                  onClick={() => setIsRepeat(prev => !prev)}
                  className={`p-1.5 relative transition-colors ${
                    isRepeat ? 'text-[#1DB954]' : 'text-white/60 hover:text-white'
                  }`}
                  title="Ulangi"
                >
                  <Repeat className="w-4 h-4" />
                  {isRepeat && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright note */}
        <div className="flex items-center justify-between text-[11px] text-[#727272] border-t border-white/5 pt-3">
          <span><strong className="text-[#1DB954]">Spotsufy</strong> Special Edition © 2026 · Kelompok 8 Tasawuf Psikoterapi</span>
          <span className="text-white/50">Format Tayang Layar 16:9 Statis</span>
        </div>
      </main>

      {/* Group 8 Information Modal */}
      <GroupInfoModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onStartPresentation={onStartPresentation}
      />

      {/* Export PDF Modal (Only Beranda & Slides) */}
      <ExportPdfModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        slides={SLIDES_DATA}
      />

      {/* Playlist toast notice */}
      {playlistNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1DB954] text-black px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-300">
          <span>Playlist Terapi Sama'iy telah siap di koleksi Anda!</span>
        </div>
      )}

      {/* Search dialog */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#181818] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-[#1DB954]" /> Cari Materi Presentasi
              </h3>
              <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Ketik topik (contoh: Samā‘, Qalb, Wajd, Munāsabah, Al-Ghazali, Al-Farabi)..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchOpen(false);
                  onStartPresentation();
                }
              }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#1DB954]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSearchOpen(false);
                  onStartPresentation();
                }}
                className="px-4 py-2 bg-[#1DB954] text-black text-xs font-bold rounded-full"
              >
                Jelajahi Slide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
