'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface SubLesson {
  id: number;
  title: string;
  content: string;
}

export default function DayLessonPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = params?.day ? Number(params.day) : 1;

  // ഈ ദിവസത്തെ സബ് ലെസനുകൾ (ഡീഫോൾഡായി ചിലത് ഉണ്ടാകും, അഡ്മിന് മാറ്റാം)
  const [subLessons, setSubLessons] = useState<SubLesson[]>([
    { id: 1, title: 'Introduction & Basics', content: 'ഇന്നത്തെ പാഠത്തിന്റെ ആമുഖം.' },
    { id: 2, title: 'Core Concepts', content: 'പ്രധാനപ്പെട്ട ആശയങ്ങൾ.' },
    { id: 3, title: 'Examples & Practice', content: 'ഉദാഹരണങ്ങളും പരിശീലനവും.' },
  ]);

  const [currentPart, setCurrentPart] = useState(1);
  const [completedParts, setCompletedParts] = useState<number[]>([]);
  
  // എക്സാം സ്റ്റേറ്റ്
  const [isExamMode, setIsExamMode] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  // അഡ്മിൻ എഡിറ്റ് സ്റ്റേറ്റ്
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubTitle, setNewSubTitle] = useState('');
  const [newSubContent, setNewSubContent] = useState('');

  // അഡ്മിൻ പരിശോധന
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user === 'admin' || user?.includes('admin')) {
      setIsAdmin(true);
    }
  }, []);

  // ലോക്കൽ സ്റ്റോറേജിൽ നിന്ന് ഈ ദിവസത്തെ സബ് ലെസനുകളും പ്രോഗ്രസ്സും ലോഡ് ചെയ്യാൻ
  useEffect(() => {
    const savedLessons = localStorage.getItem(`day_${dayNumber}_sublessons`);
    if (savedLessons) {
      try {
        setSubLessons(JSON.parse(savedLessons));
      } catch (e) {
        console.error(e);
      }
    }

    const savedProgress = localStorage.getItem(`day_${dayNumber}_progress`);
    if (savedProgress) {
      setCompletedParts(JSON.parse(savedProgress));
    }
  }, [dayNumber]);

  // അഡ്മിൻ പുതിയ സബ് ലെസൻ ആഡ് ചെയ്യാൻ
  const handleAddSubLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubTitle.trim()) return;

    const newLesson: SubLesson = {
      id: subLessons.length + 1,
      title: newSubTitle,
      content: newSubContent,
    };

    const updatedList = [...subLessons, newLesson];
    setSubLessons(updatedList);
    localStorage.setItem(`day_${dayNumber}_sublessons`, JSON.stringify(updatedList));

    setNewSubTitle('');
    setNewSubContent('');
    alert('പുതിയ സബ് ലെസൻ വിജയകരമായി ചേർത്തു!');
  };

  // ഒരു പാർട്ട് കംപ്ലീറ്റ് ചെയ്യുമ്പോൾ
  const handleCompletePart = (partId: number) => {
    if (!completedParts.includes(partId)) {
      const updated = [...completedParts, partId];
      setCompletedParts(updated);
      localStorage.setItem(`day_${dayNumber}_progress`, JSON.stringify(updated));
    }

    if (currentPart < subLessons.length) {
      setCurrentPart(currentPart + 1);
    } else {
      // എല്ലാ സബ് ലെസനുകളും കഴിഞ്ഞാൽ എക്സാമിലേക്ക് കടക്കാം
      setIsExamMode(true);
    }
  };

  // എക്സാം ഇവാലുവേഷൻ (95% മാർക്ക് റൂൾ)
  const handleExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = selectedAnswer.trim().toLowerCase() === 'guten tag';
    const finalScore = isCorrect ? 100 : 50; 
    setScore(finalScore);
    setExamSubmitted(true);

    if (finalScore >= 95) {
      localStorage.setItem(`day_${dayNumber}_unlocked`, 'true');
      alert('അഭിനന്ദനങ്ങൾ! നിങ്ങൾ എക്സാമിൽ വിജയിച്ചു. അടുത്ത ദിവസത്തെ പാഠം അൺലോക്ക് ചെയ്തു!');
    } else {
      alert('നൽകിയിരിക്കുന്ന ഉത്തരത്തിൽ 95%-ൽ താഴെയാണ് മാർക്ക്. ദയവായി പാഠങ്ങൾ വീണ്ടും പരിശോധിച്ച് എക്സാം ആവർത്തിക്കുക.');
    }
  };

  const activeLesson = subLessons[currentPart - 1] || subLessons[0];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* ബാക്ക് ലിങ്ക് */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/courses/a1" className="text-amber-400 hover:underline text-sm font-semibold">
            ← A1 കോഴ്സ് പേജിലേക്ക് മടങ്ങുക
          </Link>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full">
            Day {dayNumber} (Total Parts: {subLessons.length})
          </span>
        </div>

        {!isExamMode ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* ഇടത് സൈഡിൽ ഈ ദിവസത്തെ സബ് ലെസനുകളുടെ ലിസ്റ്റ് (ലോക്ക് ചെയ്തത്) */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2 h-fit">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider">Sub-Lessons</h3>
                {isAdmin && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-lg hover:bg-amber-500/30 transition"
                  >
                    {isEditing ? 'Close' : '+ Add'}
                  </button>
                )}
              </div>

              {subLessons.map((item, index) => {
                const isUnlocked = index === 0 || completedParts.includes(subLessons[index - 1].id) || completedParts.includes(item.id);
                const isDone = completedParts.includes(item.id);

                return (
                  <button
                    key={item.id}
                    disabled={!isUnlocked}
                    onClick={() => setCurrentPart(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition flex justify-between items-center ${
                      currentPart === item.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isUnlocked
                        ? 'bg-slate-900 text-gray-300 hover:bg-slate-700'
                        : 'bg-slate-900/50 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    <span>{isDone ? '✅' : isUnlocked ? '📖' : '🔒'}</span>
                  </button>
                );
              })}
            </div>

            {/* വലത് വശത്ത് പാഠവും അഡ്മിൻ ഫോമും */}
            <div className="md:col-span-2 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 shadow-lg flex flex-col justify-between">
              {!isEditing ? (
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase">Part {currentPart} of {subLessons.length}</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4">{activeLesson?.title}</h1>
                  <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line">{activeLesson?.content}</p>
                </div>
              ) : (
                /* അഡ്മിൻ പുതിയ സബ് ലെസൻ ആഡ് ചെയ്യുന്ന ഫോം */
                <form onSubmit={handleAddSubLesson} className="space-y-4 mb-6">
                  <h3 className="text-amber-400 font-bold text-sm">🛠️ പുതിയ സബ് ലെസൻ ചേർക്കുക</h3>
                  <div>
                    <input
                      type="text"
                      value={newSubTitle}
                      onChange={(e) => setNewSubTitle(e.target.value)}
                      placeholder="Sub-lesson Title..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      value={newSubContent}
                      onChange={(e) => setNewSubContent(e.target.value)}
                      placeholder="Sub-lesson Content..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none h-24"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs transition"
                  >
                    സബ് ലെസൻ സേവ് ചെയ്യുക
                  </button>
                </form>
              )}

              <div className="pt-6 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-gray-400">ഭാഗം പഠിച്ചു കഴിഞ്ഞാൽ താഴെ ക്ലിക്ക് ചെയ്യുക</span>
                <button
                  onClick={() => handleCompletePart(activeLesson.id)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-6 rounded-xl transition text-sm"
                >
                  {currentPart === subLessons.length ? 'എക്സാമിലേക്ക് കടക്കുക 📝' : 'പൂർത്തിയാക്കി അടുത്തേക്ക് പോവുക →'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* എക്സാം പേജ് (95% മാർക്ക് റൂൾ) */
          <div className="bg-slate-800/80 border border-amber-500/50 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Day {dayNumber} Final Examination
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">അടിയന്തിര വിലയിരുത്തൽ (Exam)</h2>
              <p className="text-gray-400 text-sm mt-1">അടുത്ത ദിവസത്തേക്ക് കടക്കാൻ കുറഞ്ഞത് **95% മാർക്ക്** നേടിയിരിക്കണം.</p>
            </div>

            {!examSubmitted ? (
              <form onSubmit={handleExamSubmit} className="space-y-6">
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    ചോദ്യം: ജർമൻ ഭാഷയിൽ "Hello" എന്ന് പറയാൻ ഉപയോഗിക്കുന്ന വാക്ക് ഏത്? (ടൈപ്പ് ചെയ്യുക: Guten Tag)
                  </label>
                  <input
                    type="text"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    placeholder="ഉത്തരം ഇവിടെ ടൈപ്പ് ചെയ്യുക..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition"
                >
                  എക്സാം സബ്മിറ്റ് ചെയ്യുക 🚀
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl font-extrabold text-amber-400">നിങ്ങളുടെ സ്കോർ: {score}%</div>
                {score >= 95 ? (
                  <div>
                    <p className="text-emerald-400 font-bold mb-4">അഭിനന്ദനങ്ങൾ! നിങ്ങൾ 95%-ൽ കൂടുതൽ മാർക്ക് നേടി വിജയിച്ചിരിക്കുന്നു 🎉</p>
                    <button
                      onClick={() => router.push(`/courses/a1/day/${dayNumber + 1}`)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-8 rounded-xl transition"
                    >
                      Day {dayNumber + 1}-ലേക്ക് കടക്കുക →
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-rose-400 font-bold mb-4">ക്ഷമിക്കണം, നിങ്ങൾക്ക് 95% മാർക്ക് ലഭിച്ചില്ല (ലഭിച്ചത്: {score}%). അടുത്ത ദിവസത്തേക്ക് പോകാൻ കഴിയില്ല.</p>
                    <button
                      onClick={() => { setExamSubmitted(false); setIsExamMode(false); setCurrentPart(1); }}
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition"
                    >
                      പാഠങ്ങൾ വീണ്ടും പഠിക്കുക 🔄
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}