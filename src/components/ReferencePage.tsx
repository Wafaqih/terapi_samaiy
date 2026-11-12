import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, ExternalLink, ArrowRight } from 'lucide-react';
import { REFERENCES_DATABASE } from '../data/references';
import { SLIDES_DATA } from '../data/slidesData';

interface ReferencePageProps {
  onGoHome: () => void;
  onSelectSlide: (slideIndex: number) => void;
}

export const ReferencePage: React.FC<ReferencePageProps> = ({
  onGoHome,
  onSelectSlide
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const referenceList = Object.values(REFERENCES_DATABASE);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Find all slides that reference this item
  const getIntegratedSlides = (refId: string) => {
    return SLIDES_DATA.map((slide, index) => ({ slide, index })).filter(({ slide }) =>
      slide.primaryReferences?.includes(refId)
    );
  };

  return (
    <div className="w-full h-full bg-[#121212] text-white flex flex-col overflow-hidden select-none font-sans">
      {/* Top Header with a single back navigation */}
      <header className="h-14 px-6 border-b border-white/5 bg-black/40 flex items-center shrink-0">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 text-sm text-[#B3B3B3] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Daftar Pustaka & Referensi
          </h1>
          <p className="text-sm text-[#A7A7A7] mt-1">
            Ketuk salah satu referensi untuk melihat detail dan keterhubungannya dengan slide materi.
          </p>
        </div>

        {/* References List */}
        <div className="space-y-3">
          {referenceList.map((ref, index) => {
            const isExpanded = expandedId === ref.id;
            const integratedSlides = getIntegratedSlides(ref.id);

            return (
              <div
                key={ref.id}
                className="bg-[#181818] border border-white/5 rounded-xl overflow-hidden transition-colors"
              >
                {/* Header Row (Tappable) */}
                <button
                  onClick={() => toggleExpand(ref.id)}
                  className="w-full p-4 md:p-5 flex items-start gap-4 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm font-mono text-[#1DB954] font-bold shrink-0 pt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0 pr-2">
                    <h2 className="text-sm md:text-base font-bold text-white leading-snug">
                      {ref.title}
                    </h2>
                    <p className="text-xs text-[#A7A7A7] mt-1">
                      {ref.authors} ({ref.year}) · {ref.journal}
                    </p>
                  </div>

                  <div className="text-white/40 shrink-0 pt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#1DB954]" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-xs text-[#CCCCCC] bg-black/20">
                    {/* Publication details */}
                    <div className="space-y-1">
                      <p><span className="text-white/50">Volume/Keterangan:</span> {ref.volumeInfo}</p>
                      {ref.doiOrUrl && (
                        <p className="flex items-center gap-1.5 text-[#1DB954]">
                          <span className="text-white/50">Sumber/DOI:</span>
                          <span>{ref.doiOrUrl}</span>
                        </p>
                      )}
                      {ref.methodology && (
                        <p className="pt-1 leading-relaxed">
                          <span className="text-white/50">Metodologi:</span> {ref.methodology}
                        </p>
                      )}
                    </div>

                    {/* Key Findings */}
                    {ref.keyFindings && ref.keyFindings.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                          Temuan Utama
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-white/80 leading-relaxed pl-1">
                          {ref.keyFindings.map((finding, idx) => (
                            <li key={idx}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Integrated Slides Section */}
                    <div className="pt-3 border-t border-white/5">
                      <span className="text-[11px] font-bold text-[#1DB954] uppercase tracking-wider block mb-2">
                        Terintegrasi dengan Slide ({integratedSlides.length} Slide):
                      </span>

                      {integratedSlides.length === 0 ? (
                        <p className="text-white/40 italic">Tidak ada slide yang terhubung langsung.</p>
                      ) : (
                        <div className="space-y-1.5">
                          {integratedSlides.map(({ slide, index: sIndex }) => (
                            <button
                              key={slide.id}
                              onClick={() => onSelectSlide(sIndex)}
                              className="w-full p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-left flex items-center justify-between group transition-colors"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <span className="font-mono text-[11px] text-[#1DB954] font-semibold shrink-0">
                                  Track {slide.trackNumber}
                                </span>
                                <span className="text-xs text-white truncate font-medium">
                                  {slide.title}
                                </span>
                              </div>
                              <span className="text-[11px] text-white/40 group-hover:text-white flex items-center gap-1 shrink-0">
                                Buka slide <ArrowRight className="w-3 h-3" />
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
