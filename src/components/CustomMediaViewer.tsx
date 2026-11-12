import React, { useState } from 'react';
import { 
  Image as ImageIcon, FileText, Maximize2, Minimize2, ExternalLink, 
  RefreshCw, AlertCircle, Eye, EyeOff, Sparkles, Layers 
} from 'lucide-react';
import { CustomSlideMedia, SlideData } from '../types/presentation';
import { resolveMediaUrl } from '../data/customSlideMedia';

interface CustomMediaViewerProps {
  media: CustomSlideMedia;
  slide: SlideData;
  onToggleViewOriginal?: () => void;
  showingOriginal?: boolean;
}

export const CustomMediaViewer: React.FC<CustomMediaViewerProps> = ({
  media,
  slide,
  onToggleViewOriginal,
  showingOriginal = false
}) => {
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isCover, setIsCover] = useState<boolean>(media.fit === 'cover');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const resolvedUrl = resolveMediaUrl(media.src);
  const fileName = media.src.split('/').pop() || media.src;

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#151515] border border-dashed border-white/20 rounded-xl relative overflow-hidden select-text">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Menunggu Berkas Media: <span className="font-mono text-[#1DB954]">{fileName}</span>
        </h3>
        <p className="text-xs text-[#B3B3B3] max-w-lg mb-4 leading-relaxed">
          Slide <span className="font-bold text-white">Track {slide.trackNumber}</span> telah ditautkan ke <span className="font-mono text-white/90">{media.src}</span>. 
          Pastikan berkas gambar atau PDF telah disimpan di folder <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#1DB954]">src/assets/slides/</code>.
        </p>

        <div className="p-3 bg-black/40 border border-white/10 rounded-xl max-w-md text-left text-xs space-y-1 mb-5">
          <div className="flex items-center justify-between text-[#8E8E8E] text-[11px] pb-1 border-b border-white/5">
            <span>Rekomendasi Spesifikasi Canvas:</span>
            <span className="text-[#1DB954] font-bold">16:9 Widescreen</span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Resolusi Optimal:</span>
            <span className="font-mono font-semibold">1920 × 1080 px</span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Format:</span>
            <span>PNG, JPG, WebP, atau PDF</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLoadError(false)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded-full transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Coba Muat Ulang
          </button>

          {onToggleViewOriginal && (
            <button
              onClick={onToggleViewOriginal}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-xs font-bold text-black rounded-full transition-transform active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              Tampilkan Slide Interaktif Asli
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black group">
      {media.type === 'image' ? (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <img
            src={resolvedUrl}
            alt={media.alt || slide.title}
            onError={() => setLoadError(true)}
            className={`max-w-full max-h-full transition-all duration-300 ${
              isCover ? 'w-full h-full object-cover' : 'object-contain'
            } ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-default'}`}
            onClick={() => setIsZoomed(prev => !prev)}
            referrerPolicy="no-referrer"
          />

          {/* Quick Floating Controls (Bottom-Right Subtle Toolbar) */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-full z-20">
            <button
              onClick={() => setIsCover(prev => !prev)}
              className="text-[10px] font-semibold text-white/80 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
              title={isCover ? 'Ganti ke Fit Penuh (Contain)' : 'Ganti ke Tutup Layar (Cover)'}
            >
              {isCover ? 'Fit Asli' : 'Penuhi Canvas'}
            </button>

            <div className="w-[1px] h-3 bg-white/20" />

            {onToggleViewOriginal && (
              <button
                onClick={onToggleViewOriginal}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-[#1DB954] hover:text-[#1ed760] px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
                title="Beralih ke tampilan interaktif default"
              >
                <Layers className="w-3 h-3" />
                <span>Slide Asli</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* PDF Document Viewer */
        <div className="w-full h-full flex flex-col relative bg-[#181818] rounded-xl overflow-hidden">
          <div className="h-9 bg-[#121212] border-b border-white/10 px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span className="font-mono text-[11px] truncate">{fileName}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={resolvedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] text-[#1DB954] hover:underline"
                title="Buka PDF di tab baru"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Buka PDF</span>
              </a>

              {onToggleViewOriginal && (
                <button
                  onClick={onToggleViewOriginal}
                  className="text-[11px] text-white/70 hover:text-white px-2 py-0.5 rounded hover:bg-white/10"
                >
                  Lihat Slide Default
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 w-full h-full bg-[#202020]">
            <object
              data={resolvedUrl}
              type="application/pdf"
              className="w-full h-full"
              onError={() => setLoadError(true)}
            >
              <iframe
                src={resolvedUrl}
                title={slide.title}
                className="w-full h-full border-0"
              />
            </object>
          </div>
        </div>
      )}
    </div>
  );
};
