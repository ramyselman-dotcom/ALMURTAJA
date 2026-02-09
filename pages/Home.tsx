
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Clock, Book, ChevronLeft, Sparkles, Download } from 'lucide-react';
import { LiveAssistant } from '../components/LiveAssistant';

const Home: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('صباح الخير والبركة');
    else if (hour >= 12 && hour < 17) setGreeting('طاب يومك بذكر الله');
    else if (hour >= 17 && hour < 21) setGreeting('مساء السكينة والنور');
    else setGreeting('ليلة هادئة في حفظ الله');

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (!isStandalone) {
      setShowInstallPrompt(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Top Banner */}
      <div className="relative h-64 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="z-10 text-center px-6 animate-in fade-in zoom-in duration-700">
          <h1 className="text-6xl font-black mb-2 font-naskh tracking-wider gradient-text">المُرتجى</h1>
          <p className="text-slate-500 text-sm tracking-[0.3em] uppercase mb-4">زاد المسلم ورفيقه</p>
          <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-xs text-slate-300 font-light">{greeting}</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-24 -mt-8 space-y-6">
        
        {/* Install Prompt - Only shows on mobile browser */}
        {showInstallPrompt && (
          <div className="glass p-4 rounded-3xl border-amber-500/20 bg-amber-500/5 flex items-center justify-between animate-in slide-in-from-top-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                 <Download className="w-5 h-5 text-amber-500" />
               </div>
               <div>
                 <p className="text-sm font-bold">ثبت التطبيق على هاتفك</p>
                 <p className="text-[10px] text-slate-400">للوصول السريع وتجربة أفضل</p>
               </div>
             </div>
             <button 
              onClick={() => {
                alert('للأندرويد: اضغط على نقاط القائمة (⋮) ثم "تثبيت التطبيق".\nللآيفون: اضغط على زر المشاركة (⎙) ثم "إضافة للشاشة الرئيسية".');
                setShowInstallPrompt(false);
              }}
              className="text-xs bg-amber-500 text-black font-bold px-4 py-2 rounded-xl"
             >
               كيفية التثبيت
             </button>
          </div>
        )}

        {/* Featured Section: Prayer Times */}
        <Link to="/prayer-times" className="block relative group overflow-hidden rounded-[2.5rem] animate-gold">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 group-hover:from-amber-500/30 group-hover:to-orange-600/30 transition-all duration-500" />
          <div className="glass-gold p-8 relative flex items-center justify-between border-amber-500/30">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-amber-500/20 flex items-center justify-center backdrop-blur-md">
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold font-naskh">مواقيت الصلاة</h2>
                <p className="text-amber-200/60 text-sm mt-1">حسب موقعك الجغرافي الحالي</p>
              </div>
            </div>
            <ChevronLeft className="w-6 h-6 text-amber-500 group-hover:-translate-x-2 transition-transform" />
          </div>
        </Link>

        {/* Secondary Services Grid */}
        <div className="grid gap-4">
          <Link to="/quran" className="glass group p-6 rounded-[2rem] flex items-center justify-between hover:bg-white/[0.07] transition-all border-emerald-500/10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Book className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-right">
                <h2 className="text-lg font-bold font-naskh">القرآن الكريم</h2>
                <p className="text-xs text-slate-500">استماع لأكثر من 100 قارئ</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link to="/morning" className="glass group p-6 rounded-[2rem] flex flex-col items-center text-center hover:bg-white/[0.07] transition-all border-sky-500/10">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-4">
                <Sun className="w-7 h-7 text-sky-400" />
              </div>
              <h2 className="font-bold font-naskh">أذكار الصباح</h2>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Morning Azkar</p>
            </Link>

            <Link to="/evening" className="glass group p-6 rounded-[2rem] flex flex-col items-center text-center hover:bg-white/[0.07] transition-all border-indigo-500/10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <Moon className="w-7 h-7 text-indigo-400" />
              </div>
              <h2 className="font-bold font-naskh">أذكار المساء</h2>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Evening Azkar</p>
            </Link>
          </div>
        </div>

        <footer className="pt-12 text-center">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto mb-6" />
          <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase font-light">
            © 1446 AH • Al-Murtaja Platform
          </p>
        </footer>
      </div>
      <LiveAssistant />
    </div>
  );
};

export default Home;
