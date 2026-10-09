export type GradeId = 1 | 2 | 3 | 4 | 5;

export type DifficultyLevel = 'yeu' | 'trung_binh' | 'kha' | 'gioi' | 'nang_cao';

export interface DifficultyInfo {
  id: DifficultyLevel;
  name: string;
  tagline: string;
  badgeColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: string;
  stars: number;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
  grade: GradeId;
  icon: string;
  description: string;
  sampleKeywords: string[];
}

export interface Question {
  id: number | string;
  grade: GradeId;
  topicId: string;
  difficulty: DifficultyLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  visualEmoji?: string;
  categoryTag?: string;
}

export interface StudentAnswer {
  questionId: number | string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface QuizSession {
  studentName: string;
  grade: GradeId;
  topic: Topic;
  difficulty: DifficultyLevel;
  questionCount: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string | number, StudentAnswer>;
  startTime: number;
  endTime?: number;
  completed: boolean;
}

export interface QuizSummary {
  id: string;
  date: string;
  studentName: string;
  grade: GradeId;
  topicTitle: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  scoreOutOf10: number;
  percentage: number;
  durationSeconds: number;
  rankTitle: string;
  certificateId: string;
}
