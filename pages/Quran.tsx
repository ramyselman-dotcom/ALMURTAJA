
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Play, Pause, User, Music, Loader2 } from 'lucide-react';

const SURAHS = [
  { number: 1, name: "الفاتحة", type: "مكية", ayahs: 7 },
  { number: 2, name: "البقرة", type: "مدنية", ayahs: 286 },
  { number: 3, name: "آل عمران", type: "مدنية", ayahs: 200 },
  { number: 4, name: "النساء", type: "مدنية", ayahs: 176 },
  { number: 5, name: "المائدة", type: "مدنية", ayahs: 120 },
  { number: 6, name: "الأنعام", type: "مكية", ayahs: 165 },
  { number: 7, name: "الأعراف", type: "مكية", ayahs: 206 },
  { number: 8, name: "الأنفال", type: "مدنية", ayahs: 75 },
  { number: 9, name: "التوبة", type: "مدنية", ayahs: 129 },
  { number: 10, name: "يونس", type: "مكية", ayahs: 109 },
  { number: 11, name: "هود", type: "مكية", ayahs: 123 },
  { number: 12, name: "يوسف", type: "مكية", ayahs: 111 },
  { number: 13, name: "الرعد", type: "مدنية", ayahs: 43 },
  { number: 14, name: "إبراهيم", type: "مكية", ayahs: 52 },
  { number: 15, name: "الحجر", type: "مكية", ayahs: 99 },
  { number: 16, name: "النحل", type: "مكية", ayahs: 128 },
  { number: 17, name: "الإسراء", type: "مكية", ayahs: 111 },
  { number: 18, name: "الكهف", type: "مكية", ayahs: 110 },
  { number: 19, name: "مريم", type: "مكية", ayahs: 98 },
  { number: 20, name: "طه", type: "مكية", ayahs: 135 },
  { number: 21, name: "الأنبياء", type: "مكية", ayahs: 112 },
  { number: 22, name: "الحج", type: "مدنية", ayahs: 78 },
  { number: 23, name: "المؤمنون", type: "مكية", ayahs: 118 },
  { number: 24, name: "النور", type: "مدنية", ayahs: 64 },
  { number: 25, name: "الفرقان", type: "مكية", ayahs: 77 },
  { number: 26, name: "الشعراء", type: "مكية", ayahs: 227 },
  { number: 27, name: "النمل", type: "مكية", ayahs: 93 },
  { number: 28, name: "القصص", type: "مكية", ayahs: 88 },
  { number: 29, name: "العنكبوت", type: "مكية", ayahs: 69 },
  { number: 30, name: "الروم", type: "مكية", ayahs: 60 },
  { number: 31, name: "لقمان", type: "مكية", ayahs: 34 },
  { number: 32, name: "السجدة", type: "مكية", ayahs: 30 },
  { number: 33, name: "الأحزاب", type: "مدنية", ayahs: 73 },
  { number: 34, name: "سبأ", type: "مكية", ayahs: 54 },
  { number: 35, name: "فاطر", type: "مكية", ayahs: 45 },
  { number: 36, name: "يس", type: "مكية", ayahs: 83 },
  { number: 37, name: "الصافات", type: "مكية", ayahs: 182 },
  { number: 38, name: "ص", type: "مكية", ayahs: 88 },
  { number: 39, name: "الزمر", type: "مكية", ayahs: 75 },
  { number: 40, name: "غافر", type: "مكية", ayahs: 85 },
  { number: 41, name: "فصلت", type: "مكية", ayahs: 54 },
  { number: 42, name: "الشورى", type: "مكية", ayahs: 53 },
  { number: 43, name: "الزخرف", type: "مكية", ayahs: 89 },
  { number: 44, name: "الدخان", type: "مكية", ayahs: 59 },
  { number: 45, name: "الجاثية", type: "مكية", ayahs: 37 },
  { number: 46, name: "الأحقاف", type: "مكية", ayahs: 35 },
  { number: 47, name: "محمد", type: "مدنية", ayahs: 38 },
  { number: 48, name: "الفتح", type: "مدنية", ayahs: 29 },
  { number: 49, name: "الحجرات", type: "مدنية", ayahs: 18 },
  { number: 50, name: "ق", type: "مكية", ayahs: 45 },
  { number: 51, name: "الذاريات", type: "مكية", ayahs: 60 },
  { number: 52, name: "الطور", type: "مكية", ayahs: 49 },
  { number: 53, name: "النجم", type: "مكية", ayahs: 62 },
  { number: 54, name: "القمر", type: "مكية", ayahs: 55 },
  { number: 55, name: "الرحمن", type: "مدنية", ayahs: 78 },
  { number: 56, name: "الواقعة", type: "مكية", ayahs: 96 },
  { number: 57, name: "الحديد", type: "مدنية", ayahs: 29 },
  { number: 58, name: "المجادلة", type: "مدنية", ayahs: 22 },
  { number: 59, name: "الحشر", type: "مدنية", ayahs: 24 },
  { number: 60, name: "الممتحنة", type: "مدنية", ayahs: 13 },
  { number: 61, name: "الصف", type: "مدنية", ayahs: 14 },
  { number: 62, name: "الجمعة", type: "مدنية", ayahs: 11 },
  { number: 63, name: "المنافقون", type: "مدنية", ayahs: 11 },
  { number: 64, name: "التغابن", type: "مدنية", ayahs: 18 },
  { number: 65, name: "الطلاق", type: "مدنية", ayahs: 12 },
  { number: 66, name: "التحريم", type: "مدنية", ayahs: 12 },
  { number: 67, name: "الملك", type: "مكية", ayahs: 30 },
  { number: 68, name: "القلم", type: "مكية", ayahs: 52 },
  { number: 69, name: "الحاقة", type: "مكية", ayahs: 52 },
  { number: 70, name: "المعارج", type: "مكية", ayahs: 44 },
  { number: 71, name: "نوح", type: "مكية", ayahs: 28 },
  { number: 72, name: "الجن", type: "مكية", ayahs: 28 },
  { number: 73, name: "المزمل", type: "مكية", ayahs: 20 },
  { number: 74, name: "المدثر", type: "مكية", ayahs: 56 },
  { number: 75, name: "القيامة", type: "مكية", ayahs: 40 },
  { number: 76, name: "الإنسان", type: "مدنية", ayahs: 31 },
  { number: 77, name: "المرسلات", type: "مكية", ayahs: 50 },
  { number: 78, name: "النبأ", type: "مكية", ayahs: 40 },
  { number: 79, name: "النازعات", type: "مكية", ayahs: 46 },
  { number: 80, name: "عبس", type: "مكية", ayahs: 42 },
  { number: 81, name: "التكوير", type: "مكية", ayahs: 29 },
  { number: 82, name: "الانفطار", type: "مكية", ayahs: 19 },
  { number: 83, name: "المطففين", type: "مكية", ayahs: 36 },
  { number: 84, name: "الانشقاق", type: "مكية", ayahs: 25 },
  { number: 85, name: "البروج", type: "مكية", ayahs: 22 },
  { number: 86, name: "الطارق", type: "مكية", ayahs: 17 },
  { number: 87, name: "الأعلي", type: "مكية", ayahs: 19 },
  { number: 88, name: "الغاشية", type: "مكية", ayahs: 26 },
  { number: 89, name: "الفجر", type: "مكية", ayahs: 30 },
  { number: 90, name: "البلد", type: "مكية", ayahs: 20 },
  { number: 91, name: "الشمس", type: "مكية", ayahs: 15 },
  { number: 92, name: "الليل", type: "مكية", ayahs: 21 },
  { number: 93, name: "الضحى", type: "مكية", ayahs: 11 },
  { number: 94, name: "الشرح", type: "مكية", ayahs: 8 },
  { number: 95, name: "التين", type: "مكية", ayahs: 8 },
  { number: 96, name: "العلق", type: "مكية", ayahs: 19 },
  { number: 97, name: "القدر", type: "مكية", ayahs: 5 },
  { number: 98, name: "البينة", type: "مدنية", ayahs: 8 },
  { number: 99, name: "الزلزلة", type: "مدنية", ayahs: 8 },
  { number: 100, name: "العاديات", type: "مكية", ayahs: 11 },
  { number: 101, name: "القارعة", type: "مكية", ayahs: 11 },
  { number: 102, name: "التكاثر", type: "مكية", ayahs: 8 },
  { number: 103, name: "العصر", type: "مكية", ayahs: 3 },
  { number: 104, name: "الهمزة", type: "مكية", ayahs: 9 },
  { number: 105, name: "الفيل", type: "مكية", ayahs: 5 },
  { number: 106, name: "قريش", type: "مكية", ayahs: 4 },
  { number: 107, name: "الماعون", type: "مكية", ayahs: 7 },
  { number: 108, name: "الكوثر", type: "مكية", ayahs: 3 },
  { number: 109, name: "الكافرون", type: "مكية", ayahs: 6 },
  { number: 110, name: "النصر", type: "مدنية", ayahs: 3 },
  { number: 111, name: "المسد", type: "مكية", ayahs: 5 },
  { number: 112, name: "الإخلاص", type: "مكية", ayahs: 4 },
  { number: 113, name: "الفلق", type: "مكية", ayahs: 5 },
  { number: 114, name: "الناس", type: "مكية", ayahs: 6 }
];

const RECITERS = [
  { id: "Minshawi", name: "المنشاوي (مرتل)", server: "https://server10.mp3quran.net/minsh/" },
  { id: "Hussary", name: "الحصري (مرتل)", server: "https://server13.mp3quran.net/husr/" },
  { id: "AbdulBasit_M", name: "عبد الباسط (مجود)", server: "https://server7.mp3quran.net/basit_mjwd/" },
  { id: "AbdulBasit", name: "عبد الباسط (مرتل)", server: "https://server7.mp3quran.net/basit/" },
  { id: "Mustafa_Ismail", name: "مصطفى إسماعيل", server: "https://server8.mp3quran.net/mustafa/" },
  { id: "AlBanna", name: "محمود علي البنا", server: "https://server8.mp3quran.net/banna/" },
  { id: "Alafasy", name: "مشاري العفاسي", server: "https://server8.mp3quran.net/afs/" },
  { id: "Sudais", name: "عبد الرحمن السديس", server: "https://server11.mp3quran.net/sds/" }
];

const Quran: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0]);
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const handlePlaying = () => {
        setIsPlaying(true);
        setLoadingAudio(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
        setIsPlaying(false);
        setPlayingSurah(null);
    };
    const handleLoadStart = () => setLoadingAudio(true);
    const handleError = () => {
        setLoadingAudio(false);
        setIsPlaying(false);
        alert("عذراً، حدث خطأ أثناء تحميل السورة. يرجى المحاولة لاحقاً.");
    };

    audioRef.current.addEventListener('playing', handlePlaying);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('loadstart', handleLoadStart);
    audioRef.current.addEventListener('error', handleError);

    return () => {
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('playing', handlePlaying);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('loadstart', handleLoadStart);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = (surahNumber: number) => {
    if (!audioRef.current) return;

    if (playingSurah === surahNumber) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      const paddedNumber = surahNumber.toString().padStart(3, '0');
      const url = `${selectedReciter.server}${paddedNumber}.mp3`;
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingSurah(surahNumber);
    }
  };

  const filteredSurahs = SURAHS.filter(s => s.name.includes(searchTerm) || s.number.toString() === searchTerm);

  return (
    <div className="min-h-screen bg-[#061e1a] text-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold font-naskh">القرآن الكريم</h1>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 overflow-hidden">
              <User className="w-4 h-4 text-emerald-400 shrink-0" />
              <select 
                value={selectedReciter.id}
                onChange={(e) => {
                    const reciter = RECITERS.find(r => r.id === e.target.value);
                    if (reciter) {
                        setSelectedReciter(reciter);
                        if (playingSurah) {
                            setPlayingSurah(null);
                            audioRef.current?.pause();
                        }
                    }
                }}
                className="bg-transparent text-sm focus:outline-none cursor-pointer outline-none w-full md:w-auto"
              >
                {RECITERS.map(r => <option key={r.id} value={r.id} className="bg-[#061e1a]">{r.name}</option>)}
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text"
              placeholder="ابحث عن سورة أو رقمها..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pr-12 pl-4 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Surah List */}
      <main className="max-w-2xl mx-auto p-6 grid gap-4">
        {filteredSurahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => togglePlay(surah.number)}
            className={`glass p-5 rounded-3xl flex items-center justify-between group cursor-pointer transition-all ${
                playingSurah === surah.number ? 'border-emerald-500/40 bg-white/[0.08]' : 'hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 transition-colors ${
                  playingSurah === surah.number ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-400'
              }`}>
                {surah.number}
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold font-naskh">{surah.name}</h3>
                <p className="text-xs text-slate-500 flex gap-2">
                  <span>{surah.type}</span>
                  <span>•</span>
                  <span>{surah.ayahs} آية</span>
                </p>
              </div>
            </div>

            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 ${
                playingSurah === surah.number ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover:text-white'
            }`}>
              {playingSurah === surah.number ? (
                loadingAudio ? <Loader2 className="w-6 h-6 animate-spin" /> :
                (isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />)
              ) : (
                <Play className="w-5 h-5" />
              )}
            </div>
          </div>
        ))}

        {filteredSurahs.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            لا توجد نتائج بحث مطابقة لـ "{searchTerm}"
          </div>
        )}
      </main>

      {/* Floating Player */}
      {playingSurah && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl glass p-5 rounded-[2.5rem] flex items-center gap-4 border-emerald-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="w-14 h-14 bg-emerald-500 rounded-3xl flex items-center justify-center shrink-0">
            <Music className="w-7 h-7 text-white animate-pulse" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="font-bold truncate text-base font-naskh">سورة {SURAHS.find(s => s.number === playingSurah)?.name}</h4>
            <p className="text-xs text-emerald-400 truncate mt-0.5">بصوت {selectedReciter.name}</p>
          </div>
          <div className="flex items-center gap-2">
              <button 
                onClick={() => togglePlay(playingSurah)}
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-emerald-400"
              >
                {loadingAudio ? <Loader2 className="w-6 h-6 animate-spin" /> :
                (isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />)}
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quran;
