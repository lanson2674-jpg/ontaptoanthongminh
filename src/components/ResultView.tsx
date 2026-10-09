import React, { useState } from 'react';
import { QuizSummary, Question, StudentAnswer } from '../types';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Printer, Sparkles, BookOpen, Clock, Heart, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface ResultViewProps {
  summary: QuizSummary;
  questions: Question[];
  answers: Record<string | number, StudentAnswer>;
  onViewCertificate: () => void;
  onRetry: () => void;
  onNewQuiz: () => void;
  onOpenTutor: (question: Question, studentAnswerText: string, correctAnswerText: string) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  summary,
  questions,
  answers,
  onViewCertificate,
  onRetry,
  onNewQuiz,
  onOpenTutor,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'incorrect' | 'correct'>('all');

  const filteredQuestions = questions.filter(q => {
    const ans = answers[q.id];
    if (activeTab === 'incorrect') return ans && !ans.isCorrect;
    if (activeTab === 'correct') return ans && ans.isCorrect;
    return true;
  });

  const getRankBadge = (score: number) => {
    if (score >= 9) return { text: 'XUẤT SẮC - TRẠNG NGUYÊN NHÍ', color: 'from-amber-400 to-yellow-500 text-slate-950', icon: '👑' };
    if (score >= 8) return { text: 'HỌC SINH GIỎI TOÁN', color: 'from-blue-500 to-indigo-600 text-white', icon: '🏆' };
    if (score >= 6.5) return { text: 'HỌC SINH KHÁ - TIẾN BỘ', color: 'from-emerald-500 to-teal-600 text-white', icon: '⭐' };
    if (score >= 5) return { text: 'HOÀN THÀNH ĐẠT CHUẨN', color: 'from-cyan-500 to-blue-500 text-white', icon: '🌱' };
    return { text: 'CẦN CỐ GẮNG HƠN - GIA SƯ AI LUÔN ĐỒNG HÀNH', color: 'from-rose-400 to-orange-500 text-white', icon: '💪' };
  };

  const rank = getRankBadge(summary.scoreOutOf10);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? `${m} phút ` : ''}${s} giây`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Celebration Header Card */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold border border-white/30">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Đã hoàn thành bài kiểm tra Toán Lớp {summary.grade}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-['Baloo_2',sans-serif]">
              Chúc mừng em {summary.studentName || 'Học Sinh Chăm Ngoan'}!
            </h1>
            <p className="text-sm text-amber-100 max-w-lg">
              Chuyên đề: <span className="font-bold text-white">"{summary.topicTitle}"</span>
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r ${rank.color} shadow-sm flex items-center gap-1.5`}>
                <span>{rank.icon}</span>
                <span>{rank.text}</span>
              </span>
            </div>
          </div>

          {/* Quick Certificate Claim button */}
          <button
            onClick={() => {
              sound.playClick();
              onViewCertificate();
            }}
            className="px-6 py-4 bg-white hover:bg-amber-50 text-slate-900 rounded-2xl font-black text-sm sm:text-base flex items-center gap-3 shadow-xl transform hover:scale-105 transition-all cursor-pointer border-2 border-amber-300"
          >
            <span className="text-3xl">📜</span>
            <div className="text-left">
              <div className="text-xs text-amber-800 font-bold uppercase">Nhận Ngay</div>
              <div className="text-red-700 text-lg font-black leading-tight">GIẤY KHEN VINH DANH</div>
            </div>
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW: ĐIỂM SỐ, SỐ CÂU ĐÚNG, SỐ CÂU SAI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Điểm số */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ĐIỂM SỐ CỦA EM</span>
            <span className="text-lg">🎯</span>
          </div>
          <div className="my-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-600 font-['Baloo_2',sans-serif]">
              {summary.scoreOutOf10}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400"> / 10 điểm</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Tỉ lệ chính xác: <span className="font-bold text-slate-800">{summary.percentage}%</span>
          </div>
        </div>

        {/* Số câu đúng */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
            <span>SỐ CÂU TRẢ LỜI ĐÚNG</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-['Baloo_2',sans-serif]">
              {summary.correctCount}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400"> / {summary.totalQuestions} câu</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Xuất sắc! Giữ vững phong độ nhé
          </div>
        </div>

        {/* Số câu sai */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-rose-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-800 text-xs font-bold">
            <span>SỐ CÂU TRẢ LỜI SAI</span>
            <XCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl sm:text-4xl font-black text-rose-600 font-['Baloo_2',sans-serif]">
              {summary.incorrectCount}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400"> câu</span>
          </div>
          <div className="text-[11px] text-rose-700 font-medium">
            {summary.incorrectCount === 0 ? 'Tuyệt đối không sai câu nào!' : 'Đã có Gia sư AI giảng lại'}
          </div>
        </div>

        {/* Thời gian làm bài */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-800 text-xs font-bold">
            <span>THỜI GIAN LÀM BÀI</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="my-2">
            <span className="text-xl sm:text-2xl font-black text-blue-700 font-['Baloo_2',sans-serif]">
              {formatDuration(summary.durationSeconds)}
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Tốc độ trung bình: ~{Math.round(summary.durationSeconds / (summary.totalQuestions || 1))}s / câu
          </div>
        </div>
      </div>

      {/* Expert Advice Note */}
      <div className="bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200 flex items-start gap-3">
        <span className="text-3xl">🦉</span>
        <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          <h4 className="font-bold text-amber-900 text-sm mb-1">
            Lời khuyên của Chuyên Gia Giáo Dục Tiểu Học:
          </h4>
          {summary.scoreOutOf10 >= 8 ? (
            <p>
              Em nắm kiến thức rất chắc chắn và có tư duy logic sắc bén! Hãy tự tin thử sức với các bài tập ở mức độ "Giỏi" hoặc "Nâng cao (Toán Olympic)" để phát huy năng khiếu toán học của mình nhé.
            </p>
          ) : summary.scoreOutOf10 >= 5 ? (
            <p>
              Em đã hoàn thành đạt chuẩn bài học! Với những câu chưa đúng, em hãy bấm vào nút <strong>"Gia Sư AI Giảng Lại"</strong> ở danh sách bên dưới để xem cô/thầy giải thích chi tiết, sau đó làm lại một lần nữa để đạt điểm 10 tuyệt đối nhé!
            </p>
          ) : (
            <p>
              Đừng nản lòng nhé em yêu! Môn Toán luôn cần một chút kiên nhẫn. Em hãy bắt đầu lại từ mức độ "Củng cố nền tảng (Yếu)" với số lượng 5-10 câu hỏi để xây dựng lại nền tảng thật vững vàng cùng Gia sư AI nhé!
            </p>
          )}
        </div>
      </div>

      {/* QUESTION REVIEW SECTION */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>Bảng Phân Tích Chi Tiết Từng Câu Hỏi</span>
            </h3>
            <p className="text-xs text-slate-500">
              Xem lại từng câu, đối chiếu đáp án và gọi Gia Sư AI giảng lại bất kỳ lúc nào
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({questions.length})
            </button>
            <button
              onClick={() => setActiveTab('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'incorrect' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              Câu sai ({summary.incorrectCount})
            </button>
            <button
              onClick={() => setActiveTab('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'correct' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              Câu đúng ({summary.correctCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => {
            const ans = answers[q.id];
            const isCorrect = ans?.isCorrect;
            const originalIndex = questions.findIndex(orig => orig.id === q.id) + 1;
            const studentChosenText = ans ? q.options[ans.selectedOptionIndex] : 'Chưa trả lời';
            const correctText = q.options[q.correctIndex];

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                        isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    >
                      {originalIndex}
                    </span>
                    <span className="font-bold text-sm text-slate-800">Câu {originalIndex}</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '✓ Trả lời Đúng' : '✗ Trả lời Sai'}
                    </span>
                  </div>

                  {/* AI Tutor Button */}
                  <button
                    onClick={() => onOpenTutor(q, studentChosenText, correctText)}
                    className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Gia sư AI giảng giải chi tiết câu này"
                  >
                    <span>🦉</span>
                    <span>Gia Sư Giảng Giải</span>
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 mb-3 pl-8">
                  {q.question}
                </p>

                <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500">Em đã chọn: </span>
                    <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {studentChosenText}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500">Đáp án chuẩn: </span>
                    <span className="font-bold text-emerald-700">{correctText}</span>
                  </div>
                </div>

                <div className="pl-8 mt-2 text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-amber-800">Lời giải chi tiết: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện tập lại chuyên đề này</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onViewCertificate}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Award className="w-5 h-5 text-red-700" />
            <span>Mở Giấy Khen Vinh Danh</span>
          </button>
          <button
            onClick={onNewQuiz}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>Chọn Bài Học Mới</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
