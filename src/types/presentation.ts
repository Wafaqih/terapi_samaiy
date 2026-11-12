export interface ReferenceItem {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  volumeInfo?: string;
  doiOrUrl?: string;
  methodology?: string;
  keyFindings: string[];
  relevanceToSlide: string;
}

export interface MaqamData {
  name: string;
  arabicName: string;
  character: string;
  spiritualEffect: string;
  psychologicalImpact: string;
  baseFrequency: number;
  intervals: number[]; // scale notes in cents or ratios
}

export type AudioTrackType = 
  | 'none'
  | 'calm_acoustic'
  | 'agitated_rhythm'
  | 'metronome_60'
  | 'metronome_80'
  | 'arabian_acoustic'
  | 'maqam_rast'
  | 'maqam_bayati'
  | 'maqam_bayati_2'
  | 'maqam_hijaz'
  | 'maqam_saba'
  | 'maqam_sikah'
  | 'maqam_nahawand'
  | 'maqam_jiharkah'
  | 'maqam_ajam'
  | 'maqam_kurd'
  | 'maqam_iraqi'
  | 'ambient_reflection';

export interface CustomSlideMedia {
  type: 'image' | 'pdf';
  src: string;
  alt?: string;
  fit?: 'contain' | 'cover';
  showOverlayTitle?: boolean;
}

export interface ArabicQuoteItem {
  title?: string;
  arabic: string;
  translation: string;
  source: string;
}

export interface SlideData {
  id: number;
  trackNumber: string;
  title: string;
  subtitle: string;
  category: 'Pengantar' | 'Al-Ghazali' | 'Al-Farabi' | 'Sintesis & Perbandingan';
  estimatedDuration: string;
  theme?: string;
  keyQuestions?: string;
  mainMessage?: string;
  academicNote?: string;
  arabicQuote?: ArabicQuoteItem;
  arabicQuotes?: ArabicQuoteItem[];
  primaryReferences: string[]; // reference IDs
  recommendedAudio?: AudioTrackType;
  audioLabel?: string;
  customMedia?: CustomSlideMedia;
}

