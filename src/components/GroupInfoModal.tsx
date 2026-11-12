import React from 'react';
import { Users, X, Award, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

interface GroupInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPresentation?: () => void;
}

export const TEAM_MEMBERS = [
  {
    no: '1',
    name: 'Muhammad Abdu Wafaqih',
    nim: '1241040097',
    role: 'Penyusun Materi'
  },
  {
    no: '2',
    name: 'Sopie Mahbubah',
    nim: '1241040098',
    role: 'Penyusun Materi'
  },
  {
    no: '3',
    name: 'Aura Alfitra Qoriah',
    nim: '1241040097',
    role: 'Penyusun Materi'
  }
];

export const GroupInfoModal: React.FC<GroupInfoModalProps> = ({
  isOpen,
  onClose,
  onStartPresentation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-lg bg-[#181818] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/30 flex items-center justify-center text-[#1DB954]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Kelompok 8</h3>
              <p className="text-[11px] text-[#A7A7A7]">Mata Kuliah: Tasawuf Psikoterapi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white p-1 rounded-md transition-colors"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs text-[#B3B3B3]">
          {/* Members Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#1DB954] tracking-wider">
                Anggota Tim Penyusun:
              </span>
              <span className="text-[10px] text-white/40">3 Mahasiswa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TEAM_MEMBERS.map((member) => (
                <div 
                  key={member.name}
                  className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between space-y-2 hover:border-[#1DB954]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center font-bold text-xs">
                      {member.no}
                    </span>
                    <GraduationCap className="w-3.5 h-3.5 text-white/30" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {member.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#1DB954] font-semibold block mt-1">
                      NIM {member.nim}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Topic Abstract */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <p className="text-white font-medium leading-relaxed">
              Karya presentasi interaktif ini membedah konsep <strong>Terapi Samā‘iy Imam Al-Ghazali</strong> dan <strong>Kajian Teori Musik Imam Al-Farabi</strong> berlandaskan teks primer <em>Iḥyā’ ‘Ulūm al-Dīn</em> dan <em>Kitāb al-Mūsīqā al-Kabīr</em> serta literatur akademik CMES (2019).
            </p>

            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#1DB954] tracking-wider block">
                Fokus Utama Pembahasan:
              </span>
              <ul className="space-y-1 list-disc pl-4 text-[11px] text-[#A7A7A7]">
                <li>Slide 1: Pendengaran Menuju Jiwa (Pengantar & Latar Pemikiran Kedua Tokoh).</li>
                <li>Slide 2: Definisi Samā‘, Qalb, Wajd, dan Alur Konseptual Pembinaan Jiwa.</li>
                <li>Slide 3: Komparasi Al-Ghazali (Tasawuf) vs Al-Farabi (Ilmu & Teori Musik).</li>
                <li>Slide 4: Hati sebagai Khazanah Rahasia & Pendengaran sebagai Pemantik (Qawādiḥ).</li>
                <li>Slide 5: Konsep Munāsabah (Kesesuaian Fitriah Nada & Ruh) serta 4 Ranah Pengaruh.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[10px] text-[#727272]">
            <strong className="text-[#1DB954]">Spotsufy</strong> Presentation Edition 2026
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Tutup
            </button>
            {onStartPresentation && (
              <button
                onClick={() => {
                  onClose();
                  onStartPresentation();
                }}
                className="px-5 py-1.5 bg-[#1DB954] text-black font-bold text-xs rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                Mulai Slide
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
