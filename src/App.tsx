import React, { useState, useEffect } from 'react';
import { GradeId, DifficultyLevel, Topic, QuizSession, QuizSummary, Question } from './types';
import { CURRICULUM_BY_GRADE, DIFFICULTY_LEVELS, generateQuestionsForSession } from './data/curriculum';
import { Navbar } from './components/Navbar';
import { SetupView } from './components/SetupView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { Scratchpad } from './components/Scratchpad';
import { TutorModal } from './components/TutorModal';
import { Certificate } from './components/Certificate';
import { HistoryModal } from './components/HistoryModal';
import { Confetti } from './components/Confetti';
import { sound } from './utils/audio';

export default function App() {
  // App state
  const [currentView, setCurrentView] = useState<'setup' | 'quiz' | 'result'>('setup');
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('math_student_name') || 'Nguyễn Hoàng Nam';
  });

  const [selectedGrade, setSelectedGrade] = useState<GradeId>(3);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(CURRICULUM_BY_GRADE[3][0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('trung_binh');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Active quiz session
  const [session, setSession] = useState<QuizSession | null>(null);
  const [activeSummary, setActiveSummary] = useState<QuizSummary | null>(null);

  // Modals & Extras
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // AI Tutor Modal state
  const [tutorState, setTutorState] = useState<{
    isOpen: boolean;
    question: Question | null;
    studentAnswerText: string;
    correctAnswerText: string;
  }>({
    isOpen: false,
    question: null,
    studentAnswerText: '',
    correctAnswerText: '',
  });

  // Local storage history
  const [history, setHistory] = useState<QuizSummary[]>(() => {
    try {
      const saved = localStorage.getItem('math_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist name
  useEffect(() => {
    localStorage.setItem('math_student_name', studentName);
  }, [studentName]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('math_quiz_history', JSON.stringify(history));
  }, [history]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setSoundEnabled(next);
  };

  // Start a new test
  const handleStartQuiz = () => {
    sound.playClick();
    const generatedQuestions = generateQuestionsForSession(
      selectedGrade,
      selectedTopic,
      selectedDifficulty,
      questionCount
    );

    const newSession: QuizSession = {
      studentName: studentName || 'Học Sinh Chăm Ngoan',
      grade: selectedGrade,
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      questionCount,
      questions: generatedQuestions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      completed: false,
    };

    setSession(newSession);
    setCurrentView('quiz');
  };

  // Handle student answering a question
  const handleAnswerQuestion = (questionId: string | number, selectedOptionIndex: number) => {
    if (!session) return;
    const q = session.questions.find(item => item.id === questionId);
    if (!q) return;

    const isCorrect = selectedOptionIndex === q.correctIndex;
    const updatedAnswers = {
      ...session.answers,
      [questionId]: {
        questionId,
        selectedOptionIndex,
        isCorrect,
        timeSpentSeconds: 0,
      },
    };

    setSession({
      ...session,
      answers: updatedAnswers,
    });
  };

  // Finish test & generate certificate & analytics
  const handleFinishQuiz = () => {
    if (!session) return;
    sound.playFanfare();

    const endTime = Date.now();
    const durationSec = Math.max(1, Math.round((endTime - session.startTime) / 1000));

    let correctCount = 0;
    session.questions.forEach(q => {
      const ans = session.answers[q.id];
      if (ans && ans.isCorrect) {
        correctCount++;
      }
    });

    const totalQuestions = session.questions.length;
    const incorrectCount = totalQuestions - correctCount;
    const rawScore = (correctCount / totalQuestions) * 10;
    const scoreOutOf10 = Math.round(rawScore * 10) / 10;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let rankTitle = 'HỌC SINH XUẤT SẮC TOÁN HỌC';
    if (scoreOutOf10 >= 9) {
      rankTitle = 'TRẠNG NGUYÊN TOÁN HỌC XUẤT SẮC';
    } else if (scoreOutOf10 >= 8) {
      rankTitle = 'HỌC SINH GIỎI MÔN TOÁN';
    } else if (scoreOutOf10 >= 6.5) {
      rankTitle = 'HỌC SINH KHÁ - CHĂM NGOAN TIẾN BỘ';
    } else if (scoreOutOf10 >= 5) {
      rankTitle = 'HOÀN THÀNH ĐẠT CHUẨN KIẾN THỨC';
    } else {
      rankTitle = 'TỰ TIN RÈN LUYỆN - KIÊN TRÌ VƯƠN LÊN';
    }

    const summary: QuizSummary = {
      id: `QUIZ_${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      studentName: session.studentName,
      grade: session.grade,
      topicTitle: session.topic.title,
      difficulty: session.difficulty,
      totalQuestions,
      correctCount,
      incorrectCount,
      scoreOutOf10,
      percentage,
      durationSeconds: durationSec,
      rankTitle,
      certificateId: `VNH-TTH-${session.grade}${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setActiveSummary(summary);
    setHistory(prev => [summary, ...prev]);
    setCurrentView('result');
    setShowConfetti(true);

    // Turn off confetti after 6 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  const handleOpenTutor = (question: Question, studentAnswerText: string, correctAnswerText: string) => {
    sound.playClick();
    setTutorState({
      isOpen: true,
      question,
      studentAnswerText,
      correctAnswerText,
    });
  };

  const handleCloseTutor = () => {
    setTutorState(prev => ({ ...prev, isOpen: false }));
  };

  const handleOpenCertificateFromSummary = (item: QuizSummary) => {
    setActiveSummary(item);
    setIsHistoryOpen(false);
    setIsCertificateOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffef9] text-slate-800">
      {/* Celebratory Confetti */}
      {showConfetti && <Confetti />}

      {/* Top Navigation */}
      <Navbar
        studentName={studentName}
        onOpenHistory={() => setIsHistoryOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {currentView === 'setup' && (
          <SetupView
            studentName={studentName}
            setStudentName={setStudentName}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            onStartQuiz={handleStartQuiz}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />
        )}

        {currentView === 'quiz' && session && (
          <QuizView
            session={session}
            onAnswerQuestion={handleAnswerQuestion}
            onFinishQuiz={handleFinishQuiz}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
            onOpenTutor={handleOpenTutor}
            onExitQuiz={() => {
              if (window.confirm('Em có chắc chắn muốn dừng làm bài để chọn bài học khác không?')) {
                setCurrentView('setup');
              }
            }}
          />
        )}

        {currentView === 'result' && activeSummary && session && (
          <ResultView
            summary={activeSummary}
            questions={session.questions}
            answers={session.answers}
            onViewCertificate={() => setIsCertificateOpen(true)}
            onRetry={handleStartQuiz}
            onNewQuiz={() => setCurrentView('setup')}
            onOpenTutor={handleOpenTutor}
          />
        )}
      </main>

      {/* Interactive Scratchpad */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* AI Tutor Explanation Modal */}
      {tutorState.question && (
        <TutorModal
          isOpen={tutorState.isOpen}
          onClose={handleCloseTutor}
          question={tutorState.question}
          studentAnswerText={tutorState.studentAnswerText}
          correctAnswerText={tutorState.correctAnswerText}
          grade={session?.grade || selectedGrade}
        />
      )}

      {/* Certificate of Merit Modal */}
      {isCertificateOpen && activeSummary && (
        <Certificate
          summary={activeSummary}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* History and Achievements Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectSummary={handleOpenCertificateFromSummary}
        onClearHistory={() => setHistory([])}
      />
    </div>
  );
}
