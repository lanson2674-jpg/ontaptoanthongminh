import React from 'react';
import { QuizSummary } from '../types';
import { X, Award, Trash2, Calendar, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: QuizSummary[];
  onSelectSummary: (summary: QuizSummary) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectSummary,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-amber-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-200" />
            <div>
              <h3 className="font-bold text-base leading-tight">Sổ Học Tập & Kho Giấy Khen Của Em</h3>
              <p className="text-xs text-amber-100">Lưu lại thành tích và các giấy khen đã đạt được</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <span className="text-5xl block">📚</span>
              <p className="font-semibold text-slate-700">Chưa có bài kiểm tra nào được hoàn thành.</p>
              <p className="text-xs text-slate-400">
                Hãy bắt đầu làm bài ôn tập để nhận Giấy Khen đầu tiên của mình nhé!
              </p>
            </div>
          ) : (
            history.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Lớp {item.grade}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{item.topicTitle}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="font-bold text-amber-600">{item.scoreOutOf10}/10 Điểm</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {item.correctCount} đúng
                    </span>
                    <span className="flex items-center gap-1 text-rose-500 font-semibold">
                      <XCircle className="w-3 h-3" /> {item.incorrectCount} sai
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectSummary(item)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs self-end sm:self-auto"
                >
                  <Award className="w-3.5 h-3.5 text-red-700" />
                  <span>Xem Giấy Khen</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">Tổng số bài đã luyện tập: {history.length}</span>
            <button
              onClick={onClearHistory}
              className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa lịch sử
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
