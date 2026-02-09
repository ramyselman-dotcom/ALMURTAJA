
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Zikr } from '../types';
import ZikrCard from '../components/ZikrCard';

interface AzkarListProps {
  title: string;
  azkar: Zikr[];
  category: 'morning' | 'evening';
  theme: string;
}

const AzkarList: React.FC<AzkarListProps> = ({ title, azkar, category, theme }) => {
  const [progress, setProgress] = useState<Record<number, number>>({});
  const storageKey = `azkar-progress-v2-${category}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const increment = (id: number, max: number) => {
    const newProgress = {
      ...progress,
      [id]: Math.min((progress[id] || 0) + 1, max)
    };
    setProgress(newProgress);
    localStorage.setItem(storageKey, JSON.stringify(newProgress));
  };

  const reset = () => {
    if (confirm('تصفير العداد؟')) {
      setProgress({});
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className={`min-h-screen ${theme} pb-20`}>
      <header className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold font-naskh">{title}</h1>
          </div>
          <button onClick={reset} className="text-slate-400 hover:text-white transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-8 mt-4">
        {azkar.map((zikr) => {
          const current = progress[zikr.id] || 0;
          const done = current >= zikr.count;
          return (
            <div 
              key={zikr.id}
              onClick={() => !done && increment(zikr.id, zikr.count)}
              className={`glass p-8 rounded-[2rem] transition-all cursor-pointer select-none active:scale-[0.98] ${
                done ? 'border-emerald-500/30 opacity-60' : 'hover:border-white/20'
              }`}
            >
              <p className="text-2xl font-naskh leading-[2.2] text-right text-slate-100 mb-8">
                {zikr.text}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${
                    done ? 'bg-emerald-500 text-white' : 'bg-white/10 text-amber-500'
                  }`}>
                    {done ? <CheckCircle2 className="w-8 h-8" /> : current}
                  </div>
                  <span className="text-slate-500 text-sm">من أصل {zikr.count}</span>
                </div>
                <span className="text-xs text-slate-500 italic">{zikr.benefit}</span>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default AzkarList;
