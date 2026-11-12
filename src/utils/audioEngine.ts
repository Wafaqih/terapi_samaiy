import { AudioTrackType } from '../types/presentation';

// Otomatis mengenali semua berkas audio di dalam folder src/assets/music/
const localMusicAssets = import.meta.glob('../assets/music/*.{mp3,MP3,wav,WAV,m4a,M4A,ogg,OGG}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
}) as Record<string, string>;

export function findMusicUrl(track: AudioTrackType | string): string | null {
  const trackKey = track.replace('maqam_', '').toLowerCase();

  // Strict 1-to-1 matching: each Maqam must link to its own specific audio
  const strictMapping: Record<string, string[]> = {
    'hijaz': ['hijaz'],
    'bayati': ['bayati'],
    'bayati_2': ['bayati2', 'bayati-2', 'bayati_2'],
    'rast': ['rast'],
    'sikah': ['sikah'],
    'saba': ['saba'],
    'nahawand': ['nahawand', 'nahwand'],
    'jiharkah': ['jiharkah', 'jaharkah'],
    'ajam': ['ajam'],
    'kurd': ['kurd'],
    'iraqi': ['iraqi'],
    'arabian_acoustic': ['arab-and-muslim']
  };

  const keywords = strictMapping[trackKey] || [trackKey];

  for (const [path, url] of Object.entries(localMusicAssets)) {
    const filename = path.split('/').pop()?.toLowerCase() || '';
    const baseName = filename.replace(/\.[^/.]+$/, '');
    for (const kw of keywords) {
      if (trackKey === 'bayati' && (filename.includes('bayati2') || filename.includes('bayati-2') || filename.includes('bayati_2') || filename.includes('bayati 2'))) {
        continue; // don't match bayati2 for bayati 1
      }
      if (baseName === kw || baseName.startsWith(kw) || filename.includes(kw)) {
        return url;
      }
    }
  }

  // Never fall back to another maqam's audio!
  return null;
}

export interface MusicItem {
  id: string;
  filename: string;
  title: string;
  category: string;
  trackKey: AudioTrackType;
  url: string;
  isUploadedMp3: boolean;
  description: string;
}

export function getAllAvailableMusic(): MusicItem[] {
  const items: MusicItem[] = [];
  const processedTracks = new Set<string>();

  // 1. Prioritize files physically present in src/assets/music/
  for (const [path, url] of Object.entries(localMusicAssets)) {
    const filename = path.split('/').pop() || '';
    const rawBaseName = filename.replace(/\.[^/.]+$/, '');
    const cleanName = rawBaseName.toUpperCase();

    let trackKey: AudioTrackType = 'none';
    let title = rawBaseName.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    let category = 'Koleksi Audio Terupload';
    let desc = `Berkas audio asli (${filename}) di folder src/assets/music`;

    if (cleanName.includes('HIJAZ')) {
      trackKey = 'maqam_hijaz';
      title = 'Māqām Hījāz';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Kesyahduan relung batin & kedekatan khusyuk Ilahi';
    } else if (cleanName.includes('BAYATI2') || cleanName.includes('BAYATI 2') || cleanName.includes('BAYATI-2')) {
      trackKey = 'maqam_bayati_2';
      title = 'Māqām Bāyātī 2 (Versi Panjang)';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Alunan panjang relaksasi batin & terapi psikosomatis';
    } else if (cleanName.includes('BAYATI')) {
      trackKey = 'maqam_bayati';
      title = 'Māqām Bāyātī';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Suka cita, kelapangan jiwa & resonansi Al-Qur’an';
    } else if (cleanName.includes('SABA')) {
      trackKey = 'maqam_saba';
      title = 'Māqām Sābā';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Keharuan mendalam yang menyentuh relung sanubari';
    } else if (cleanName.includes('NAHAWAND')) {
      trackKey = 'maqam_nahawand';
      title = 'Māqām Nāhwānd';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Refleksi perenungan teduh tanpa keputusasaan';
    } else if (cleanName.includes('JIHARKAH')) {
      trackKey = 'maqam_jiharkah';
      title = 'Māqām Jīhārkāh';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Kelembutan rasa manis & kehangatan emosional';
    } else if (cleanName.includes('KURD')) {
      trackKey = 'maqam_kurd';
      title = 'Māqām Kûrd';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Semangat gairah hidup & pelepasan kecemasan';
    } else if (cleanName.includes('IRAQI')) {
      trackKey = 'maqam_iraqi';
      title = 'Māqām Īrāqī';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Kewaspadaan, ketajaman fokus & dinamika drama jiwa';
    } else if (cleanName.includes('RAST')) {
      trackKey = 'maqam_rast';
      title = 'Māqām Rāst';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Pikiran positif, kesehatan akal & kebanggaan kalbu';
    } else if (cleanName.includes('SIKAH')) {
      trackKey = 'maqam_sikah';
      title = 'Māqām Sīkāh';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Kasih sayang mendalam & kerinduan cinta Ilahi';
    } else if (cleanName.includes('AJAM')) {
      trackKey = 'maqam_ajam';
      title = 'Māqām Ājām';
      category = '10 Maqām Jiwa Al-Farabi';
      desc = 'Keceriaan, vitalitas cemerlang & pelepasan duka';
    }

    if (trackKey !== 'none') {
      processedTracks.add(trackKey);
    }

    items.push({
      id: filename,
      filename,
      title,
      category,
      trackKey,
      url,
      isUploadedMp3: true,
      description: desc
    });
  }

  return items;
}

export function getTrackDisplayName(track: AudioTrackType): { name: string; subtitle: string; hasRealAudio: boolean } {
  if (audioEngine.getCustomTitle()) {
    return {
      name: audioEngine.getCustomTitle()!,
      subtitle: audioEngine.getCustomSubtitle() || 'Koleksi Musik Spotsufy',
      hasRealAudio: true
    };
  }

  const hasReal = !!findMusicUrl(track);
  switch (track) {
    case 'maqam_hijaz':
      return { name: 'Māqām Hījāz', subtitle: 'Al-Farabi · Kesyahduan Relung Hati & Kedekatan Ilahi', hasRealAudio: hasReal };
    case 'maqam_bayati':
      return { name: 'Māqām Bāyātī', subtitle: 'Al-Farabi · Suka Cita, Kelapangan Jiwa & Resonansi Qur’ani', hasRealAudio: hasReal };
    case 'maqam_bayati_2':
      return { name: 'Māqām Bāyātī (Alunan Panjang)', subtitle: 'Al-Farabi · Terapi Relaksasi Jiwa & Psikosomatis', hasRealAudio: hasReal };
    case 'maqam_rast':
      return { name: 'Māqām Rāst', subtitle: 'Al-Farabi · Pemulihan Pikiran Positif & Akal Sehat', hasRealAudio: hasReal };
    case 'maqam_saba':
      return { name: 'Māqām Sābā', subtitle: 'Al-Farabi · Keharuan Jiwa & Sentuhan Batin Mendalam', hasRealAudio: hasReal };
    case 'maqam_sikah':
      return { name: 'Māqām Sīkāh', subtitle: 'Al-Farabi · Kasih Sayang & Kerinduan Ilahiah', hasRealAudio: hasReal };
    case 'maqam_nahawand':
      return { name: 'Māqām Nāhwānd', subtitle: 'Al-Farabi · Refleksi Teduh & Penjernih Pikiran', hasRealAudio: hasReal };
    case 'maqam_jiharkah':
      return { name: 'Māqām Jīhārkāh', subtitle: 'Al-Farabi · Kelembutan Rasa & Keseimbangan Emosi', hasRealAudio: hasReal };
    case 'maqam_ajam':
      return { name: 'Māqām Ājām', subtitle: 'Al-Farabi · Keceriaan, Vitalitas & Harapan Hidup', hasRealAudio: hasReal };
    case 'maqam_kurd':
      return { name: 'Māqām Kûrd', subtitle: 'Al-Farabi · Semangat Energi Positif & Pelepasan Cemas', hasRealAudio: hasReal };
    case 'maqam_iraqi':
      return { name: 'Māqām Īrāqī', subtitle: 'Al-Farabi · Kewaspadaan & Ketajaman Konsentrasi', hasRealAudio: hasReal };
    case 'arabian_acoustic':
    case 'calm_acoustic':
      return { name: 'Al-Sama’iy Kontemplatif (Arabian Acoustic)', subtitle: 'Instrumen Klasik · Tempo 60–80 BPM Parasimpatis', hasRealAudio: hasReal };
    case 'metronome_60':
      return { name: 'Metronom 60 BPM', subtitle: 'Rhythmic Entrainment · Denyut Nadi Istirahat', hasRealAudio: false };
    case 'metronome_80':
      return { name: 'Metronom 80 BPM', subtitle: 'Rhythmic Entrainment · Stabilisasi Sensorimotor', hasRealAudio: false };
    case 'agitated_rhythm':
      return { name: 'Agitasi Disonansi 250 BPM', subtitle: 'Uji Stimulus Kontras · Hiperarousal Akustik', hasRealAudio: false };
    case 'ambient_reflection':
      return { name: 'Refleksi Janahain (Khouf & Roja’)', subtitle: 'Penyelarasan Kalbu & Gelombang Teta', hasRealAudio: hasReal };
    default:
      return { name: 'Spotsufy Music Engine', subtitle: '10 Maqamat Al-Farabi & Terapi Suara', hasRealAudio: false };
  }
}

class PresentationAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrack: AudioTrackType = 'none';
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private timerId: number | null = null;
  private volumeLevel = 0.75;
  private onStateChange: ((isPlaying: boolean, track: AudioTrackType) => void) | null = null;

  // Real Audio Media Element
  private audioElement: HTMLAudioElement | null = null;
  private audioSourceNode: MediaElementAudioSourceNode | null = null;
  private currentTime = 0;
  private duration = 0;
  private timeListeners: Set<(currentTime: number, duration: number) => void> = new Set();
  private customTitle: string | null = null;
  private customSubtitle: string | null = null;

  constructor() {
    // Lazy initialized on gesture
  }

  public getCustomTitle(): string | null {
    return this.customTitle;
  }

  public getCustomSubtitle(): string | null {
    return this.customSubtitle;
  }

  public playCustomAudio(url: string, title: string, subtitle: string) {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.currentTrack = 'arabian_acoustic';
    this.customTitle = title;
    this.customSubtitle = subtitle;
    if (this.onStateChange) {
      this.onStateChange(true, this.currentTrack);
    }
    this.playRealAudio(url);
  }

  public setListener(cb: (isPlaying: boolean, track: AudioTrackType) => void) {
    this.onStateChange = cb;
  }

  public addTimeListener(cb: (currentTime: number, duration: number) => void): () => void {
    this.timeListeners.add(cb);
    cb(this.currentTime, this.duration);
    return () => {
      this.timeListeners.delete(cb);
    };
  }

  private notifyTime(cur: number, dur: number) {
    this.currentTime = cur;
    this.duration = dur;
    this.timeListeners.forEach(listener => listener(cur, dur));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private ensureAudioElement() {
    this.initContext();
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = 'anonymous';
      this.audioElement.preload = 'auto';

      if (this.ctx && this.masterGain) {
        try {
          this.audioSourceNode = this.ctx.createMediaElementSource(this.audioElement);
          this.audioSourceNode.connect(this.masterGain);
        } catch {
          // Fallback if already connected or unsupported
        }
      }

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement) {
          const cur = this.audioElement.currentTime;
          const dur = this.audioElement.duration || 0;
          this.notifyTime(cur, dur);
        }
      });

      this.audioElement.addEventListener('loadedmetadata', () => {
        if (this.audioElement) {
          const cur = this.audioElement.currentTime;
          const dur = this.audioElement.duration || 0;
          this.notifyTime(cur, dur);
        }
      });

      this.audioElement.addEventListener('ended', () => {
        // Loop audio seamlessly
        if (this.audioElement && this.isPlaying) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });
    }
  }

  public setVolume(vol: number) {
    this.volumeLevel = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volumeLevel, this.ctx.currentTime, 0.05);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volumeLevel;
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getCurrentTrack(): AudioTrackType {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }

  public getDuration(): number {
    return this.duration;
  }

  // Geser posisi audio ke detik / menit mana pun yang dipilih pengguna
  public seek(seconds: number) {
    const target = Math.max(0, seconds);
    if (this.audioElement && this.audioElement.src) {
      const maxDur = this.audioElement.duration || 0;
      const safeTime = maxDur > 0 ? Math.min(target, maxDur) : target;
      this.audioElement.currentTime = safeTime;
      this.notifyTime(safeTime, maxDur);
    }
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.currentTrack = 'none';
    this.customTitle = null;
    this.customSubtitle = null;
    if (this.onStateChange) {
      this.onStateChange(false, 'none');
    }
  }

  public playTrack(track: AudioTrackType) {
    if (track === 'none') {
      this.stop();
      return;
    }

    this.initContext();

    // Toggle pause if clicking the exact same playing track
    if (this.isPlaying && this.currentTrack === track) {
      this.stop();
      return;
    }

    // Stop current track before switching
    this.stop();

    // Cek apakah ada file MP3 asli yang diupload untuk track ini
    const realUrl = findMusicUrl(track);

    if (realUrl) {
      this.isPlaying = true;
      this.currentTrack = track;
      if (this.onStateChange) {
        this.onStateChange(true, track);
      }
      this.playRealAudio(realUrl);
    }
  }

  private playRealAudio(url: string) {
    this.ensureAudioElement();
    if (!this.audioElement) return;

    if (this.audioElement.src !== url) {
      this.audioElement.src = url;
      this.audioElement.currentTime = 0;
    }

    this.audioElement.volume = this.volumeLevel;
    this.audioElement.play().catch(() => {
      // Gesture block fallback
    });
  }
}

export const audioEngine = new PresentationAudioEngine();
