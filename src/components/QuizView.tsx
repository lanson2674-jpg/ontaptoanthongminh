import React, { useState, useEffect } from 'react';
import { QuizSession, Question } from '../types';
import { Volume2, VolumeX, Edit3, HelpCircle, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface QuizViewProps {
  session: QuizSession;
  onAnswerQuestion: (questionId: string | number, selectedOptionIndex: number) => void;
  onFinishQuiz: () => void;
  onOpenScratchpad: () => void;
  onOpenTutor: (question: Question, studentAnswerText: string, correctAnswerText: string) => void;
  onExitQuiz: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  session,
  onAnswerQuestion,
  onFinishQuiz,
  onOpenScratchpad,
  onOpenTutor,
  onExitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentQ = session.questions[currentIndex];
  const currentAnswer = session.answers[currentQ?.id];
  const isAnswered = currentAnswer !== undefined;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return; // Prevent changing after answered to ensure genuine attempt
    sound.playClick();
    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    onAnswerQuestion(currentQ.id, idx);
  };

  const handleNext = () => {
    sound.playClick();
    setShowHint(false);
    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinishQuiz();
    }
  };

  const handlePrev = () => {
    sound.playClick();
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const readQuestionAloud = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    const textToRead = `${currentQ.question}. Các phương án: ${currentQ.options
      .map((opt, i) => `Phương án ${String.fromCharCode(65 + i)}: ${opt}`)
      .join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    setIsReadingAloud(true);
    window.speechSynthesis.speak(utterance);
  };

  const totalQuestions = session.questions.length;
  const answeredCount = Object.keys(session.answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      {/* Top Bar with Timer, Progress & Scratchpad toggle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Grade & Topic Info */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExitQuiz}
            className="text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 font-semibold"
            title="Dừng làm bài & Thoát"
          >
            ← Đổi đề
          </button>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-300">
            Lớp {session.grade}
          </span>
          <span className="text-xs text-slate-600 font-medium truncate max-w-[180px] sm:max-w-xs">
            {session.topic.title}
          </span>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-700 text-xs font-mono font-bold">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>{formatTime(elapsedSeconds)}</span>
        </div>

        {/* Right: Scratchpad Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenScratchpad}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Mở bảng nháp điện tử để tính toán"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Bảng Nháp</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-600 font-semibold px-1">
          <span>Câu {currentIndex + 1} / {totalQuestions}</span>
          <span>Đã hoàn thành: {answeredCount}/{totalQuestions} câu</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-amber-200 relative overflow-hidden">
        {/* Question Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Câu hỏi số {currentIndex + 1}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Read aloud TTS button */}
            <button
              onClick={readQuestionAloud}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                isReadingAloud
                  ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
              }`}
              title="Nghe cô đọc to đề bài"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isReadingAloud ? 'Đang đọc...' : 'Đọc đề'}</span>
            </button>

            {/* Hint toggle button */}
            {currentQ.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                title="Xem mẹo gợi ý"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Gợi ý</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="my-6">
          <div className="text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed font-['Baloo_2',sans-serif] flex items-start gap-3">
            {currentQ.visualEmoji && (
              <span className="text-3xl sm:text-4xl shrink-0 p-1 bg-amber-50 rounded-2xl border border-amber-200">
                {currentQ.visualEmoji}
              </span>
            )}
            <p className="flex-1">{currentQ.question}</p>
          </div>

          {/* Hint Card */}
          {showHint && currentQ.hint && (
            <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2 animate-in fade-in">
              <span className="text-base">💡</span>
              <div>
                <span className="font-bold">Mẹo gợi ý: </span>
                {currentQ.hint}
              </div>
            </div>
          )}
        </div>

        {/* Options List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
          {currentQ.options.map((optionText, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
            const isSelected = currentAnswer?.selectedOptionIndex === optIdx;
            const isCorrectOption = optIdx === currentQ.correctIndex;

            let optionStyle = 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';
            let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';

            if (isAnswered) {
              if (isCorrectOption) {
                // Correct option (always show in green)
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                badgeStyle = 'bg-emerald-500 text-white border-emerald-600';
              } else if (isSelected && !isCorrectOption) {
                // Student picked wrong option (show in red)
                optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300';
                badgeStyle = 'bg-rose-500 text-white border-rose-600';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50/60 opacity-60 text-slate-500';
              }
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                disabled={isAnswered}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer shadow-2xs ${optionStyle} ${
                  !isAnswered ? 'hover:-translate-y-0.5' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${badgeStyle}`}
                >
                  {letter}
                </div>
                <div className="flex-1 font-semibold text-sm sm:text-base leading-snug">
                  {optionText}
                </div>
                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & AI Tutor Trigger Area (Shown after answer is selected) */}
        {isAnswered && (
          <div className="mt-6 pt-5 border-t border-slate-200">
            {currentAnswer.isCorrect ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎉</span>
                  <div>
                    <h4 className="font-extrabold text-emerald-900 text-base">
                      Chính xác tuyệt vời! Thầy/Cô khen em nhé!
                    </h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>{currentIndex < totalQuestions - 1 ? 'Câu tiếp theo ➔' : 'Xem Giấy Khen ➔'}</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🦉</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-rose-900 text-base">
                        Chưa chính xác rồi, đừng buồn nhé!
                      </h4>
                      <span className="text-[11px] bg-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                        Cần ôn lại
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">
                      Đáp án đúng là phương án{' '}
                      <span className="font-bold text-emerald-700">
                        {String.fromCharCode(65 + currentQ.correctIndex)}: {currentQ.options[currentQ.correctIndex]}
                      </span>
                    </p>
                    <p className="text-xs text-slate-600 italic mt-0.5">
                      Đừng lo, hãy để Gia sư AI giảng giải chi tiết để em hiểu tận gốc nhé!
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() =>
                      onOpenTutor(
                        currentQ,
                        currentQ.options[currentAnswer.selectedOptionIndex],
                        currentQ.options[currentQ.correctIndex]
                      )
                    }
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>🤖 Gia Sư AI Giảng Bài</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Tiếp tục ➔</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation and Question Grid Quick Jump */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        {/* Quick jump question numbers */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg">
          {session.questions.map((q, idx) => {
            const ans = session.answers[q.id];
            const isCur = idx === currentIndex;
            let dotStyle = 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200';
            if (ans !== undefined) {
              dotStyle = ans.isCorrect
                ? 'bg-emerald-500 text-white border-emerald-600'
                : 'bg-rose-500 text-white border-rose-600';
            }
            if (isCur) {
              dotStyle += ' ring-2 ring-amber-400 font-black scale-110';
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-semibold border flex items-center justify-center transition-all cursor-pointer ${dotStyle}`}
                title={`Câu ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>{currentIndex === totalQuestions - 1 ? 'Hoàn thành bài' : 'Câu tiếp'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
