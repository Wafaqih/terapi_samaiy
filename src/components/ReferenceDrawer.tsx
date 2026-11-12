import React from 'react';
import { X, ExternalLink, BookOpen, FileText, CheckCircle2, Award } from 'lucide-react';
import { REFERENCES_DATABASE } from '../data/references';
import { SlideData } from '../types/presentation';

interface ReferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: SlideData;
}

export const ReferenceDrawer: React.FC<ReferenceDrawerProps> = ({
  isOpen,
  onClose,
  currentSlide
}) => {
  if (!isOpen) return null;

  const activeRefs = currentSlide.primaryReferences
    .map(refId => REFERENCES_DATABASE[refId])
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-xl h-full bg-[#121212] border-l border-white/10 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B3B3B3] font-semibold">
                Katalog Referensi Ilmiah
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                Track {currentSlide.trackNumber}: {currentSlide.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            title="Tutup Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#B3B3B3] leading-relaxed">
            <span className="font-semibold text-white">Catatan Akademik:</span> Seluruh argumen pada slide ini didasarkan pada perbandingan kritis pemikiran tasawuf Imam Al-Ghazali (Iḥyā’ ‘Ulūm al-Dīn) dan teori musik klasik Imam Al-Farabi (Kitāb al-Mūsīqā al-Kabīr & CMES 2019).
          </div>

          <div className="space-y-6">
            {activeRefs.map((ref, idx) => (
              <div 
                key={ref.id || idx}
                className="p-5 rounded-xl bg-[#181818] hover:bg-[#202020] border border-white/10 transition-all space-y-4"
              >
                {/* Header Tag */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded-full mb-1">
                      {ref.year} · Peer-Reviewed Literature
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {ref.title}
                    </h4>
                  </div>
                  <FileText className="w-5 h-5 text-[#B3B3B3] shrink-0 mt-1" />
                </div>

                {/* Metadata */}
                <div className="text-xs space-y-1 text-[#B3B3B3] border-b border-white/10 pb-3">
                  <p><span className="text-white/60">Penulis:</span> <strong className="text-white font-medium">{ref.authors}</strong></p>
                  <p><span className="text-white/60">Jurnal / Penerbit:</span> {ref.journal} ({ref.volumeInfo})</p>
                  {ref.doiOrUrl && (
                    <p className="flex items-center gap-1.5 text-[#1DB954] hover:underline cursor-pointer">
                      <ExternalLink className="w-3 h-3" />
                      <span>{ref.doiOrUrl}</span>
                    </p>
                  )}
                </div>

                {/* Methodology */}
                {ref.methodology && (
                  <div className="text-xs space-y-1 bg-black/30 p-3 rounded-lg border border-white/5">
                    <span className="text-[11px] font-semibold text-white uppercase tracking-wider">Metodologi & Desain:</span>
                    <p className="text-[#B3B3B3] leading-relaxed">{ref.methodology}</p>
                  </div>
                )}

                {/* Key Findings */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#1DB954]" /> Temuan & Poin Kunci:
                  </span>
                  <ul className="space-y-1.5">
                    {ref.keyFindings.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#B3B3B3] flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1DB954] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slide Relevance */}
                <div className="pt-2 border-t border-white/5 text-[11px] text-[#A7A7A7]">
                  <strong className="text-white">Relevansi Slide:</strong> {ref.relevanceToSlide}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Library Reference Notice */}
          <div className="p-4 rounded-xl bg-[#161616] border border-white/5 text-xs text-[#8E8E8E] space-y-2">
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider">Rujukan Utama Terintegrasi:</h5>
            <p>1. Imam Abu Hamid Muhammad Al-Ghazali — Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)</p>
            <p>2. Abu Nasr Al-Farabi — Kitāb al-Mūsīqā al-Kabīr (Manuskrip Klasik Teori Musik & Akustik Islam)</p>
            <p>3. Ro Hani & Suryo Ediyono (2019) — Terapi Musik Menurut Al-Farabi pada Masa Dinasti Abbasiyah (Jurnal CMES)</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#181818] flex items-center justify-between">
          <span className="text-xs text-[#B3B3B3]">
            {activeRefs.length} Sumber Ilmiah Terverifikasi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Selesai Meninjau
          </button>
        </div>
      </div>
    </div>
  );
};
