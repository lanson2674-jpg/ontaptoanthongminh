import React, { useState } from 'react';
import { GradeId, DifficultyLevel, Topic } from '../types';
import { CURRICULUM_BY_GRADE, DIFFICULTY_LEVELS, QUESTION_COUNT_OPTIONS } from '../data/curriculum';
import { Sparkles, BookOpen, Award, Layers, Target, User, Play, Clock, History, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface SetupViewProps {
  studentName: string;
  setStudentName: (name: string) => void;
  selectedGrade: GradeId;
  setSelectedGrade: (grade: GradeId) => void;
  selectedTopic: Topic;
  setSelectedTopic: (topic: Topic) => void;
  selectedDifficulty: DifficultyLevel;
  setSelectedDifficulty: (diff: DifficultyLevel) => void;
  questionCount: number;
  setQuestionCount: (count: number) => void;
  onStartQuiz: () => void;
  onOpenHistory: () => void;
}

export const SetupView: React.FC<SetupViewProps> = ({
  studentName,
  setStudentName,
  selectedGrade,
  setSelectedGrade,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  questionCount,
  setQuestionCount,
  onStartQuiz,
  onOpenHistory,
}) => {
  const topics = CURRICULUM_BY_GRADE[selectedGrade] || [];
  const currentDiffInfo = DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty)!;

  const handleGradeSelect = (g: GradeId) => {
    sound.playClick();
    setSelectedGrade(g);
    const newTopics = CURRICULUM_BY_GRADE[g];
    if (newTopics && newTopics.length > 0) {
      setSelectedTopic(newTopics[0]);
    }
  };

  const handleTopicSelect = (t: Topic) => {
    sound.playClick();
    setSelectedTopic(t);
  };

  const handleDifficultySelect = (d: DifficultyLevel) => {
    sound.playClick();
    setSelectedDifficulty(d);
  };

  const handleCountSelect = (c: number) => {
    sound.playClick();
    setQuestionCount(c);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs sm:text-sm font-semibold mb-3 border border-white/30">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Chuyên Gia Giáo Dục Tiểu Học Hàng Đầu Việt Nam</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-['Baloo_2',sans-serif]">
            Ôn Tập Toán Tiểu Học
          </h1>
          <div className="mt-1.5 mb-2 inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-950/40 backdrop-blur-xs rounded-xl border border-white/30 text-xs sm:text-sm font-bold text-amber-100 shadow-xs">
            <span>👩‍🏫 Giáo viên:</span>
            <span className="text-white font-extrabold text-sm sm:text-base tracking-wide">
              Chử Thị Ngọc Lan
            </span>
          </div>
          <p className="mt-2 text-sm sm:text-base text-amber-100 leading-relaxed font-normal">
            Tự chọn bài học • Phù hợp năng lực từ Yếu đến Nâng cao • Gia sư AI giảng giải tận tình • Nhận Giấy Khen vinh danh xuất sắc!
          </p>

          {/* Student Name Input */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Nhập họ và tên học sinh (để in Giấy Khen)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 font-semibold text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-300 shadow-md"
              />
            </div>
            <button
              onClick={onOpenHistory}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs border border-white/40 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <History className="w-4 h-4" />
              <span>Sổ Học Tập & Giấy Khen</span>
            </button>
          </div>
        </div>

        {/* Mascot Mascot Illustration */}
        <div className="hidden lg:flex absolute right-6 bottom-2 items-center justify-center select-none opacity-95">
          <div className="text-right mr-3 bg-white/90 text-slate-800 p-2.5 rounded-2xl rounded-br-xs text-xs font-bold shadow-lg max-w-[170px] leading-snug">
            🦉 "Chào em! Hãy chọn lớp và số câu hỏi để chúng mình cùng học nhé!"
          </div>
          <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-7xl border-4 border-white/40 shadow-inner">
            🦉
          </div>
        </div>
      </div>

      {/* STEP 1: CHỌN LỚP */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>Chọn Khối Lớp</span>
                <span className="text-xs font-normal text-slate-500">(Lớp 1 đến Lớp 5)</span>
              </h2>
              <p className="text-xs text-slate-500">Chương trình giáo dục phổ thông mới của Bộ GD&ĐT</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {([1, 2, 3, 4, 5] as GradeId[]).map(grade => {
            const isSelected = selectedGrade === grade;
            const mascotEmoji = ['🐣', '🐥', '🦊', '🐯', '🦁'][grade - 1];
            return (
              <button
                key={grade}
                onClick={() => handleGradeSelect(grade)}
                className={`relative p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300 -translate-y-0.5'
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-2 -right-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    Đang chọn
                  </span>
                )}
                <span className="text-3xl">{mascotEmoji}</span>
                <span className="text-base font-extrabold text-slate-800">Lớp {grade}</span>
                <span className="text-[11px] text-slate-500">
                  {grade === 1 ? 'Làm quen toán' : grade === 5 ? 'Chuyển cấp & Ôn tập' : `Toán khối ${grade}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 2: CHỌN TÊN BÀI HỌC */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>Chọn Tên Bài Học / Chuyên Đề</span>
                <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                  Lớp {selectedGrade}
                </span>
              </h2>
              <p className="text-xs text-slate-500">Các chủ đề trọng tâm chuẩn kiến thức kỹ năng môn Toán</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map(topic => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className={`p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-300 -translate-y-0.5'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl p-2 rounded-xl bg-white border border-slate-200 shadow-2xs shrink-0">
                  {topic.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 3: CHỌN MỨC ĐỘ CÂU HỎI */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>Chọn Mức Độ Câu Hỏi Theo Năng Lực</span>
              </h2>
              <p className="text-xs text-slate-500">
                5 thang bậc nhận thức: Yếu • Trung bình • Khá • Giỏi • Nâng cao
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {DIFFICULTY_LEVELS.map(diff => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <button
                key={diff.id}
                onClick={() => handleDifficultySelect(diff.id)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-300 -translate-y-0.5`
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{diff.icon}</span>
                    <span className="text-xs font-semibold text-amber-600">
                      {'★'.repeat(diff.stars)}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800 leading-tight mb-1">
                    {diff.name.split(' (')[1]?.replace(')', '') || diff.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {diff.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className={`font-semibold ${diff.textColor}`}>
                    Mức độ {diff.stars}/5
                  </span>
                  {isSelected && (
                    <span className="font-bold text-amber-600">✓ Chọn</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected difficulty pedagogical description */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Lời khuyên của chuyên gia giáo dục cho {currentDiffInfo.name}: </span>
            <span>{currentDiffInfo.description}</span>
          </div>
        </div>
      </section>

      {/* STEP 4: CHỌN SỐ LƯỢNG CÂU HỎI (5, 10, 15, 20, 25, 30) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>Chọn Số Lượng Câu Hỏi</span>
                <span className="text-xs text-slate-500">(5, 10, 15, 20, 25, 30 câu)</span>
              </h2>
              <p className="text-xs text-slate-500">Tùy theo thời gian và sự tập trung của học sinh</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUESTION_COUNT_OPTIONS.map(count => {
            const isSelected = questionCount === count;
            const estMinutes = Math.round(count * 1.5);
            return (
              <button
                key={count}
                onClick={() => handleCountSelect(count)}
                className={`py-3 px-2 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 shadow-md ring-2 ring-purple-300 -translate-y-0.5 text-purple-900'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-2xl font-black">{count}</span>
                <span className="text-xs font-bold uppercase">Câu hỏi</span>
                <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" /> ~{estMinutes} phút
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* START QUIZ ACTION CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full">
              Lớp {selectedGrade}
            </span>
            <span className="bg-blue-400/20 text-blue-200 px-2.5 py-0.5 rounded-full border border-blue-300/30">
              {selectedTopic.title}
            </span>
            <span className="bg-emerald-400/20 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-300/30">
              {currentDiffInfo.name.split(' (')[1]?.replace(')', '') || currentDiffInfo.name}
            </span>
            <span className="bg-purple-400/20 text-purple-200 px-2.5 py-0.5 rounded-full border border-purple-300/30">
              {questionCount} Câu hỏi
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold pt-1">
            Học sinh: {studentName || 'Học Sinh Chăm Ngoan'} đã sẵn sàng chinh phục Toán?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Nếu làm sai, Gia Sư AI sẽ hướng dẫn từng bước. Hoàn thành để nhận Giấy Khen vinh danh nhé!
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-amber-500/30 transition-all transform hover:scale-105 cursor-pointer shrink-0"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Bắt Đầu Làm Bài Ngay!</span>
        </button>
      </div>
    </div>
  );
};
