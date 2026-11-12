import { SlideData } from '../types/presentation';

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    trackNumber: '01',
    title: 'TERAPI SAMĀ‘IY: Ketika Pendengaran Menjadi Jalan Menuju Jiwa',
    subtitle: 'Perspektif Pemikiran Imam Al-Ghazali dan Imam Al-Farabi',
    category: 'Pengantar',
    estimatedDuration: '03:00',
    theme: 'Hubungan antara pendengaran, musik, hati, dan pembinaan jiwa dalam perspektif pemikiran Islam klasik.',
    keyQuestions: 'Pernahkah sebuah lantunan membuat seseorang tiba-tiba merasa tenang, sedih, bahagia, terharu, atau bahkan merasakan kerinduan spiritual? Suara bukan sekadar gelombang yang diterima telinga, melainkan sarana yang menyentuh keadaan batin manusia.',
    mainMessage: 'Pendengaran dapat menjadi jalan untuk menyentuh keadaan batin manusia.',
    primaryReferences: ['ghazali_ihya', 'farabi_musiqa'],
    recommendedAudio: 'arabian_acoustic',
    audioLabel: 'Alunan Kontemplatif Islam Klasik'
  },
  {
    id: 2,
    trackNumber: '02',
    title: 'APA ITU TERAPI SAMĀ‘IY?',
    subtitle: 'Memahami Pendengaran sebagai Jalan Menuju Pengalaman Batin',
    category: 'Pengantar',
    estimatedDuration: '03:30',
    theme: 'Pengertian Samā‘, pengertian Terapi Samā‘iy, dan 3 unsur utama pembinaan jiwa.',
    keyQuestions: 'Bagaimana aktivitas mendengar (Samā‘) terhubung dengan hati (Qalb) dan melahirkan pengalaman batin (Wajd) menuju pembinaan jiwa?',
    mainMessage: 'Samā‘ merupakan pintu masuk, hati merupakan tempat respons batin, dan Wajd merupakan pengalaman batin yang muncul.',
    academicNote: 'Istilah Terapi Samā‘iy digunakan sebagai kerangka konseptual presentasi untuk mengembangkan pembahasan pemikiran kedua tokoh. Jangan menyatakan bahwa Al-Ghazali atau Al-Farabi secara langsung merumuskan suatu protokol klinis bernama Terapi Samā‘iy.',
    primaryReferences: ['ghazali_ihya', 'farabi_musiqa'],
    recommendedAudio: 'calm_acoustic',
    audioLabel: 'Suasana Hening Reflektif'
  },
  {
    id: 3,
    trackNumber: '03',
    title: 'DUA TOKOH, DUA SUDUT PANDANG',
    subtitle: 'Imam Al-Ghazali dan Imam Al-Farabi dalam Kajian Pendengaran, Musik, dan Jiwa',
    category: 'Sintesis & Perbandingan',
    estimatedDuration: '04:00',
    theme: 'Perbandingan dua pendekatan: Tasawuf & Pembinaan Batin vs Filsafat & Ilmu Musik.',
    keyQuestions: 'Al-Ghazali mengkaji bagaimana suara menggerakkan hati dan menghasilkan pengalaman batin, sedangkan Al-Farabi mengkaji bagaimana suara dan musik tersusun secara terstruktur.',
    mainMessage: 'Keduanya menjadi landasan untuk membangun pemahaman mengenai hubungan antara musik dan pembinaan jiwa tanpa mencampurbaurkan metodologi masing-masing.',
    academicNote: 'Kedua tokoh memberikan perhatian pada hubungan suara dan manusia, namun titik tekannya berbeda. Jangan menggambarkan kedua tokoh seolah-olah memiliki teori yang identik.',
    primaryReferences: ['ghazali_ihya', 'farabi_musiqa'],
    recommendedAudio: 'none'
  },
  {
    id: 4,
    trackNumber: '04',
    title: 'BAGAIMANA AL-GHAZALI MEMAHAMI SAMĀ‘?',
    subtitle: 'Pendengaran sebagai Jalan untuk Menggerakkan Hati',
    category: 'Al-Ghazali',
    estimatedDuration: '04:00',
    theme: 'Hati sebagai khazanah rahasia batin dan pendengaran sebagai pemantik (qawādiḥ).',
    keyQuestions: 'Hati manusia menyimpan rahasia dan permata batin. Nada-nada yang tersusun secara teratur dan menyenangkan mengeluarkan apa yang tersimpan dalam hati serta menampakkan kebaikan maupun keburukannya.',
    mainMessage: 'Pendengaran menjadi jalan untuk membangkitkan apa yang telah tersimpan di dalam hati.',
    arabicQuotes: [
      {
        title: 'Kutipan Sumber Primer (Khazanah Rahasia Batin)',
        arabic: 'فَإِنَّ الْقُلُوبَ وَالسَّرَائِرَ خَزَائِنُ الْأَسْرَارِ وَمَعَادِنُ الْجَوَاهِرِ',
        translation: 'Sesungguhnya hati dan batin merupakan tempat penyimpanan rahasia dan tambang berbagai permata.',
        source: 'Imam Al-Ghazali, Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)'
      },
      {
        title: 'Kutipan Kedua (Pemantik Pendengaran)',
        arabic: 'وَلَا سَبِيلَ إِلَى اسْتِثَارَةِ خَفَايَاهَا إِلَّا بِقَوَادِحِ السَّمَاعِ',
        translation: 'Tidak ada jalan untuk membangkitkan rahasia-rahasia yang tersembunyi di dalamnya kecuali melalui pemantik-pemantik pendengaran.',
        source: 'Imam Al-Ghazali, Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)'
      }
    ],
    primaryReferences: ['ghazali_ihya'],
    recommendedAudio: 'arabian_acoustic',
    audioLabel: 'Lantunan Kontemplasi Al-Ghazali'
  },
  {
    id: 5,
    trackNumber: '05',
    title: 'MENGAPA SUARA BISA MENYENTUH HATI?',
    subtitle: 'Munāsabah antara Nada, Suara, dan Keadaan Ruhani',
    category: 'Al-Ghazali',
    estimatedDuration: '04:30',
    theme: 'Konsep Munāsabah (kesesuaian fitriah antara nada dan jiwa) serta 4 bentuk pengaruh suara.',
    keyQuestions: 'Adanya rahasia kesesuaian antara nada berirama dengan ruh manusia, melahirkan respons emosional, psikologis, fisik, dan ruhani.',
    mainMessage: 'Karakter suara dan nada memiliki hubungan dengan respons batin manusia. Inilah salah satu landasan pemikiran Al-Ghazali mengenai pengaruh Samā‘.',
    academicNote: 'Pengaruh suara tidak selalu positif; apa yang muncul bergantung pada keadaan hati dan kecenderungan yang dominan. Suara tidak boleh dipandang otomatis menghasilkan ketenangan spiritual.',
    arabicQuotes: [
      {
        title: 'Kutipan Sumber Primer (Rahasia Munāsabah)',
        arabic: 'لِلَّهِ تَعَالَى سِرٌّ فِي مُنَاسَبَةِ النَّغَمَاتِ الْمَوْزُونَةِ لِلْأَرْوَاحِ',
        translation: "Allah Ta'ala memiliki rahasia dalam kesesuaian antara nada-nada yang tersusun secara berirama dengan ruh.",
        source: 'Imam Al-Ghazali, Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)'
      },
      {
        title: 'Kutipan Pendukung (Variasi Karakter Suara)',
        arabic: 'فَمِنَ الْأَصْوَاتِ مَا يُفَرِّحُ، وَمِنْهَا مَا يُحْزِنُ، وَمِنْهَا مَا يُنَوِّمُ، وَمِنْهَا مَا يُضْحِكُ وَيُطْرِبُ',
        translation: 'Di antara suara-suara itu ada yang menggembirakan, ada yang menyedihkan, ada yang membuat tidur, dan ada yang membuat tertawa serta merasa terhibur.',
        source: 'Imam Al-Ghazali, Iḥyā’ ‘Ulūm al-Dīn (Kitāb Ādāb al-Samā‘ wa al-Wajd)'
      }
    ],
    primaryReferences: ['ghazali_ihya'],
    recommendedAudio: 'calm_acoustic',
    audioLabel: 'Alunan Khusyuk Ruhani'
  }
];
