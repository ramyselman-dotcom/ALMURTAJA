
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AzkarList from './pages/AzkarList';
import PrayerTimesPage from './pages/PrayerTimes';
import Quran from './pages/Quran';
import { MORNING_AZKAR, EVENING_AZKAR } from './constants';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer-times" element={<PrayerTimesPage />} />
          <Route path="/quran" element={<Quran />} />
          <Route 
            path="/morning" 
            element={
              <AzkarList 
                title="أذكار الصباح" 
                azkar={MORNING_AZKAR} 
                category="morning" 
                theme="bg-[#0c1425]"
              />
            } 
          />
          <Route 
            path="/evening" 
            element={
              <AzkarList 
                title="أذكار المساء" 
                azkar={EVENING_AZKAR} 
                category="evening" 
                theme="bg-[#05080f]"
              />
            } 
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
