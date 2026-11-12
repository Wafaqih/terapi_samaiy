import { ReferenceItem } from '../types/presentation';

export const REFERENCES_DATABASE: Record<string, ReferenceItem> = {
  ghazali_ihya: {
    id: 'ghazali_ihya',
    authors: 'Imam Abu Hamid Muhammad Al-Ghazali (1058–1111 M)',
    year: 1111,
    title: 'Kitāb Ādāb al-Samā‘ wa al-Wajd (Kitab Adab Mendengarkan dan Pengalaman Batin)',
    journal: 'Iḥyā’ ‘Ulūm al-Dīn (Menghidupkan Kembali Ilmu-Ilmu Agama)',
    volumeInfo: 'Jilid II, Rub‘ al-‘Ādāt (Kitāb ke-8)',
    doiOrUrl: 'Koleksi Kitab Klasik Tasawuf dan Pembinaan Batin',
    methodology: 'Analisis tasawuf atas hakikat qalb (hati), daya pemantik pendengaran (samā‘), fenomena wajd, dan munāsabah antara suara dengan ruh.',
    keyFindings: [
      'Hati dan batin manusia merupakan perbendaharaan rahasia dan tambang permata yang membutuhkan pemantik pendengaran untuk menyingkapnya.',
      'Samā‘ berfungsi menampakkan apa yang dominan dalam hati pendengar, baik kebaikan spiritual maupun kecenderungan lainnya.',
      'Terdapat munāsabah (kesesuaian rahasia dari Allah) antara nada-nada terukur berirama dengan keadaan ruh manusia.',
      'Tujuan tertinggi samā‘ adalah kejernihan tauhid, pengarahan batin kepada Allah, dan perbaikan amal perbuatan nyata.'
    ],
    relevanceToSlide: 'Sumber primer utama kajian Samā‘iy Al-Ghazali pada Slide 1, 2, 3, 4, dan 5.'
  },
  farabi_musiqa: {
    id: 'farabi_musiqa',
    authors: 'Abu Nashr Muhammad bin Muhammad Al-Farabi (872–950 M)',
    year: 950,
    title: 'Kitāb al-Mūsīqā al-Kabīr (Buku Besar tentang Musik)',
    journal: 'Karya Klasik Filsafat dan Teori Musik Islam',
    volumeInfo: 'Kajian Sistematis Akustik, Nada, Interval, dan Ritme',
    doiOrUrl: 'Manuskrip Teori Musik Peradaban Islam',
    methodology: 'Analisis filosofis dan matematis-akustik terhadap bunyi, struktur interval nada, komposisi ritme, instrumen akustik, dan pengaruhnya terhadap jiwa.',
    keyFindings: [
      'Menempatkan musik sebagai cabang ilmu pengetahuan sistematis yang dapat dipelajari, dianalisis, dan diukur strukturnya.',
      'Menjelaskan bahwa musik tersusun dari elemen bunyi terukur (naghamāt), melodi (laḥn), pola ritme (īqā‘), dan keharmonisan perpaduan suara.',
      'Mengkaji hubungan timbal balik antara karakter komposisi musikal dengan kondisi jiwa manusia.',
      'Memberikan fondasi objektif-musikal yang melengkapi telaah batiniah-spiritual dalam pembinaan jiwa.'
    ],
    relevanceToSlide: 'Sumber primer utama kajian filosofis dan struktural musik Al-Farabi pada Slide 1, 2, dan 3.'
  }
};
