export interface UserStats {
  uid: string;
  displayName: string;
  photoURL?: string;
  energy: number;
  maxEnergy: number;
  sparkPoints: number;
  streak: number;
  lastActive: string;
  onboardingComplete: boolean;
  learningGoal?: 'study' | 'job' | 'travel' | 'confidence';
  currentLevel?: 'beginner' | 'know-little' | 'understand-no-speak' | 'intermediate' | 'advanced';
}

export interface World {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  adventures: Adventure[];
}

export interface Adventure {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'practice' | 'quiz';
  xp: number;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  type: 'listen-choose' | 'arrange-sentence' | 'speak-practice' | 'speed-match' | 'quiz';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audioUrl?: string;
}
