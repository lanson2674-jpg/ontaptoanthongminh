import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Send, MessageCircle, Lightbulb, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Question } from '../types';

interface TutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  studentAnswerText: string;
  correctAnswerText: string;
  grade: number;
}

interface ChatMessage {
  role: 'user' | 'tutor';
  content: string;
}

export const TutorModal: React.FC<TutorModalProps> = ({
  isOpen,
  onClose,
  question,
  studentAnswerText,
  correctAnswerText,
  grade,
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    setLoading(true);
    setChatMessages([]);
    fetchTutorExplanation();
  }, [isOpen, question]);

  const fetchTutorExplanation = async () => {
    try {
      const res = await fetch('/api/tutor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          topic: question.topicId,
          difficulty: question.difficulty,
          question: question.question,
          studentAnswer: studentAnswerText,
          correctAnswer: correctAnswerText,
          explanationHint: question.explanation,
        }),
      });

      const data = await res.json();
      if (data.success && data.explanation) {
        setExplanation(data.explanation);
      } else {
        setExplanation(data.fallbackExplanation || question.explanation);
      }
    } catch {
      // Local fallback
      setExplanation(
        `🌱 Không sao cả em yêu! Bài này chúng mình chỉ nhầm một chút thôi.\n\n` +
        `💡 **Quy tắc cốt lõi cần nhớ:**\n${question.hint || 'Hãy đọc kĩ đề bài và tính cẩn thận từ trái sang phải.'}\n\n` +
        `📝 **Hướng dẫn giải từng bước:**\n${question.explanation}\n\n` +
        `✨ Em hãy nhẩm lại một lần nữa nhé, chắc chắn lần sau em sẽ làm đúng 100%! 🌟`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    const newHistory: ChatMessage[] = [...chatMessages, { role: 'user', content: userText }];
    setChatMessages(newHistory);
    setChatLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          question: question.question,
          message: userText,
          chatHistory: newHistory,
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setChatMessages(prev => [...prev, { role: 'tutor', content: data.reply }]);
      } else {
        setChatMessages(prev => [
          ...prev,
          {
            role: 'tutor',
            content: 'Cô/Thầy nghe con rồi! Con hãy xem kĩ lại các số trong đề bài và làm thử từng bước nhé.',
          },
        ]);
      }
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'tutor',
          content: 'Em hãy thử nháp lại phép tính này ra giấy nháp xem kết quả là bao nhiêu nhé!',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_~`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    // Pick Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border-2 border-amber-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border-2 border-white/40 shadow-inner">
              👩‍🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Gia Sư AI - Cô Chử Thị Ngọc Lan</h3>
                <span className="text-xs bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full border border-white/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Sư phạm Lớp {grade}
                </span>
              </div>
              <p className="text-xs text-amber-100">Ân cần giảng giải • Không sợ làm sai • Học là hiểu ngay!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Đóng lại"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Snapshot */}
        <div className="bg-amber-50/70 p-4 border-b border-amber-200">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Đề bài vừa làm:
          </div>
          <p className="text-sm font-semibold text-slate-800 mb-3">{question.question}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold">Em đã chọn:</span> {studentAnswerText}
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Đáp án đúng là:</span> {correctAnswerText}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-sm">🦉</span>
              </div>
              <div>
                <p className="font-bold text-slate-700">Gia sư Cú Vàng đang phân tích câu trả lời của em...</p>
                <p className="text-xs text-slate-500 mt-0.5">Đang soạn lời giải thích trực quan và dễ hiểu nhất</p>
              </div>
            </div>
          ) : (
            <>
              {/* Tutor Explanation Card */}
              <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                    <span>👩‍🏫</span> Cô giáo Chử Thị Ngọc Lan hướng dẫn:
                  </div>
                  <button
                    onClick={() => speakText(explanation)}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                      isSpeaking
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-100'
                    }`}
                    title="Đọc bài giảng"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {isSpeaking ? 'Dừng đọc' : 'Nghe cô Lan đọc'}
                  </button>
                </div>

                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-['Be_Vietnam_Pro'] space-y-2">
                  {explanation}
                </div>
              </div>

              {/* Chat Thread */}
              {chatMessages.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                    <MessageCircle className="w-3.5 h-3.5" /> Hỏi đáp cùng Gia Sư:
                  </div>
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'tutor' && (
                        <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                          🦉
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-xs'
                            : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" /> Gia sư đang trả lời em...
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Interactive Chat Input */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Em chưa hiểu chỗ nào? Hãy nhắn cho Gia Sư nhé..."
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              disabled={loading || chatLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || chatLoading || loading}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi</span>
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
            <span>💡 Câu hỏi mẫu: "Cô giải thích rõ hơn bước 2 được không?", "Có mẹo tính nhanh không cô?"</span>
            <button
              onClick={onClose}
              className="text-amber-700 font-semibold hover:underline"
            >
              Đã hiểu bài rồi! Tiếp tục làm bài ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
