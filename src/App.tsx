import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Zap, 
  Sparkles, 
  Map as MapIcon, 
  MessageCircle, 
  User as UserIcon,
  Home as HomeIcon,
  Trophy,
  ArrowRight,
  LogOut,
  Mic,
  Target
} from 'lucide-react';
import { auth, signInWithGoogle } from './lib/firebase';
import { useUser } from './hooks/useUser';
import { WORLDS } from './constants';
import { cn } from './lib/utils';
import { Toaster, toast } from 'react-hot-toast';
import { BuddyChat } from './components/BuddyChat';

// --- Sub-components ---

const NavBar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
    {[
      { id: 'dashboard', icon: HomeIcon, label: 'Home' },
      { id: 'map', icon: MapIcon, label: 'Worlds' },
      { id: 'level', icon: Target, label: 'Level' },
      { id: 'buddy', icon: MessageCircle, label: 'Buddy' },
      { id: 'profile', icon: UserIcon, label: 'Me' },
    ].map((tab) => (
      <button 
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={cn(
          "flex flex-col items-center gap-1 transition-all",
          activeTab === tab.id ? "text-brand-primary scale-110" : "text-slate-400"
        )}
      >
        <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
        <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
      </button>
    ))}
  </div>
);

const Header = ({ stats }: { stats: any }) => (
  <div className="flex justify-between items-center px-6 py-4 fixed top-0 left-0 right-0 bg-[#FDFCFB]/80 backdrop-blur-sm z-40">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden">
        <Sparkles size={20} className="animate-sparkle" />
      </div>
      <h1 className="text-xl font-black text-slate-800 tracking-tight">LinguaSpark</h1>
    </div>
    <div className="flex gap-3">
      <div className="flex items-center gap-1.5 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full font-bold text-sm border border-orange-200">
        <Flame size={16} fill="currentColor" />
        {stats?.streak || 0}
      </div>
      <div className="flex items-center gap-1.5 bg-cyan-100 text-cyan-600 px-3 py-1.5 rounded-full font-bold text-sm border border-cyan-200">
        <Zap size={16} fill="currentColor" />
        {stats?.energy || 0}
      </div>
    </div>
  </div>
);

// --- Pages ---

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const { user } = useUser();
  
  const handleAction = () => {
    if (user) {
      onStart();
    } else {
      signInWithGoogle();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-[#FDFCFB] overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-20 -right-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-60" />
      
      <div className="relative mb-12">
        {/* Sparkle background glow */}
        <div className="absolute inset-0 bg-brand-primary/20 blur-3xl -z-10 rounded-full scale-150 animate-pulse" />
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 bg-white p-3 rounded-2xl shadow-xl z-20"
        >
          <Trophy className="text-yellow-500" size={24} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-8 bg-white p-3 rounded-2xl shadow-xl z-20"
        >
          <MessageCircle className="text-blue-500" size={24} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-44 h-44 bg-brand-primary rounded-[48px] flex items-center justify-center text-white shadow-[0_20px_50px_rgba(255,133,82,0.3)] relative z-10"
        >
          <Sparkles size={88} strokeWidth={2.5} />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
          Hello, <span className="text-brand-primary">Sparker!</span> ✨
        </h1>
        
        <p className="text-slate-500 mb-12 max-w-sm font-semibold text-lg leading-relaxed">
          Ready to turn your English dreams into reality? Let's start the adventure of a lifetime! 🌍
        </p>

        <button 
          onClick={handleAction}
          className="btn-primary w-full max-w-xs flex items-center justify-center gap-3 py-5 text-xl shadow-[0_15px_30px_rgba(255,133,82,0.4)]"
        >
          Start Adventure
          <ArrowRight size={24} />
        </button>
        
        <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🎮</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Play</span>
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">👂</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Listen</span>
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🗣️</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Speak</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const OnboardingPage = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const goals = [
    { id: 'study', label: 'Study 📚', desc: 'Accelerate your learning' },
    { id: 'job', label: 'Job 💼', desc: 'Get ready for interviews' },
    { id: 'travel', label: 'Travel ✈️', desc: 'Speak confidently abroad' },
    { id: 'confidence', label: 'Speaking Confidence 🎤', desc: 'Master public speaking' },
  ];

  const levels = [
    { id: 'beginner', label: 'Beginner 👶', desc: "I'm brand new" },
    { id: 'know-little', label: 'Know a little 🤏', desc: "Small vocabulary" },
    { id: 'understand-no-speak', label: 'Understand but can\'t speak 🤐', desc: "Need confidence" },
  ];

  const handleNext = () => {
    if (!selectedId) return;
    
    if (step === 0) {
      setData({ ...data, learningGoal: selectedId });
      setStep(1);
      setSelectedId(null);
    } else {
      onComplete({ ...data, currentLevel: selectedId, onboardingComplete: true });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 p-8 pt-20">
        <div className="mb-12">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-8">
            <motion.div 
              className="bg-brand-primary h-full"
              initial={{ width: '0%' }}
              animate={{ width: step === 0 ? '50%' : '100%' }}
            />
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 mb-4">
            {step === 0 ? "Why do you want to learn English?" : "What's your current level?"}
          </h2>
        </div>

        <div className="space-y-4">
          {(step === 0 ? goals : levels).map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "w-full flex flex-col items-start gap-1 p-6 rounded-3xl border-2 transition-all text-left",
                selectedId === item.id 
                  ? "border-brand-primary bg-orange-50 shadow-sm" 
                  : "border-slate-100 hover:border-brand-primary/50"
              )}
            >
              <span className="text-xl font-bold">{item.label}</span>
              {item.desc && <span className="text-sm text-slate-400 font-medium">{item.desc}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 sticky bottom-0 bg-white border-t border-slate-50">
        <button 
          disabled={!selectedId}
          onClick={handleNext}
          className="btn-primary w-full py-5 text-xl shadow-[0_15px_30px_rgba(255,133,82,0.2)]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const WorldCard = ({ world, onSelect }: { world: any, onSelect: (w: any) => void }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(world)}
    className={cn(
      "relative w-full h-48 rounded-[32px] overflow-hidden cursor-pointer shadow-xl mb-6 flex flex-col justify-end p-6 text-white",
      "bg-gradient-to-br",
      world.color
    )}
  >
    <div className="absolute top-4 right-4 text-4xl opacity-40 grayscale-[0.5]">
      {world.icon}
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl font-black mb-1">{world.name}</h3>
      <p className="text-sm font-medium opacity-80 line-clamp-1">{world.description}</p>
    </div>
    <div className="absolute inset-0 bg-black/5 pointer-events-none" />
  </motion.div>
);

import { getQuestionsForWorld } from './lib/questionService';
import { Question as DataQuestion } from './data/types';

const LessonView = ({ world, onClose, onFinish }: { world: any, onClose: () => void, onFinish: (xp: number) => void }) => {
  const [questions, setQuestions] = useState<DataQuestion[]>([]);
  const [exIndex, setExIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Load random questions for this world on mount
  React.useEffect(() => {
    const loaded = getQuestionsForWorld(world.id);
    setQuestions(loaded);
  }, [world.id]);

  if (questions.length === 0) return null;
  const currentEx = questions[exIndex];

  const handleCheck = () => {
    if (currentEx.type === 'chat_prompt') {
      if (selected && selected.length > 2) {
        setIsCorrect(true);
        toast.success('Great effort! +10 ✨', { icon: '✨' });
      } else {
        toast.error('Try to say a bit more!');
      }
      return;
    }

    if (selected === currentEx.correctAnswer) {
      setIsCorrect(true);
      toast.success('Amazing! +10 ✨', { icon: '✨' });
    } else {
      setIsCorrect(false);
      toast.error('Not quite! Try again.');
    }
  };

  const handleNext = () => {
    if (exIndex < questions.length - 1) {
      setExIndex(exIndex + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      onFinish(world.adventures[0]?.xp || 20); // Base XP
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400">✕</button>
        <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-brand-primary h-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((exIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2 block">
          {currentEx.category || 'Topic'} • {currentEx.type.replace('-', ' ')}
        </span>
        <h2 className="text-2xl font-black text-slate-800 mb-8">{currentEx.question}</h2>

        <div className="space-y-4">
          {(currentEx.type === 'mcq' || (currentEx.type === 'fill-blank' && currentEx.options)) && (currentEx.options || []).map((opt) => (
            <button
              key={opt}
              onClick={() => !isCorrect && setSelected(opt)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border-2 font-bold transition-all text-lg",
                selected === opt ? "border-brand-primary bg-orange-50 text-brand-primary" : "border-slate-100 bg-white",
                isCorrect === true && opt === currentEx.correctAnswer && "border-green-500 bg-green-50 text-green-700",
                isCorrect === false && opt === selected && "border-red-500 bg-red-50 text-red-700"
              )}
            >
              {opt}
            </button>
          ))}

          {(currentEx.type === 'rearrange' || (currentEx.type === 'fill-blank' && !currentEx.options)) && (
             <div className="space-y-4">
                <input 
                  type="text" 
                  value={selected || ''} 
                  onChange={(e) => setSelected(e.target.value)}
                  placeholder={currentEx.type === 'rearrange' ? "Type the sentence here..." : "Type the missing word(s)..."}
                  className="w-full p-4 rounded-2xl border-2 border-slate-100 font-bold text-lg focus:border-brand-primary outline-none"
                />
                {currentEx.type === 'rearrange' && (
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest px-2">Hint: Use the words provided in the question above.</p>
                )}
             </div>
          )}

          {currentEx.type === 'chat_prompt' && (
             <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 relative">
                  <div className="absolute -top-3 -left-3 bg-brand-primary text-white p-2 rounded-full shadow-lg">
                    <MessageCircle size={16} />
                  </div>
                  <p className="text-slate-600 font-medium italic">"Try to answer Sparky in full sentences!"</p>
                </div>
                <input 
                  type="text" 
                  value={selected || ''} 
                  onChange={(e) => setSelected(e.target.value)}
                  placeholder="Your answer here..."
                  className="w-full p-5 rounded-3xl border-2 border-slate-100 font-bold text-lg focus:border-brand-primary outline-none shadow-sm"
                />
                <div className="flex justify-center">
                  <button 
                    type="button"
                    className="p-4 bg-slate-100 text-slate-400 rounded-full hover:bg-orange-100 hover:text-brand-primary transition-all"
                    onClick={() => {
                      if (!('webkitSpeechRecognition' in window)) return toast.error("Speech recognition not supported");
                      const recognition = new (window as any).webkitSpeechRecognition();
                      recognition.lang = 'en-US';
                      recognition.onresult = (event: any) => setSelected(event.results[0][0].transcript);
                      recognition.start();
                    }}
                  >
                    <Mic size={24} />
                  </button>
                </div>
             </div>
          )}
        </div>

        {isCorrect && currentEx.explanation && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100"
          >
            <p className="text-sm font-bold text-blue-700">💡 Spark Tip:</p>
            <p className="text-sm text-blue-600">{currentEx.explanation}</p>
          </motion.div>
        )}
      </div>

      <div className="pt-4 pb-8 sticky bottom-0 bg-white mt-auto">
        {!isCorrect ? (
          <button 
            disabled={!selected}
            onClick={handleCheck}
            className="btn-primary w-full py-4 text-lg"
          >
            Check Spark
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="w-full bg-green-500 text-white rounded-2xl py-4 text-xl font-black shadow-lg shadow-green-100"
          >
            Continue Adventure
          </button>
        )}
      </div>
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const { user, stats, loading, updateStats } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWorld, setActiveWorld] = useState<any>(null);
  const [showSplash, setShowSplash] = useState(true);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={40} className="text-brand-primary" />
      </motion.div>
      <p className="font-bold text-slate-400 tracking-widest text-xs uppercase">Charging Sparks...</p>
    </div>
  );

  // If we are showing the splash/landing page
  if (showSplash || !user) {
    return (
      <LandingPage onStart={() => setShowSplash(false)} />
    );
  }

  if (!stats?.onboardingComplete) return <OnboardingPage onComplete={updateStats} />;

  const handleFinishAdventure = async (xp: number) => {
    setActiveWorld(null);
    await updateStats({
      sparkPoints: stats.sparkPoints + xp,
      energy: Math.max(0, stats.energy - 1)
    });
    toast.success('Adventure Complete! ✨', { duration: 3000 });
  };

  const visibleWorlds = WORLDS.filter(world => {
    if (!stats?.currentLevel) return true;
    if (stats.currentLevel === 'beginner') return ['basic-island'].includes(world.id);
    if (stats.currentLevel === 'know-little') return ['daily-city', 'grammar-mountains'].includes(world.id);
    if (stats.currentLevel === 'understand-no-speak') return ['conv-cafe', 'job-office'].includes(world.id);
    return true;
  });

  return (
    <div className="min-h-screen pb-24 font-medium transition-colors">
      <Toaster position="top-center" />
      <Header stats={stats} />
      
      <main className="pt-24 px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dash" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="soft-card pastel-gradient-1 border-0 text-white p-8">
                <p className="text-sm font-bold opacity-80 mb-2">DAILY GOAL</p>
                <div className="flex items-end justify-between mb-4">
                  <h3 className="text-4xl font-black">{stats.sparkPoints} ✨</h3>
                  <p className="text-xs font-black tracking-widest uppercase opacity-60">Points Collected</p>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (stats.sparkPoints / 100) * 100)}%` }}
                    className="bg-white h-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-[2rem]">
                  <p className="text-orange-800 font-bold italic mb-4">
                    "Setting goals is the first step in turning the invisible into the visible." ✨
                  </p>
                  <button 
                    onClick={() => setActiveWorld(visibleWorlds[0] || WORLDS[0])}
                    className="btn-primary w-full shadow-orange-100"
                  >
                    Continue Adventure 🚀
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-slate-800">Explore Worlds</h2>
                  <Trophy size={20} className="text-brand-primary" />
                </div>
                <div className="grid gap-2">
                  {visibleWorlds.map((world) => (
                    <div key={world.id}>
                      <WorldCard world={world} onSelect={setActiveWorld} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 pb-12"
            >
              <div className="px-2">
                <h2 className="text-3xl font-black text-slate-800 mb-2">Adventure Map</h2>
                <p className="text-slate-500 font-medium">Explore new territories and unlock English secrets. 🗺️</p>
              </div>

              <div className="relative">
                {/* Vertical Path Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 z-0 rounded-full" />
                
                <div className="space-y-12 relative z-10">
                  {visibleWorlds.map((world, idx) => (
                    <motion.div 
                      key={world.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "flex items-center gap-6",
                        idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      )}
                    >
                      <div className="flex-1">
                        <WorldCard world={world} onSelect={setActiveWorld} />
                      </div>
                      <div className="relative flex flex-col items-center">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg border-4 border-white z-10",
                          "bg-gradient-to-br",
                          world.color
                        )}>
                          {idx + 1}
                        </div>
                        {idx < visibleWorlds.length - 1 && (
                          <div className="h-12 w-0.5 bg-slate-100" />
                        )}
                      </div>
                      <div className="flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'level' && (
            <motion.div 
              key="level"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="px-2">
                <h2 className="text-3xl font-black text-slate-800 mb-2">My English Level</h2>
                <p className="text-slate-500 font-medium">Choose a level that matches your current skills. 🎯</p>
              </div>

              <div className="grid gap-4">
                {(['beginner', 'know-little', 'understand-no-speak'] as const).map((id) => {
                  const labels: Record<string, string> = {
                    'beginner': 'Beginner 👶',
                    'know-little': 'Know a little 🤏',
                    'understand-no-speak': 'Understand but can\'t speak 🤐'
                  };
                  const descriptions: Record<string, string> = {
                    'beginner': 'Total start. Learning basic words.',
                    'know-little': 'I know some words and basic sentences.',
                    'understand-no-speak': 'I understand well but struggle to reply.'
                  };

                  return (
                    <button
                      key={id}
                      onClick={() => {
                        updateStats({ currentLevel: id });
                        toast.success(`Level changed to ${labels[id].split(' ')[0]}!`, { icon: '🎯' });
                      }}
                      className={cn(
                        "flex flex-col items-start p-6 rounded-[2rem] border-2 transition-all text-left",
                        stats.currentLevel === id 
                          ? "border-brand-primary bg-orange-50 shadow-sm" 
                          : "border-slate-100 bg-white hover:border-slate-200"
                      )}
                    >
                      <div className="flex justify-between items-center w-full mb-1">
                        <span className="text-xl font-black text-slate-800">{labels[id]}</span>
                        {stats.currentLevel === id && (
                          <div className="bg-brand-primary text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase">Selected</div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-400">{descriptions[id]}</p>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100">
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Changing your level will update the <span className="font-bold text-slate-700">Adventure Map</span> and available <span className="font-bold text-slate-700">Worlds</span> to match your needs.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'buddy' && (
            <motion.div 
              key="buddy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center px-2">
                <h2 className="text-2xl font-black text-slate-800">Chat with Sparky</h2>
                <Sparkles size={20} className="text-brand-primary" />
              </div>
              <BuddyChat />
              <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest px-8">
                Practice speaking and Sparky will help you improve! ⚡
              </p>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile" className="space-y-6">
              <div className="flex flex-col items-center py-8">
                <div className="w-24 h-24 rounded-[32px] overflow-hidden mb-4 border-4 border-white shadow-xl">
                  <img src={stats.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${stats.uid}`} alt="Avatar" />
                </div>
                <h2 className="text-2xl font-black text-slate-800">{stats.displayName}</h2>
                <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">Member since 2024</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="soft-card flex flex-col items-center gap-2 p-4">
                  <Flame className="text-orange-500" />
                  <span className="text-xl font-black">{stats.streak}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400">Day Streak</span>
                </div>
                <div className="soft-card flex flex-col items-center gap-2 p-4">
                  <Trophy className="text-yellow-500" />
                  <span className="text-xl font-black">{Math.floor(stats.sparkPoints / 50)}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400">Badges</span>
                </div>
              </div>

              <button 
                onClick={() => auth.signOut()}
                className="w-full flex items-center justify-center gap-3 py-4 text-red-500 font-bold border-2 border-red-50"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeWorld && (
        <LessonView 
          world={activeWorld} 
          onClose={() => setActiveWorld(null)} 
          onFinish={handleFinishAdventure}
        />
      )}
    </div>
  );
}
