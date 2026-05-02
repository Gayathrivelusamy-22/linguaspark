import { World } from './types';

export const WORLDS: World[] = [
  {
    id: 'basic-island',
    name: 'Basic Words Island',
    description: 'Master the basics of English greetings and common words.',
    icon: '🏝️',
    color: 'from-cyan-400 to-blue-500',
    adventures: [
      { id: 'adv-basic', title: 'Start Here', type: 'vocabulary', xp: 20, exercises: [] }
    ]
  },
  {
    id: 'daily-city',
    name: 'Daily Life City',
    description: 'Learn to navigate daily routines and interactions.',
    icon: '🏙️',
    color: 'from-emerald-400 to-teal-500',
    adventures: [
      { id: 'adv-city', title: 'City Life', type: 'practice', xp: 25, exercises: [] }
    ]
  },
  {
    id: 'grammar-mountains',
    name: 'Grammar Mountains',
    description: 'Climb the peaks of English structure.',
    icon: '⛰️',
    color: 'from-purple-400 to-indigo-600',
    adventures: [
      { id: 'adv-grammar', title: 'Peak Mastery', type: 'grammar', xp: 30, exercises: [] }
    ]
  },
  {
    id: 'conv-cafe',
    name: 'Conversation Cafe',
    description: 'Practice real-world small talk.',
    icon: '☕',
    color: 'from-orange-400 to-pink-500',
    adventures: []
  },
  {
    id: 'job-office',
    name: 'Job Office',
    description: 'Prepare for professional success.',
    icon: '💼',
    color: 'from-slate-500 to-slate-800',
    adventures: []
  }
];
