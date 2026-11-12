import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Flame, Droplets, Gem, Heart, Music,
  ArrowRight, ShieldAlert, CheckCircle2, Waves, Activity,
  Layers, Volume2, UserCheck, Compass, Info, Feather
} from 'lucide-react';
import { SlideData, AudioTrackType } from '../types/presentation';
import ghazaliFarabiHeroImg from '../assets/images/ghazali_farabi_manuscript_1794465711425.jpg';
import ghazaliSparkHeartImg from '../assets/images/ghazali_spark_heart_1794465736470.jpg';

interface SlideContentProps {
  slide: SlideData;
  isPlayingAudio: boolean;
  activeAudioTrack: AudioTrackType;
  onPlayTrack: (track: AudioTrackType) => void;
  onOpenReferences: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
  onSelectSlide?: (index: number) => void;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  isPlayingAudio,
  activeAudioTrack,
  onPlayTrack,
  onOpenReferences
}) => {
  // State for Slide 2 interactive detail
  const [activeElementS2, setActiveElementS2] = useState<'sama' | 'qalb' | 'wajd' | 'bina'>('sama');
  // State for Slide 5 active influence category
  const [activeInfluenceS5, setActiveInfluenceS5] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // SLIDE 1: VISUAL PEMBUKA (PENGANTAR, KEDUA TOKOH, & PENDENGARAN MENUJU JIWA)
  // ---------------------------------------------------------------------------
  if (slide.id === 1) {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
        {/* Header Title Section */}
        <div className="border-b border-white/10 pb-3 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-0.5 rounded-full">
                Slide 01 · Presentasi Akademik
              </span>
              <span className="text-xs text-white/50">Iḥyā’ ‘Ulūm al-Dīn & Kitāb al-Mūsīqā al-Kabīr</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              TERAPI SAMĀ‘IY: Ketika Pendengaran Menjadi Jalan Menuju Jiwa
            </h1>
            <p className="text-sm md:text-base text-amber-200/90 font-medium mt-0.5">
              Perspektif Pemikiran Imam Al-Ghazali dan Imam Al-Farabi
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <span className="text-xs font-mono text-white/40 block">TEMA UTAMA</span>
            <span className="text-xs text-[#E0E0E0] max-w-xs block leading-snug">
              Pendengaran, musik, hati, dan pembinaan jiwa dalam Islam klasik.
            </span>
          </div>
        </div>

        {/* Main Split Layout: Left Info & Arguments vs Right Historical Illustration */}
        <div className="grid grid-cols-12 gap-6 my-auto items-center flex-1 py-3">
          {/* Left Column: Pengantar & Landasan Pemikiran */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            {/* Pertanyaan Pengantar Reflektif */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#181818] to-transparent border-l-4 border-amber-400 border-y border-r border-white/5">
              <p className="text-sm md:text-base text-white/95 italic leading-relaxed">
                “Pernahkah sebuah lantunan membuat seseorang tiba-tiba merasa tenang, sedih, bahagia, terharu, atau bahkan merasakan kerinduan spiritual?”
              </p>
              <p className="text-xs text-[#B3B3B3] mt-2 leading-relaxed">
                Suara bukan sekadar gelombang akustik yang diterima indera telinga. Dalam pemikiran Islam klasik, suara dan musik merupakan objek kajian mendalam yang berkaitan erat dengan keadaan hati dan jiwa manusia.
              </p>
            </div>

            {/* Dua Tokoh & Karakteristik Kajian */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              {/* Tokoh 1: Imam Al-Ghazali */}
              <div className="p-3.5 rounded-xl bg-[#181818] border border-amber-500/25 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">1. Imam Abu Hamid Al-Ghazali</span>
                  <span className="text-[10px] font-mono text-white/40">1058–1111 M</span>
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  Mengkaji bagaimana aktivitas mendengar (<strong className="text-white">Samā‘</strong>) membangkitkan getaran pengalaman batin (<strong className="text-amber-300">Wajd</strong>) dan penyingkapan hati.
                </p>
                <div className="text-[11px] font-mono text-amber-200/70 border-t border-white/5 pt-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Iḥyā’ ‘Ulūm al-Dīn</span>
                </div>
              </div>

              {/* Tokoh 2: Imam Al-Farabi */}
              <div className="p-3.5 rounded-xl bg-[#181818] border border-cyan-500/25 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">2. Abu Nashr Al-Farabi</span>
                  <span className="text-[10px] font-mono text-white/40">872–950 M</span>
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  Mengembangkan kajian musik filosofis-ilmiah: hakikat suara, interval nada teratur, ritme, susunan lagu, dan pengaruhnya pada jiwa.
                </p>
                <div className="text-[11px] font-mono text-cyan-200/70 border-t border-white/5 pt-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Kitāb al-Mūsīqā al-Kabīr</span>
                </div>
              </div>
            </div>

            {/* Pesan Utama Slide 1 */}
            <div className="p-3 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1DB954] text-black flex items-center justify-center shrink-0 font-bold text-xs">
                ★
              </div>
              <p className="text-xs md:text-sm text-white font-medium leading-relaxed">
                <strong>Pesan Utama:</strong> Pendengaran dapat menjadi jalan terstruktur untuk menyentuh, menggerakkan, dan membina keadaan batin manusia.
              </p>
            </div>
          </div>

          {/* Right Column: Historical Illustration Artwork */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group aspect-[16/10]">
              <img 
                src={ghazaliFarabiHeroImg} 
                alt="Imam Al-Ghazali dan Imam Al-Farabi dengan Manuskrip Klasik" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-amber-300 drop-shadow flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Representasi Historis Kedua Tokoh & Manuskrip Klasik Islam
                </span>
                <p className="text-[11px] text-white/80 leading-snug mt-1">
                  Menelaah keterhubungan akustik suara, kesucian kalbu, dan keselarasan jiwa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Academic Footnote */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <span>Sumber Primer: Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd) & Kitāb al-Mūsīqā al-Kabīr</span>
          <span className="text-emerald-400 font-mono">Presentasi Akademik Perguruan Tinggi</span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SLIDE 2: DIAGRAM KONSEPTUAL SAMĀ‘, QALB, DAN WAJD
  // ---------------------------------------------------------------------------
  if (slide.id === 2) {
    const elementsData = [
      {
        id: 'sama',
        step: '01',
        title: 'SAMĀ‘',
        arabic: 'السَّمَاعُ',
        role: 'Pintu Masuk (Madkhal)',
        desc: 'Aktivitas mendengar atau menyimak suara, nada, dan lantunan. Samā‘ bukan sekadar proses fisik organ telinga menerima gelombang getaran, melainkan keterbukaan indera menyerap keindahan dan makna.',
        highlight: 'Berfungsi sebagai gerbang persepsi pertama yang mengantarkan bunyi menuju kedalaman batin.'
      },
      {
        id: 'qalb',
        step: '02',
        title: 'QALB',
        arabic: 'الْقَلْبُ',
        role: 'Tempat Respons Batin (Maqarr)',
        desc: 'Hati sebagai pusat kesadaran, tempat terhimpunnya berbagai rahasia, watak, dan kecenderungan manusia. Hati merespons karakter bunyi yang masuk melalui kecocokan fitriah.',
        highlight: 'Tempat bertemunya getaran nada dengan isi batin yang sebelumnya tersimpan atau tertidur.'
      },
      {
        id: 'wajd',
        step: '03',
        title: 'WAJD',
        arabic: 'الْوَجْدُ',
        role: 'Pengalaman Batin (Atsar Ruhi)',
        desc: 'Keadaan atau pengalaman batin yang muncul sebagai buah dari Samā‘. Berupa getaran rasa haru, keinsyafan, kerinduan spiritual, atau perubahan keadaan hati (aḥwāl).',
        highlight: 'Bukan emosi liar tanpa kendali, melainkan getaran murni yang dialami jiwa yang sadar.'
      },
      {
        id: 'bina',
        step: '04',
        title: 'PEMBINAAN JIWA',
        arabic: 'تَهْذِيبُ النَّفْسِ',
        role: 'Tujuan Akhir (Ghayah)',
        desc: 'Pemanfaatan terarah dari pengalaman batin untuk menata moral, mengikis kelalaian, menumbuhkan ketenangan, serta mendekatkan diri kepada Allah SWT.',
        highlight: 'Mengubah getaran rasa sesaat menjadi komitmen perbaikan akhlak dan kejernihan batin.'
      }
    ];

    const currentElem = elementsData.find(e => e.id === activeElementS2) || elementsData[0];

    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 pb-3 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-0.5 rounded-full">
                Slide 02 · Definisi & Kerangka
              </span>
              <span className="text-xs text-white/50">Konseptualisasi Pendengaran Batin</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              APA ITU TERAPI SAMĀ‘IY?
            </h2>
            <p className="text-sm md:text-base text-[#D1D5DB] font-medium mt-0.5">
              Memahami Pendengaran sebagai Jalan Menuju Pengalaman Batin
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl">
            <Info className="w-4 h-4 shrink-0" />
            <span>Kerangka Konseptual Pemikiran Klasik</span>
          </div>
        </div>

        {/* Conceptual Flowchart Diagram: SAMĀ‘ ➔ QALB ➔ WAJD ➔ PEMBINAAN JIWA */}
        <div className="py-2">
          <div className="text-xs font-mono font-semibold text-white/50 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>Alur Konseptual Hubungan Transformasi:</span>
            <span className="text-[#1DB954]">Klik tahapan untuk menelaah detail</span>
          </div>

          <div className="grid grid-cols-4 gap-3 relative">
            {elementsData.map((elem, idx) => {
              const isActive = activeElementS2 === elem.id;
              return (
                <div
                  key={elem.id}
                  onClick={() => setActiveElementS2(elem.id as any)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isActive 
                      ? 'bg-gradient-to-b from-[#1DB954]/20 to-[#181818] border-[#1DB954] shadow-lg shadow-[#1DB954]/15' 
                      : 'bg-[#181818] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-[#1DB954] text-black' : 'bg-white/10 text-white/70'
                    }`}>
                      Tahap {elem.step}
                    </span>
                    <span className="text-base md:text-lg font-arabic text-amber-300" dir="rtl" lang="ar">
                      {elem.arabic}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-sm md:text-base font-extrabold tracking-tight ${isActive ? 'text-[#1DB954]' : 'text-white'}`}>
                      {elem.title}
                    </h3>
                    <p className="text-[11px] text-white/60 font-medium truncate mt-0.5">
                      {elem.role}
                    </p>
                  </div>

                  {/* Flow Arrow Indicator for steps 1-3 */}
                  {idx < 3 && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-4 h-4 rounded-full bg-[#121212] border border-white/20 items-center justify-center text-white/60">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Explanation Container */}
        <div className="grid grid-cols-12 gap-5 my-auto items-stretch">
          {/* Active Stage Inspector Box */}
          <div className="col-span-12 lg:col-span-7 p-4 md:p-5 rounded-2xl bg-[#181818] border border-white/10 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-white">
                    {currentElem.title}
                  </span>
                  <span className="text-lg font-arabic text-amber-300" dir="rtl" lang="ar">
                    {currentElem.arabic}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#1DB954] bg-[#1DB954]/10 px-2.5 py-0.5 rounded-full border border-[#1DB954]/20">
                  {currentElem.role}
                </span>
              </div>

              <p className="text-sm md:text-base text-[#E0E0E0] leading-relaxed">
                {currentElem.desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs md:text-sm text-amber-200/90 leading-relaxed">
              <strong className="text-white">Peran Kritis: </strong>
              {currentElem.highlight}
            </div>
          </div>

          {/* Pengertian Terapi Samā‘iy & Catatan Batas Akademik */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between space-y-3">
            {/* Pengertian Konseptual */}
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1DB954] block">
                Hakikat Terapi Samā‘iy
              </span>
              <p className="text-xs md:text-sm text-[#D1D5DB] leading-relaxed">
                Terapi Samā‘iy dalam presentasi ini merupakan istilah konseptual untuk menjelaskan <strong>pemanfaatan aktivitas mendengar, suara, dan lantunan</strong> sebagai sarana pembinaan serta pengarahan keadaan jiwa.
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                Bukan sekadar hiburan indrawi, melainkan metode untuk membangkitkan, mengolah, dan mengarahkan batin menuju kondisi yang lebih mulia dan tenang.
              </p>
            </div>

            {/* Academic Boundary Note */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/95 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Peringatan Metodologis Akademik</span>
              </div>
              <p className="leading-relaxed text-[11px] md:text-xs">
                {slide.academicNote}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <span>Formula Inti: Samā‘ (Pintu Masuk) ➔ Qalb (Tempat Respons) ➔ Wajd (Pengalaman Batin) ➔ Pembinaan Jiwa</span>
          <span className="text-[#1DB954] font-semibold">{slide.mainMessage}</span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SLIDE 3: DUA KOLOM PERBANDINGAN AL-GHAZALI DAN AL-FARABI
  // ---------------------------------------------------------------------------
  if (slide.id === 3) {
    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 pb-3 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-0.5 rounded-full">
                Slide 03 · Komparasi Keilmuan
              </span>
              <span className="text-xs text-white/50">Dua Pendekatan yang Saling Melengkapi</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              DUA TOKOH, DUA SUDUT PANDANG
            </h2>
            <p className="text-sm md:text-base text-[#D1D5DB] font-medium mt-0.5">
              Imam Al-Ghazali dan Imam Al-Farabi dalam Kajian Pendengaran, Musik, dan Jiwa
            </p>
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-white/70 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            Karakteristik & Metodologi Berbeda
          </span>
        </div>

        {/* Two Balanced Columns Comparison */}
        <div className="grid grid-cols-12 gap-5 my-auto items-stretch flex-1 py-3">
          {/* Kolom Kiri: IMAM AL-GHAZALI */}
          <div className="col-span-12 lg:col-span-6 p-4 md:p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-[#181818] to-[#141414] border border-amber-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-extrabold text-amber-300 leading-none">
                      IMAM AL-GHAZALI
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">1058–1111 M</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-200 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Tasawuf & Pembinaan Batin
                </span>
              </div>

              <p className="text-xs md:text-sm text-[#E0E0E0] leading-relaxed">
                Membahas Samā‘ sebagai <strong>aktivitas mendengar yang dapat menggerakkan hati</strong> dan menghasilkan pengalaman batin yang disebut <strong>Wajd</strong>.
              </p>

              {/* Pokok Pemikiran Al-Ghazali */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300/80 block">
                  Pokok Pemikiran:
                </span>
                <ul className="text-xs md:text-sm text-white/90 space-y-1.5 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Hubungan antara pendengaran dan kedalaman hati (qalb).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Samā‘ sebagai pemantik (<em className="text-amber-200">qawādiḥ</em>) keadaan batin yang tersembunyi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Wajd sebagai pengalaman spiritual dan transformasi diri.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Pengaruh keadaan batin terhadap gerak anggota tubuh.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Adab, syarat tempat-waktu, manfaat, dan potensi mudarat.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sumber Primer Al-Ghazali */}
            <div className="p-2.5 rounded-xl bg-black/50 border border-amber-500/20 text-xs flex items-center justify-between">
              <span className="text-white/70">Sumber Primer:</span>
              <span className="font-semibold text-amber-300">Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)</span>
            </div>
          </div>

          {/* Kolom Kanan: IMAM AL-FARABI */}
          <div className="col-span-12 lg:col-span-6 p-4 md:p-5 rounded-2xl bg-gradient-to-b from-cyan-500/10 via-[#181818] to-[#141414] border border-cyan-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
                    F
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-extrabold text-cyan-300 leading-none">
                      IMAM AL-FARABI
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">872–950 M</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-cyan-200 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  Filsafat & Ilmu Musik
                </span>
              </div>

              <p className="text-xs md:text-sm text-[#E0E0E0] leading-relaxed">
                Mengembangkan kajian musik secara <strong>sistematis dan matematis</strong> melalui pembahasan hakikat suara, nada, interval, ritme, dan komposisi musikal.
              </p>

              {/* Pokok Pembahasan Al-Farabi */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300/80 block">
                  Pokok Pembahasan:
                </span>
                <ul className="text-xs md:text-sm text-white/90 space-y-1.5 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Hakikat akustik dan karakteristik fisika bunyi/suara.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Susunan nada (<em className="text-cyan-200">naghamāt</em>) dan hubungan harmoni musikal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Pola ritme (<em className="text-cyan-200">īqā‘</em>) dan arsitektur komposisi lagu (<em className="text-cyan-200">laḥn</em>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Pengalaman musikal objektif dan pengaruhnya terhadap jiwa.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Musik sebagai cabang ilmu pengetahuan ilmiah (matematika).</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sumber Primer Al-Farabi */}
            <div className="p-2.5 rounded-xl bg-black/50 border border-cyan-500/20 text-xs flex items-center justify-between">
              <span className="text-white/70">Sumber Primer:</span>
              <span className="font-semibold text-cyan-300">Kitāb al-Mūsīqā al-Kabīr</span>
            </div>
          </div>
        </div>

        {/* Titik Temu & Sintesis Bagian Bawah */}
        <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1DB954] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#1DB954]" /> Titik Temu & Sintesis Analitis
            </span>
            <span className="text-[11px] text-white/50">Kedua Tokoh Menjawab Pertanyaan Berbeda</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm pt-1">
            <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <strong className="text-amber-300 block mb-0.5">Pertanyaan Imam Al-Ghazali:</strong>
              <p className="text-white/90 leading-snug">
                “Bagaimana suara menggerakkan hati dan menghasilkan pengalaman batin?”
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <strong className="text-cyan-300 block mb-0.5">Pertanyaan Imam Al-Farabi:</strong>
              <p className="text-white/90 leading-snug">
                “Bagaimana suara dan musik tersusun, serta bagaimana karakteristik musikal dapat dipahami?”
              </p>
            </div>
          </div>

          <p className="text-[11px] md:text-xs text-[#A7A7A7] leading-relaxed pt-1">
            <strong>Kesimpulan:</strong> Keduanya menjadi landasan kokoh untuk membangun pemahaman mengenai hubungan antara musik dan pembinaan jiwa. Keduanya memiliki titik temu pada daya pengaruh suara terhadap manusia, namun tidak boleh digambarkan seolah-olah memiliki teori yang identik.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <span>Perbandingan Metodologis Objektif</span>
          <span className="text-amber-400 font-semibold">{slide.mainMessage}</span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SLIDE 4: BAGAIMANA AL-GHAZALI MEMAHAMI SAMĀ‘? (KUTIPAN ARAB & METAFORA KHATIM)
  // ---------------------------------------------------------------------------
  if (slide.id === 4) {
    const quotes = slide.arabicQuotes || [];

    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 pb-3 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-0.5 rounded-full">
                Slide 04 · Teks Primer Al-Ghazali
              </span>
              <span className="text-xs text-amber-300 font-medium">Iḥyā’ ‘Ulūm al-Dīn</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              BAGAIMANA AL-GHAZALI MEMAHAMI SAMĀ‘?
            </h2>
            <p className="text-sm md:text-base text-[#D1D5DB] font-medium mt-0.5">
              Pendengaran sebagai Jalan untuk Menggerakkan Hati
            </p>
          </div>
          <span className="hidden md:inline-block text-xs font-mono text-white/50 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            Kitāb Ādāb al-Samā‘ wa al-Wajd
          </span>
        </div>

        {/* Top Primary Arabic Quotes Box (Central Focal Element as required) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          {/* Kutipan Arab 1: Khazanah Rahasia Batin */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#181818] border border-amber-500/35 shadow-lg flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                Kutipan Arab Sumber Primer 1
              </span>
              <span className="text-[10px] text-white/50">Iḥyā’ ‘Ulūm al-Dīn</span>
            </div>

            {/* Arabic Text (Proper RTL, Amiri Font, Connected Script with Harakat) */}
            <div className="py-1">
              <p 
                className="text-xl md:text-2xl font-arabic text-amber-200 text-right leading-[2.1] dir-rtl select-text" 
                dir="rtl" 
                lang="ar"
              >
                فَإِنَّ الْقُلُوبَ وَالسَّرَائِرَ خَزَائِنُ الْأَسْرَارِ وَمَعَادِنُ الْجَوَاهِرِ
              </p>
            </div>

            {/* Indonesian Translation & Source */}
            <div className="pt-2 border-t border-white/5 space-y-1">
              <p className="text-xs md:text-sm text-white/95 leading-relaxed italic">
                “Sesungguhnya hati dan batin merupakan tempat penyimpanan rahasia dan tambang berbagai permata.”
              </p>
              <p className="text-[10px] font-mono text-white/40">
                Sumber: Imam Al-Ghazali, Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)
              </p>
            </div>
          </div>

          {/* Kutipan Arab 2: Pemantik Pendengaran */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#181818] border border-amber-500/35 shadow-lg flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                Kutipan Arab Sumber Primer 2
              </span>
              <span className="text-[10px] text-white/50">Iḥyā’ ‘Ulūm al-Dīn</span>
            </div>

            {/* Arabic Text (Proper RTL, Amiri Font, Connected Script with Harakat) */}
            <div className="py-1">
              <p 
                className="text-xl md:text-2xl font-arabic text-amber-200 text-right leading-[2.1] dir-rtl select-text" 
                dir="rtl" 
                lang="ar"
              >
                وَلَا سَبِيلَ إِلَى اسْتِثَارَةِ خَفَايَاهَا إِلَّا بِقَوَادِحِ السَّمَاعِ
              </p>
            </div>

            {/* Indonesian Translation & Source */}
            <div className="pt-2 border-t border-white/5 space-y-1">
              <p className="text-xs md:text-sm text-white/95 leading-relaxed italic">
                “Tidak ada jalan untuk membangkitkan rahasia-rahasia yang tersembunyi di dalamnya kecuali melalui pemantik-pemantik pendengaran.”
              </p>
              <p className="text-[10px] font-mono text-white/40">
                Sumber: Imam Al-Ghazali, Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)
              </p>
            </div>
          </div>
        </div>

        {/* Conceptual Explanation: 3 Classical Analogies & Visual Artwork */}
        <div className="grid grid-cols-12 gap-5 my-auto items-stretch flex-1 py-1">
          {/* Left Column: Penjelasan Konseptual 3 Perumpamaan Klasik */}
          <div className="col-span-12 lg:col-span-7 p-4 md:p-5 rounded-2xl bg-[#181818] border border-white/10 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1DB954] block mb-2">
                Penjelasan Konseptual Al-Ghazali (Metafora Klasik):
              </span>

              <div className="grid grid-cols-3 gap-3">
                {/* 1. Api dalam Batu/Besi */}
                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    <span>Api dalam Batu</span>
                  </div>
                  <p className="text-[11px] text-[#D1D5DB] leading-relaxed">
                    Percikan api sudah ada tersimpan dalam batu dan besi, namun tak tampak sebelum dipantik (<em className="text-amber-200">qawādiḥ</em>).
                  </p>
                </div>

                {/* 2. Air Bawah Tanah */}
                <div className="p-3 rounded-xl bg-black/40 border border-blue-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                    <Droplets className="w-3.5 h-3.5 shrink-0" />
                    <span>Air Tanah</span>
                  </div>
                  <p className="text-[11px] text-[#D1D5DB] leading-relaxed">
                    Mata air jernih telah ada terpendam di bawah tanah, baru memancar keluar saat digali dan dialirkan jalurnya.
                  </p>
                </div>

                {/* 3. Khazanah Hati */}
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                    <Gem className="w-3.5 h-3.5 shrink-0" />
                    <span>Khazanah Permata</span>
                  </div>
                  <p className="text-[11px] text-[#D1D5DB] leading-relaxed">
                    Hati manusia menyimpan berbagai permata kebaikan maupun rahasia, tertutup hingga ada pemantik yang membukanya.
                  </p>
                </div>
              </div>
            </div>

            {/* Sintesis Penjelasan Batin */}
            <p className="text-xs md:text-sm text-white/95 leading-relaxed bg-white/[0.03] p-3 rounded-xl border border-white/5">
              Demikian pula hati manusia. Suara dan lantunan nada teratur menjadi <strong>pemantik (<em className="text-amber-300">qawādiḥ</em>)</strong> yang mengungkap keadaan batin yang sebelumnya tersembunyi. Dengan demikian, Samā‘ bukan sekadar mendengar suara fisik, melainkan aktivitas yang menggerakkan hati dan menyingkap kandungan batinnya.
            </p>
          </div>

          {/* Right Column: Visual Artwork (Allegory of Heart as Treasury & Flint Sparks) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black aspect-[16/10] group">
              <img 
                src={ghazaliSparkHeartImg} 
                alt="Hati sebagai Khazanah Permata dan Pendengaran sebagai Pemantik Api" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5">
                <span className="text-xs font-bold text-amber-300 drop-shadow flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Metafora Qawādiḥ: Pemantik Api & Khazanah Hati
                </span>
                <p className="text-[10px] text-white/80 leading-snug mt-0.5">
                  Representasi spiritual: nada teratur menyingkap permata dan mata air batin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <span>Teks Arab Asli Bersumber dari Iḥyā’ ‘Ulūm al-Dīn</span>
          <span className="text-[#1DB954] font-semibold">{slide.mainMessage}</span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SLIDE 5: DIAGRAM MUNĀSABAH ANTARA SUARA, NADA, DAN KEADAAN RUHANI
  // ---------------------------------------------------------------------------
  if (slide.id === 5) {
    const influenceCategories = [
      {
        id: 'emosional',
        title: '1. Pengaruh Emosional',
        desc: 'Suara dapat membangkitkan luapan kegembiraan, kesedihan, atau keharuan batin.',
        arabicRef: 'مَا يُفَرِّحُ، وَمِنْهَا مَا يُحْزِنُ',
        detail: 'Nada-nada tertentu memicu emosi bahagia atau rasa haru yang menyentuh afeksi manusia secara langsung.'
      },
      {
        id: 'psikologis',
        title: '2. Pengaruh Psikologis',
        desc: 'Suara tertentu dapat memberikan ketenangan mendalam atau membangkitkan gairah semangat.',
        arabicRef: 'مَا يُنَوِّمُ',
        detail: 'Irama yang teratur dapat menenteramkan pikiran gelisah, mengantarkan tidur lelap, atau memacu kewaspadaan mental.'
      },
      {
        id: 'fisik',
        title: '3. Pengaruh Fisik',
        desc: 'Suara dan irama dapat menggerakkan anggota tubuh seperti kepala, tangan, dan langkah kaki.',
        arabicRef: 'مَا يُطْرِبُ وَيُحَرِّكُ الْجَوَارِحَ',
        detail: 'Ketukan ritme mengalirkan resonansi jasmani: ketukan jemari, anggukan kepala, hingga gerakan reflek tubuh.'
      },
      {
        id: 'ruhani',
        title: '4. Pengaruh Ruhani',
        desc: 'Dalam konteks sufistik, suara menjadi pemantik pengalaman batin sesuai orientasi hati pendengar.',
        arabicRef: 'مُنَاسَبَةِ النَّغَمَاتِ لِلْأَرْوَاحِ',
        detail: 'Menghadirkan zikir, kerinduan Ilahi, serta kesadaran tauhid bagi jiwa yang telah siap dan bersih.'
      }
    ];

    const activeInf = influenceCategories[activeInfluenceS5];

    return (
      <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 pb-3 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-0.5 rounded-full">
                Slide 05 · Resonansi Ruhani
              </span>
              <span className="text-xs text-amber-300 font-medium">Konsep Munāsabah (المُنَاسَبَةُ)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              MENGAPA SUARA BISA MENYENTUH HATI?
            </h2>
            <p className="text-sm md:text-base text-[#D1D5DB] font-medium mt-0.5">
              Munāsabah antara Nada, Suara, dan Keadaan Ruhani Manusia
            </p>
          </div>
          <span className="hidden md:inline-block text-xs font-arabic text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/25" dir="rtl" lang="ar">
            المُنَاسَبَةُ بَيْنَ النَّغَمَاتِ وَالْأَرْوَاحِ
          </span>
        </div>

        {/* Primary Arabic Quotes Section (Dual Box: Munasabah & Ragam Suara) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-1.5">
          {/* Kutipan Arab Sumber Primer: Rahasia Munasabah */}
          <div className="p-3.5 md:p-4 rounded-xl bg-[#181818] border border-amber-500/30 flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Kutipan Arab Sumber Primer (Rahasia Munāsabah):
            </span>
            <p 
              className="text-lg md:text-xl font-arabic text-amber-200 text-right leading-[1.9] dir-rtl select-text"
              dir="rtl" 
              lang="ar"
            >
              لِلَّهِ تَعَالَى سِرٌّ فِي مُنَاسَبَةِ النَّغَمَاتِ الْمَوْزُونَةِ لِلْأَرْوَاحِ
            </p>
            <p className="text-xs text-white/90 italic leading-snug">
              “Allah Ta'ala memiliki rahasia dalam kesesuaian antara nada-nada yang tersusun secara berirama dengan ruh.”
            </p>
            <span className="text-[9px] font-mono text-white/40 block">
              Iḥyā’ ‘Ulūm al-Dīn, Kitāb Ādāb al-Samā‘ wa al-Wajd
            </span>
          </div>

          {/* Kutipan Arab Pendukung: Variasi Karakter Pengaruh Suara */}
          <div className="p-3.5 md:p-4 rounded-xl bg-[#181818] border border-amber-500/30 flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Kutipan Arab Pendukung (Karakter Suara Berbeda):
            </span>
            <p 
              className="text-lg md:text-xl font-arabic text-amber-200 text-right leading-[1.9] dir-rtl select-text"
              dir="rtl" 
              lang="ar"
            >
              فَمِنَ الْأَصْوَاتِ مَا يُفَرِّحُ، وَمِنْهَا مَا يُحْزِنُ، وَمِنْهَا مَا يُنَوِّمُ، وَمِنْهَا مَا يُضْحِكُ وَيُطْرِبُ
            </p>
            <p className="text-xs text-white/90 italic leading-snug">
              “Di antara suara-suara itu ada yang menggembirakan, ada yang menyedihkan, ada yang membuat tidur, dan ada yang membuat tertawa serta merasa terhibur.”
            </p>
            <span className="text-[9px] font-mono text-white/40 block">
              Iḥyā’ ‘Ulūm al-Dīn, Kitāb Ādāb al-Samā‘ wa al-Wajd
            </span>
          </div>
        </div>

        {/* Diagram Alur Munāsabah: SUARA & NADA ➔ MUNĀSABAH ➔ RESPONS HATI ➔ 4 PENGARUH */}
        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1DB954] block">
            Diagram Alur Munāsabah:
          </span>

          <div className="grid grid-cols-4 gap-2.5 items-center text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#181818] border border-white/10 flex flex-col items-center justify-center">
              <Volume2 className="w-4 h-4 text-cyan-400 mb-1" />
              <strong className="text-white block">SUARA & NADA</strong>
              <span className="text-[10px] text-white/50">Bunyi teratur berirama</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/40 flex flex-col items-center justify-center relative">
              <Sparkles className="w-4 h-4 text-[#1DB954] mb-1" />
              <strong className="text-[#1DB954] block">MUNĀSABAH</strong>
              <span className="text-[10px] text-white/70">Kesesuaian fitriah ruhani</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center">
              <Heart className="w-4 h-4 text-amber-400 mb-1" />
              <strong className="text-amber-300 block">RESPONS HATI</strong>
              <span className="text-[10px] text-white/70">Pengolahan batiniah</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#181818] border border-white/10 flex flex-col items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-400 mb-1" />
              <strong className="text-white block">4 BENTUK PENGARUH</strong>
              <span className="text-[10px] text-white/50">Emosi, jiwa, raga, ruh</span>
            </div>
          </div>
        </div>

        {/* 4 Spheres of Influence & Critical Academic Note */}
        <div className="grid grid-cols-12 gap-5 my-auto items-stretch flex-1 py-1">
          {/* Left: 4 Bentuk Pengaruh Suara Interactive Tabs */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                4 Bentuk Pengaruh Suara Terhadap Manusia:
              </span>
              <span className="text-[10px] text-white/50">Pilih ranah pengaruh</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {influenceCategories.map((cat, idx) => {
                const isActive = activeInfluenceS5 === idx;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveInfluenceS5(idx)}
                    className={`p-2 rounded-xl text-center border transition-all text-xs font-semibold ${
                      isActive 
                        ? 'bg-[#1DB954] text-black border-[#1DB954] shadow-md' 
                        : 'bg-[#181818] text-white/80 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span>{cat.title.split('. ')[1]}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 space-y-1.5 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  {activeInf.title}
                </h4>
                <span className="text-xs font-arabic text-amber-300" dir="rtl" lang="ar">
                  {activeInf.arabicRef}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#E0E0E0] leading-relaxed">
                {activeInf.desc}
              </p>
              <p className="text-xs text-white/60 leading-relaxed pt-1 border-t border-white/5">
                {activeInf.detail}
              </p>
            </div>
          </div>

          {/* Right: Catatan Kritis & Kehati-hatian Hati */}
          <div className="col-span-12 lg:col-span-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Prinsip Kehati-hatian Batin (Al-Ghazali):</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Pengaruh suara <strong>tidak selalu otomatis positif</strong>. Apa yang dibangkitkan melalui Samā‘ sangat bergantung pada keadaan hati dan kecenderungan yang paling dominan di dalam diri seseorang.
              </p>
              <p className="text-xs text-[#E0E0E0] leading-relaxed">
                Karena itu, suara tidak boleh dipandang sebagai sarana mekanis yang otomatis mendatangkan kesucian batin. Jika yang dominan dalam hati adalah syahwat, musik justru dapat membangkitkan syahwat tersebut.
              </p>
            </div>

            <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#A7A7A7] leading-snug">
              <strong>Pesan Kunci:</strong> Karakter suara dan nada memiliki hubungan dengan respons batin manusia. Inilah landasan pemikiran Al-Ghazali mengenai pengaruh Samā‘.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <span>Kutipan Sahih: Iḥyā’ ‘Ulūm al-Dīn (Bab Ādāb al-Samā‘ wa al-Wajd)</span>
          <span className="text-[#1DB954] font-semibold">{slide.mainMessage}</span>
        </div>
      </div>
    );
  }

  // Fallback for safety
  return null;
};
