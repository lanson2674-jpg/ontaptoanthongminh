import React from 'react';
import { Volume2, VolumeX, Award, Sparkles, BookOpen, User } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  studentName: string;
  onOpenHistory: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  studentName,
  onOpenHistory,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Mascot */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-md border-2 border-amber-200">
            🦉
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight font-['Baloo_2',sans-serif]">
                Ôn Tập Toán Tiểu Học
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                Gia Sư AI
              </span>
            </div>
            <p className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>👩‍🏫 Giáo viên:</span>
              <span className="font-bold text-slate-800">Chử Thị Ngọc Lan</span>
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
              soundEnabled
                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Sổ học tập & Giấy khen */}
          <button
            onClick={onOpenHistory}
            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Award className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">Kho Giấy Khen</span>
          </button>

          {/* Student Badge */}
          <div className="flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-slate-200 text-xs font-bold text-slate-700">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="max-w-[100px] sm:max-w-[140px] truncate">
              {studentName || 'Học sinh'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
