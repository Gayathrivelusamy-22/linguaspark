export interface Question {
  id: string;
  type: 'fill-blank' | 'mcq' | 'rearrange' | 'error-correction' | 'conversation';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  category: string;
}

export interface QuestionBank {
  grammar: Record<string, Question[]>;
  vocabulary: Record<string, Question[]>;
  sentences: Record<string, Question[]>;
  chat_prompts: string[];
}
