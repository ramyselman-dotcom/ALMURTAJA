
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, MapPin, RefreshCw, Loader2 } from 'lucide-react';
import { fetchPrayerTimes, PrayerTimes as IPrayerTimes } from '../services/prayerService';

const PRAYER_LABELS: Record<keyof Omit<IPrayerTimes, 'city'>, string> = {
  fajr: "الفجر",
  sunrise: "الشروق",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء"
};

const PRAYER_ICONS: Record<string, string> = {
  fajr: "🌙",
  sunrise: "🌅",
  dhuhr: "☀️",
  asr: "🌤️",
  maghrib: "🌇",
  isha: "🌃"
};

const PrayerTimesPage: React.FC = () => {
  const [times, setTimes] = useState<IPrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTimes = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude);
          setTimes(data);
        } catch (err) {
          setError("عذراً، فشل جلب المواقيت. يرجى المحاولة لاحقاً.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("يرجى تفعيل خدمة تحديد الموقع لعرض المواقيت.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getTimes();
  }, []);

  return (
    <div className="min-h-screen bg-[#05080f] text-white pb-12">
      <header className="glass sticky top-0 z-50 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5">
            <ChevronRight className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold font-naskh">مواقيت الصلاة</h1>
        </div>
        <button onClick={getTimes} className="text-slate-400 hover:text-white transition-colors">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <main className="max-w-md mx-auto p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            <p className="text-slate-400 animate-pulse">جاري تحديد الموقع وحساب المواقيت...</p>
          </div>
        ) : error ? (
          <div className="glass p-8 rounded-3xl text-center border-red-500/20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={getTimes} className="bg-white/10 px-6 py-2 rounded-xl text-sm">إعادة المحاولة</button>
          </div>
        ) : times && (
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl flex items-center gap-4 border-amber-500/10">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{times.city}</h2>
                <p className="text-xs text-slate-500">مواقيت الصلاة حسب موقعك الحالي</p>
              </div>
            </div>

            <div className="grid gap-3">
              {(Object.keys(PRAYER_LABELS) as Array<keyof typeof PRAYER_LABELS>).map((key) => (
                <div key={key} className="glass p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{PRAYER_ICONS[key]}</span>
                    <div>
                      <div className="text-slate-400 text-xs font-medium">{key.toUpperCase()}</div>
                      <div className="text-lg font-bold">{PRAYER_LABELS[key]}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-mono text-amber-500">
                    {times[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PrayerTimesPage;
