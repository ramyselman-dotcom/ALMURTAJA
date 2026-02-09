
import React, { useState } from 'react';
import { Check, Info, Sparkles, Loader2 } from 'lucide-react';
import { Zikr } from '../types';
import { getZikrReflection } from '../services/geminiService';

interface ZikrCardProps {
  zikr: Zikr;
  currentCount: number;
  onIncrement: () => void;
  isCompleted: boolean;
}

const ZikrCard: React.FC<ZikrCardProps> = ({ zikr, currentCount, onIncrement, isCompleted }) => {
  const [reflection, setReflection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReflection = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (reflection) {
      setReflection(null);
      return;
    }
    setLoading(true);
    const res = await getZikrReflection(zikr.text);
    setReflection(res);
    setLoading(false);
  };

  return (
    <div 
      onClick={() => !isCompleted && onIncrement()}
      className={`relative p-6 rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer active:scale-95 ${
        isCompleted 
          ? 'bg-emerald-50 border-emerald-200 opacity-80' 
          : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
        }`}>
          {zikr.benefit}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleReflection}
            className="p-1.5 rounded-full hover:bg-amber-50 text-amber-600 transition-colors"
            title="تأمل روحي"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          </button>
          {isCompleted && (
            <div className="bg-emerald-500 rounded-full p-1 shadow-sm animate-in fade-in zoom-in duration-300">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>

      <p className="text-2xl font-arabic leading-[1.8] text-slate-800 mb-6 text-center select-none">
        {zikr.text}
      </p>

      {reflection && (
        <div className="mb-6 p-4 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-slate-600 leading-relaxed animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-1.5 mb-1 text-amber-700 font-bold">
            <Info className="w-3.5 h-3.5" />
            <span>تأمل</span>
          </div>
          {reflection}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-3xl font-extrabold transition-colors ${
            isCompleted ? 'text-emerald-600' : 'text-indigo-600'
          }`}>
            {currentCount}
          </span>
          <span className="text-slate-400 text-sm">من {zikr.count}</span>
        </div>
        
        {!isCompleted && (
          <div className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold shadow-md shadow-indigo-100 group-hover:bg-indigo-700 transition-colors">
            تـسبيح
          </div>
        )}
      </div>
    </div>
  );
};

export default ZikrCard;
