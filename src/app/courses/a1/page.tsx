'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DayLesson {
  day: number;
  title: string;
  description: string;
}

export default function A1CoursePage() {
  // 1 മുതൽ 60 വരെയുള്ള ദിവസങ്ങളുടെ അടിസ്ഥാന ലിസ്റ്റ് തയ്യാറാക്കുന്നു
  const defaultDays: DayLesson[] = Array.from({ length: 60 }, (_, index) => ({
    day: index + 1,
    title: `Day ${index + 1}: German Lesson ${index + 1}`,
    description: `ജർമൻ A1 ലെവൽ ഡേ ${index + 1}-ൽ പഠിക്കേണ്ട പ്രധാന ആശയങ്ങളും വ്യാകരണവും.`,
  }));

  const [lessons, setLessons] = useState<DayLesson[]>(defaultDays);
  const [isAdmin, setIsAdmin] = useState(false);

  // അഡ്മിൻ ലോഗിൻ ആണോ എന്ന് പരിശോധിക്കാൻ
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user === 'admin' || user?.includes('admin')) {
      setIsAdmin(true);
    }
  }, []);

  // ലോക്കൽ സ്റ്റോറേജിൽ നിന്ന് സേവ് ചെയ്ത ഡാറ്റ ലോഡ് ചെയ്യാൻ
  useEffect(() => {
    const saved = localStorage.getItem('a1_days_lessons');
    if (saved) {
      try {
        setLessons(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // ഏതെങ്കിലും ദിവസത്തെ വിവരങ്ങൾ അഡ്മിന് എഡിറ്റ് ചെയ്യാൻ
  const handleUpdateLesson = (dayNum: number, newTitle: string, newDesc: string) => {
    const updated = lessons.map((item) => 
      item.day === dayNum ? { ...item, title: newTitle, description: newDesc } : item
    );
    setLessons(updated);
    localStorage.setItem('a1_days_lessons', JSON.stringify(updated));
    alert(`Day ${dayNum} വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* നാവിഗേഷൻ ബാക്ക് ലിങ്ക് */}
        <div className="mb-6">
          <Link href="/" className="text-amber-400 hover:underline text-sm font-semibold">
            ← Home ലേക്ക് മടങ്ങുക
          </Link>
        </div>

        <div className="text-center mb-10">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            60-Day Structured Program
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 text-white">
            German A1 Course (Day 1 to 60)
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            ഓരോ ദിവസത്തെയും പാഠങ്ങൾ തിരഞ്ഞെടുത്ത് നിങ്ങളുടെ ജർമ്മൻ പഠനം ക്രമമായി മുന്നോട്ട് കൊണ്ടുപോകൂ.
          </p>
        </div>

        {/* 1 മുതൽ 60 വരെയുള്ള ദിവസങ്ങളുടെ ഗ്രേഡ് ബട്ടണുകൾ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {lessons.map((lesson) => (
            <Link
              key={lesson.day}
              href={`/courses/a1/day/${lesson.day}`}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 rounded-2xl p-4 text-center transition flex flex-col justify-between group shadow-md"
            >
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Day</span>
                <div className="text-2xl font-extrabold text-white mt-1 group-hover:text-amber-300 transition">
                  {lesson.day}
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400 line-clamp-2">
                {lesson.title}
              </div>
              <span className="mt-3 text-[11px] font-semibold text-amber-400 bg-amber-500/10 py-1 px-2 rounded-lg inline-block">
                Start →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}