import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, CheckCircle2, Loader2, X, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';
import { SlideData } from '../types/presentation';
import { SlideContent } from './SlideContent';
import { TEAM_MEMBERS } from './GroupInfoModal';
import spotsufyLogo from '../assets/images/logo_spotsufy.png';
import albumCover from '../assets/images/spotsufy_album_cover_1792247862583.jpg';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  isOpen,
  onClose,
  slides
}) => {
  const [status, setStatus] = useState<'idle' | 'rendering' | 'completed' | 'error'>('idle');
  const [currentPage, setCurrentPage] = useState<number>(0); // 0 = Beranda, 1..19 = Slides
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const stageRef = useRef<HTMLDivElement | null>(null);
  const totalPages = slides.length + 1; // 1 Cover + slides.length

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setProgress(0);
      setCurrentPage(0);
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleStartExport = async () => {
    if (!stageRef.current) return;
    setStatus('rendering');
    setProgress(5);
    setErrorMessage('');

    try {
      // 16:9 Landscape PDF (1280 x 720 points)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [1280, 720]
      });

      // Loop through all pages: Page 0 (Cover/Beranda) + Pages 1..N (Slides)
      for (let i = 0; i < totalPages; i++) {
        setCurrentPage(i);
        // Allow React to re-render the stage container for the new page
        await new Promise(r => setTimeout(r, 120));

        if (!stageRef.current) continue;

        // Ensure all images are loaded and decoded
        const imgs = stageRef.current.querySelectorAll('img');
        await Promise.all(
          Array.from(imgs).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(res => {
              img.onload = res;
              img.onerror = res;
            });
          })
        );

        // Capture high-res 16:9 canvas using native browser rendering (supports oklab/oklch colors)
        const imgData = await toJpeg(stageRef.current, {
          quality: 0.90,
          pixelRatio: 1.5,
          backgroundColor: '#121212',
          skipFonts: true,
          canvasWidth: 1280,
          canvasHeight: 720
        });

        if (i > 0) {
          pdf.addPage([1280, 720], 'landscape');
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 1280, 720, undefined, 'FAST');

        const currentProgress = Math.round(((i + 1) / totalPages) * 100);
        setProgress(currentProgress);
      }

      // Download the generated PDF
      pdf.save('Spotsufy_Materi_Presentasi_Terapi_Samaiy.pdf');
      setStatus('completed');
    } catch (err: unknown) {
      console.error('PDF Export Error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Gagal menghasilkan PDF');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-md bg-[#181818] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/30 flex items-center justify-center text-[#1DB954]">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Export PDF</h3>
              <p className="text-[11px] text-[#A7A7A7]">Halaman Beranda & Seluruh Slide (16:9)</p>
            </div>
          </div>
          {status !== 'rendering' && (
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white p-1 rounded-md transition-colors"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content Body */}
        {status === 'idle' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/90">
                <span className="text-[#A7A7A7]">Dokumen:</span>
                <span className="font-semibold text-white">Materi Terapi Sama'iy</span>
              </div>
              <div className="flex items-center justify-between text-white/90">
                <span className="text-[#A7A7A7]">Isi Berkas:</span>
                <span className="font-semibold text-[#1DB954]">1 Cover Beranda + {slides.length} Slide</span>
              </div>
              <div className="flex items-center justify-between text-white/90">
                <span className="text-[#A7A7A7]">Format Aspek:</span>
                <span className="font-mono text-white/80">16:9 Widescreen Landscape</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/70 hover:text-white transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleStartExport}
                className="px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold transition-all shadow-lg shadow-[#1DB954]/25 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Sekarang</span>
              </button>
            </div>
          </div>
        )}

        {status === 'rendering' && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-[#1DB954] animate-spin" />
                  {currentPage === 0
                    ? 'Memproses Halaman Beranda (Cover)...'
                    : `Memproses Slide ${currentPage} dari ${slides.length}...`}
                </span>
                <span className="font-mono font-bold text-[#1DB954]">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1DB954] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-[#A7A7A7] text-center">
              Mohon tunggu sebentar, berkas PDF sedang dirakit dalam resolusi 16:9...
            </p>
          </div>
        )}

        {status === 'completed' && (
          <div className="space-y-4 py-1 text-center">
            <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">PDF Berhasil Dibuat!</h4>
              <p className="text-xs text-[#A7A7A7] mt-1">
                Berkas telah otomatis diunduh ke perangkat Anda.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
                title="Buka dialog cetak browser jika ingin simpan via browser"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Browser</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold transition-all"
              >
                Selesai
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4 py-1">
            <p className="text-xs text-red-400">
              Terjadi kendala saat merender PDF: {errorMessage || 'Koneksi kanvas terputus'}.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white"
              >
                Gunakan Cetak Browser
              </button>
              <button
                onClick={handleStartExport}
                className="px-4 py-2 rounded-full bg-[#1DB954] text-black text-xs font-bold"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 
        OFF-SCREEN 16:9 CAPTURE STAGE (1280px x 720px)
        Fixed dimensions ensure pixel-perfect rendering for PDF pages 
      */}
      <div 
        className="fixed top-0 left-0 pointer-events-none -z-50 overflow-hidden"
        style={{ width: '1280px', height: '720px' }}
      >
        <div
          ref={stageRef}
          style={{ width: '1280px', height: '720px' }}
          className="bg-[#121212] text-white flex flex-col justify-between overflow-hidden"
        >
          {currentPage === 0 ? (
            /* ========================================================
               PAGE 0: HALAMAN BERANDA / COVER PRESENTASI
               ======================================================== */
            <div className="w-full h-full p-12 bg-gradient-to-br from-[#181818] via-[#121212] to-black flex flex-col justify-between relative border border-white/10">
              {/* Background ambient glow */}
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1DB954]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg bg-black">
                    <img src={spotsufyLogo} alt="Spotsufy" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-lg font-black tracking-tight text-[#1DB954]">Spotsufy</span>
                    <span className="text-xs text-white/60 ml-2 font-mono">Academic Edition</span>
                  </div>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white/90">
                  PLAYLIST PRESENTASI · 16:9
                </div>
              </div>

              {/* Main Center Split */}
              <div className="grid grid-cols-12 gap-10 items-center my-auto z-10">
                <div className="col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#1DB954] block">
                      Kajian Pemikiran Tasawuf & Teori Musik Klasik
                    </span>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase leading-tight">
                      TERAPI SAMA’IY<br />
                      IMAM AL-GHAZALI DAN<br />
                      IMAM AL-FARABI
                    </h1>
                  </div>

                  <p className="text-sm text-[#B3B3B3] leading-relaxed">
                    Eksplorasi komparatif antara Kitāb Ādāb al-Samā‘ wa al-Wajd dan Kitāb al-Mūsīqā al-Kabīr.
                  </p>

                  {/* Kelompok 8 Members */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 max-w-lg">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DB954] block">
                      Disusun Oleh Kelompok 8:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {TEAM_MEMBERS.map((m) => (
                        <div key={m.no} className="text-xs">
                          <p className="font-semibold text-white truncate">{m.name}</p>
                          <p className="text-[10px] font-mono text-[#A7A7A7]">{m.nim}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Album Artwork */}
                <div className="col-span-5 flex justify-center">
                  <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black relative">
                    <img 
                      src={albumCover} 
                      alt="Cover Album" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[11px] font-semibold text-white/90">
                      5 Slide Akademik · Al-Ghazali & Al-Farabi
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between text-xs text-[#727272] border-t border-white/10 pt-3 z-10">
                <span>Spotsufy Special Edition © 2026 · Kelompok 8 Tasawuf Psikoterapi</span>
                <span className="text-white/60">Total {slides.length} Slide Materi Interaktif</span>
              </div>
            </div>
          ) : (
            /* ========================================================
               PAGES 1..N: SLIDES PRESENTASI
               ======================================================== */
            <div className="w-full h-full bg-[#121212] p-8 flex flex-col justify-between overflow-hidden">
              <SlideContent
                slide={slides[currentPage - 1]}
                isPlayingAudio={false}
                activeAudioTrack="none"
                onPlayTrack={() => {}}
                onOpenReferences={() => {}}
                isLiked={false}
                onToggleLike={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
