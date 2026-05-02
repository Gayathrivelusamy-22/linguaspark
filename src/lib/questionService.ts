import questionsData from '../data/questions.json';
import { QuestionBank, Question } from '../data/types';

const bank = questionsData as unknown as QuestionBank;

export function getRandomQuestions(category: 'grammar' | 'vocabulary' | 'sentences', subCategory: string, count: number = 5): Question[] {
  const source = bank[category][subCategory] || [];
  if (source.length === 0) return [];

  // Shuffle and pick
  const shuffled = [...source].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getChatPrompts(): string[] {
  return [...bank.chat_prompts].sort(() => 0.5 - Math.random());
}

export function getQuestionsForWorld(worldId: string): Question[] {
  // Mapping world IDs to specific categories in the bank
  switch (worldId) {
    case 'basic-island':
      return [
        ...getRandomQuestions('vocabulary', 'basic_words', 7),
        ...getRandomQuestions('grammar', 'present_tense', 3)
      ];
    case 'daily-city':
      return [
        ...getRandomQuestions('vocabulary', 'travel', 3),
        ...getRandomQuestions('sentences', 'daily_life_city', 7)
      ];
    case 'grammar-mountains':
      return getRandomQuestions('grammar', 'grammar_mountains', 10);
    case 'conv-cafe':
      return getRandomQuestions('sentences', 'conversation_cafe', 10);
    case 'job-office':
      return getRandomQuestions('sentences', 'job_office', 10);
    default:
      return getRandomQuestions('grammar', 'present_tense', 5);
  }
}
