export enum Subject {
  PORTUGUESE = "Língua Portuguesa",
  MATH = "Matemática Financeira",
  BANKING = "Conhecimentos Bancários",
  IT = "Tecnologia da Informação",
  ETHICS = "Ética e Compliance",
  PROBABILITY = "Noções de Probabilidade",
  ENGLISH = "Língua Inglesa"
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  notebookId: '1' | '2' | '3' | '4'; // Identifica o caderno (1, 2, 3 ou 4)
  subject: Subject;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string; // Comentário do professor
  isAiGenerated?: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ExamState {
  status: 'idle' | 'running' | 'review' | 'results';
  mode: 'notebook' | 'official'; // Indica se é um caderno específico ou prova oficial
  notebookTitle?: string;
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  startTime: number | null;
  questions: Question[];
}