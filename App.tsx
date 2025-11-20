import React, { useState, useEffect } from 'react';
import { generateSyllabus } from './services/geminiService';
import { SyllabusData } from './types';
import { SyllabusCard } from './components/SyllabusCard';
import { CourseStats } from './components/CourseStats';
import { Loader2, BookOpen, GraduationCap, RotateCcw, AlertCircle, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [syllabusData, setSyllabusData] = useState<SyllabusData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateSyllabus();
      setSyllabusData(data);
    } catch (err) {
      console.error(err);
      setError("Ders programı oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate on first load for better UX
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header / Hero */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">İK Analitiği</h1>
              <p className="text-xs text-slate-500 font-medium">3. Sınıf Lisans Programı</p>
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              loading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg active:scale-95'
            }`}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <RotateCcw size={18} />
            )}
            {loading ? 'Oluşturuluyor...' : 'Programı Yenile'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 mb-8">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {loading && !syllabusData && (
           <div className="flex flex-col items-center justify-center h-96">
             <Loader2 size={48} className="text-indigo-600 animate-spin mb-4" />
             <h3 className="text-lg font-medium text-slate-600">Yapay Zeka Müfredatı Hazırlıyor...</h3>
             <p className="text-slate-400 text-sm">Lütfen bekleyin, 14 haftalık plan oluşturuluyor.</p>
           </div>
        )}

        {syllabusData && !loading && (
          <div className="animate-fade-in-up">
            {/* Course Overview Header */}
            <section className="mb-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {syllabusData.courseTitle}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {syllabusData.courseDescription}
              </p>
            </section>

            {/* Analytics Dashboard */}
            <section className="mb-12">
              <CourseStats weeks={syllabusData.weeks} />
            </section>

            {/* Tools & Technologies Section */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Araçlar ve Teknolojiler</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {syllabusData.tools?.map((tool, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                    <div className="flex flex-col gap-3 h-full">
                        <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-slate-900 text-lg">{tool.name}</h4>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full whitespace-nowrap">
                                {tool.category}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {tool.description}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Weekly Cards */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-indigo-600" />
                <h3 className="text-xl font-bold text-slate-800">Haftalık Program Detayı</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-6">
                {syllabusData.weeks.map((week) => (
                  <SyllabusCard key={week.weekNumber} week={week} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
      
      <footer className="text-center py-8 text-slate-400 text-sm">
        Gemini 2.5 Flash ile Oluşturulmuştur
      </footer>
    </div>
  );
};

export default App;