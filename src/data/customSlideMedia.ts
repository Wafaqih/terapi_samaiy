import { CustomSlideMedia } from '../types/presentation';

// Otomatis mengenali semua aset di dalam src/assets/slides/ baik png, jpg, jpeg, webp, svg, mau pun pdf
const localSlideAssets = import.meta.glob('../assets/slides/*', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
}) as Record<string, string>;

/**
 * Registri Media Kustom untuk Slide Spotsufy.
 * 
 * Panduan Ukuran & Format:
 * - Ukuran Rekomendasi Canvas: 1920 × 1080 piksel (Aspek Rasio 16:9 Full HD).
 * - Format yang Didukung: Gambar (PNG, JPG, WebP, SVG) dan Dokumen PDF.
 * - Lokasi Penyimpanan Berkas: Letakkan file di folder `src/assets/slides/`
 * 
 * Contoh penautan:
 * "slide 09 link to slide-09.png" -> Cukup tentukan id: 9 dengan src: 'slide-09.png'
 */
export const CUSTOM_SLIDE_MEDIA: Record<number, CustomSlideMedia> = {};

/**
 * Menyelesaikan path media kustom agar kompatibel dengan sistem bundling Vite dan URL langsung.
 */
export function resolveMediaUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const cleanName = src.split('/').pop() || src;
  for (const [key, value] of Object.entries(localSlideAssets)) {
    if (key.endsWith('/' + cleanName) || key.endsWith(cleanName)) {
      return value;
    }
  }

  // Jika tidak ditemukan di glob lokal, kembalikan format path aslinya
  return src.startsWith('/') ? src : `/src/assets/slides/${src}`;
}

/**
 * Mengambil konfigurasi media kustom berdasarkan ID slide.
 */
export function getCustomSlideMedia(slideId: number): CustomSlideMedia | undefined {
  return CUSTOM_SLIDE_MEDIA[slideId];
}
