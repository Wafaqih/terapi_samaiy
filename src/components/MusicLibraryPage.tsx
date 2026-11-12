import React, { useState, useMemo } from 'react';
import { 
  Play, Pause, Heart, Search, ArrowLeft, Music, Disc, Sparkles, 
  Clock, ShieldCheck, ChevronRight, Layers, Volume2, Info, FolderCheck
} from 'lucide-react';
import { AudioTrackType } from '../types/presentation';
import { 
  audioEngine, 
  getAllAvailableMusic, 
  MusicItem, 
  getTrackDisplayName 
} from '../utils/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';

interface MusicLibraryPageProps {
  isPlayingAudio: boolean;
  activeAudioTrack: AudioTrackType;
  onSelectTrack: (track: AudioTrackType) => void;
  onGoHome: () => void;
  onStartPresentation: () => void;
}

export const MusicLibraryPage: React.FC<MusicLibraryPageProps> = ({
  isPlayingAudio,
  activeAudioTrack,
  onSelectTrack,
  onGoHome,
  onStartPresentation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Dynamic list of all music (automatically includes all files in src/assets/music/)
  const allMusic = useMemo(() => {
    return getAllAvailableMusic();
  }, []);

  const uploadedCount = useMemo(() => {
    return allMusic.filter(m => m.isUploadedMp3).length;
  }, [allMusic]);

  const filteredMusic = useMemo(() => {
    return allMusic.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedCategory === 'All') return matchesSearch;
      if (selectedCategory === 'Maqamat') return matchesSearch && item.category.includes('Maqām');
      if (selectedCategory === 'Songs') return matchesSearch && !item.category.includes('Maqām');
      return matchesSearch;
    });
  }, [allMusic, searchTerm, selectedCategory]);

  const handlePlayItem = (item: MusicItem) => {
    if (isCurrentItemPlaying(item)) {
      audioEngine.stop();
      return;
    }
    if (item.url && item.isUploadedMp3) {
      audioEngine.playCustomAudio(item.url, item.title, item.description);
    } else {
      onSelectTrack(item.trackKey);
    }
  };

  const toggleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isCurrentItemPlaying = (item: MusicItem) => {
    if (!isPlayingAudio) return false;
    const customTitle = audioEngine.getCustomTitle();
    if (customTitle && (customTitle === item.title || customTitle.toUpperCase().includes(item.title.toUpperCase()) || item.title.toUpperCase().includes(customTitle.toUpperCase()))) {
      return true;
    }
    if (item.trackKey !== 'none' && activeAudioTrack === item.trackKey) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#201035] via-[#121212] to-black text-white flex flex-col overflow-y-auto select-none font-sans">
      {/* Top Breadcrumb Navigation */}
      <div className="p-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-black/30 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Beranda Spotsufy</span>
          </button>

          <span className="text-white/20">/</span>

          <span className="text-xs font-semibold text-white/90">
            Daftar Koleksi Musik (Liked Songs)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartPresentation}
            className="px-4 py-1.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-[#1DB954]/20"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mulai Slide Presentasi</span>
          </button>
        </div>
      </div>

      {/* Hero Header (Iconic Spotify Liked Songs Playlist Header) */}
      <div className="p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-end gap-6 bg-gradient-to-b from-purple-900/40 to-transparent">
        {/* Liked Songs Purple Gradient Art Box */}
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-700 to-emerald-500 flex items-center justify-center shadow-2xl shadow-purple-950/60 shrink-0 border border-white/10 relative group">
          <Heart className="w-20 h-20 text-white fill-current drop-shadow-xl" />
          <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Music className="w-10 h-10 text-white drop-shadow" />
          </div>
        </div>

        {/* Playlist Metadata Info */}
        <div className="space-y-2 flex-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-white/70 block">
            PLAYLIST OTOMATIS
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Koleksi Musik & Maqām
          </h1>
          <p className="text-xs md:text-sm text-white/70 pt-1 max-w-2xl leading-relaxed">
            Halaman ini memuat seluruh berkas audio yang dapat diputar secara langsung. Setiap berkas MP3 baru yang Anda simpan di folder <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#1DB954] font-mono text-xs">src/assets/music/</code> akan otomatis terdaftar di sini secara instan.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/80">
            <span className="font-extrabold text-[#1DB954]">Spotsufy Special</span>
            <span>•</span>
            <span>{allMusic.length} Berkas Audio MP3 Asli</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-6 md:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Big Green Play All Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (filteredMusic.length > 0) {
                  handlePlayItem(filteredMusic[0]);
                }
              }}
              className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-xl shadow-[#1DB954]/30 hover:scale-105 active:scale-95 transition-all"
              title="Putar Musik Pertama"
            >
              {isPlayingAudio ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            {isPlayingAudio && (
              <div className="flex items-center gap-2 bg-[#1DB954]/10 border border-[#1DB954]/30 px-3 py-1.5 rounded-full">
                <AudioVisualizer isPlaying={isPlayingAudio} barCount={10} height={14} />
                <span className="text-xs font-mono text-[#1DB954] font-bold">
                  Sedang Memutar Audio
                </span>
              </div>
            )}
          </div>

          {/* Quick Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari lagu atau maqām..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-[#242424] text-xs text-white placeholder-white/40 pl-9 pr-3 py-2 rounded-full border border-white/10 focus:outline-none focus:border-[#1DB954] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { key: 'All', label: `Semua Lagu (${allMusic.length})` },
            { key: 'Maqamat', label: '10 Maqamat Al-Farabi' },
            { key: 'Songs', label: 'Lagu Pilihan' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Auto Upload Notice Banner */}
        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs text-[#B3B3B3]">
          <div className="flex items-center gap-2.5">
            <FolderCheck className="w-4 h-4 text-[#1DB954] shrink-0" />
            <span>
              <strong>Auto-Sinkronisasi:</strong> File audio yang disimpan di folder <code className="text-[#1DB954]">src/assets/music/</code> langsung terbaca otomatis pada tabel di bawah.
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/50 hidden md:inline">
            Dukungan Format: MP3 (Stereo / Widescreen Audio)
          </span>
        </div>
      </div>

      {/* Music Playlist Table */}
      <div className="px-6 md:px-8 pb-24 flex-1">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono text-[#A7A7A7] uppercase tracking-wider">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3">Judul Musik</th>
                <th className="py-3 px-3 hidden md:table-cell">Kategori / Fungsi Jiwa</th>
                <th className="py-3 px-3 text-center w-28">Status</th>
                <th className="py-3 px-3 text-right w-20">Putar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMusic.map((item, index) => {
                const isPlaying = isCurrentItemPlaying(item);
                const isLiked = likedMap[item.id] || false;

                return (
                  <tr
                    key={item.id}
                    onClick={() => handlePlayItem(item)}
                    className={`group hover:bg-white/10 transition-colors cursor-pointer ${
                      isPlaying ? 'bg-white/10 text-[#1DB954]' : 'text-white'
                    }`}
                  >
                    {/* # Index / Equalizer Icon */}
                    <td className="py-3 px-3 text-center font-mono">
                      {isPlaying ? (
                        <Volume2 className="w-4 h-4 text-[#1DB954] mx-auto animate-pulse" />
                      ) : (
                        <span className="text-[#A7A7A7] group-hover:hidden">
                          {index + 1}
                        </span>
                      )}
                      <Play className="w-3.5 h-3.5 text-white hidden group-hover:block mx-auto fill-current" />
                    </td>

                    {/* Title & Description */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center shrink-0 shadow">
                          <Disc className={`w-5 h-5 ${isPlaying ? 'text-[#1DB954] animate-spin' : 'text-white/60'}`} style={{ animationDuration: '4s' }} />
                        </div>
                        <div className="min-w-0">
                          <p className={`font-bold truncate text-sm ${isPlaying ? 'text-[#1DB954]' : 'text-white'}`}>
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[#A7A7A7] truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 hidden md:table-cell text-[#B3B3B3]">
                      <span className="truncate block max-w-xs">
                        {item.category}
                      </span>
                      {item.isUploadedMp3 && (
                        <span className="text-[10px] font-mono text-white/40 block">
                          Berkas: {item.filename}
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase text-[#1DB954] bg-[#1DB954]/20 border border-[#1DB954]/40 px-2 py-0.5 rounded-full">
                        <span>MP3 Asli</span>
                      </span>
                    </td>

                    {/* Actions: Heart + Play Button */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleLike(item.id)}
                          className={`p-1.5 transition-colors ${
                            isLiked ? 'text-[#1DB954]' : 'text-white/30 hover:text-white'
                          }`}
                          title="Sukai Lagu"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => handlePlayItem(item)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
                            isPlaying
                              ? 'bg-[#1DB954] text-black shadow-md'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                          title={isPlaying ? "Jeda" : "Putar"}
                        >
                          {isPlaying ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
