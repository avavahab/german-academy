'use client';

import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { key: "overview", icon: "📊", label: "Overview" },
  { key: "courses", icon: "📚", label: "Course Management" },
  { key: "builder", icon: "🛠️", label: "Lesson Builder" },
  { key: "questions", icon: "❓", label: "Question Bank" },
  { key: "users", icon: "👥", label: "User Analytics" },
  { key: "registrations", icon: "📋", label: "Registrations" },
];

const COURSES = [
  { level: "A1", lessons: 24, students: 812, completion: 78 },
  { level: "A2", lessons: 22, students: 540, completion: 64 },
  { level: "B1", lessons: 26, students: 301, completion: 51 },
  { level: "B2", lessons: 20, students: 154, completion: 43 },
  { level: "C1", lessons: 18, students: 62, completion: 38 },
  { level: "C2", lessons: 14, students: 19, completion: 29 },
];

const INITIAL_QUESTIONS = [
  { id: 1, level: "A1", skill: "Grammar", type: "mcq", question: "Wie ______ du?", options: ["heißt", "bist", "hast", "machst"], answer: "heißt", uses: 812 },
  { id: 2, level: "A2", skill: "Vocabulary", type: "mcq", question: "What does 'Danke schön' mean?", options: ["Good evening", "Thank you very much", "Good night", "Good afternoon"], answer: "Thank you very much", uses: 540 },
  { id: 3, level: "B1", skill: "Grammar", type: "mcq", question: "Konjunktiv II of 'haben', ich-form?", options: ["habte", "hätte", "habe", "hatte"], answer: "hätte", uses: 301 },
  { id: 4, level: "B2", skill: "Grammar", type: "mcq", question: "'Das muss gemacht werden' means?", options: ["It was made", "It must be done", "It may be done", "It is making"], answer: "It must be done", uses: 154 },
];

const USERS = [
  { name: "Meera K.", level: "A1", progress: 78, streak: 12, lastActive: "Today" },
  { name: "Rahul S.", level: "B1", progress: 51, streak: 4, lastActive: "Today" },
  { name: "Fathima N.", level: "A2", progress: 92, streak: 21, lastActive: "Yesterday" },
  { name: "Vishnu M.", level: "B2", progress: 43, streak: 2, lastActive: "3 days ago" },
  { name: "Anjali R.", level: "A2", progress: 34, streak: 0, lastActive: "1 week ago" },
];

const SIGNUP_TREND = [12, 18, 15, 24, 30, 22, 35];

export default function AdminPanel() {
  const [activeNav, setActiveNav] = useState("overview");
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  
  const [qForm, setQForm] = useState({
    level: "A1",
    skill: "Grammar",
    type: "mcq",
    question: "",
    options: ["", "", "", ""],
    answer: ""
  });
  const [showQForm, setShowQForm] = useState(false);
  const [qFilter, setQFilter] = useState("All");
  const [successMessage, setSuccessMessage] = useState("");

  const [lesson, setLesson] = useState({
    title: "", level: "A1", objective: "",
    vocab: [{ de: "", en: "", ml: "" }],
    quiz: [{ q: "", answer: "" }],
  });
  const [registeredStudents, setRegisteredStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = () => {
      const students = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
      setRegisteredStudents(students);
    };

    fetchStudents();
    
    window.addEventListener("storage", fetchStudents);
    return () => window.removeEventListener("storage", fetchStudents);
  }, [activeNav]);

  useEffect(() => {
    const saved = localStorage.getItem("adminQuestionBank");
    if (saved) {
      try {
        setQuestions(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading questions", e);
      }
    }
  }, []);

  const saveQuestionsToStorage = (updatedQuestions: any) => {
    setQuestions(updatedQuestions);
    localStorage.setItem("adminQuestionBank", JSON.stringify(updatedQuestions));

    const formattedForPlacement = {};
    ["A1", "A2", "B1", "B2", "C1", "C2"].forEach(lvl => {
      const lvlQ = updatedQuestions.filter(q => q.level === lvl).map(q => ({
        type: q.type || "mcq",
        q: q.question,
        options: q.options || [],
        answer: q.answer
      }));
      formattedForPlacement[lvl] = lvlQ;
    });
    localStorage.setItem("customQuestionBank", JSON.stringify(formattedForPlacement));
  };

  const addVocabRow = () => setLesson({ ...lesson, vocab: [...lesson.vocab, { de: "", en: "", ml: "" }] });
  const updateVocabRow = (i, field, val) => {
    const next = [...lesson.vocab];
    next[i][field] = val;
    setLesson({ ...lesson, vocab: next });
  };
  const removeVocabRow = (i) => setLesson({ ...lesson, vocab: lesson.vocab.filter((_, idx) => idx !== i) });

  const addQuizRow = () => setLesson({ ...lesson, quiz: [...lesson.quiz, { q: "", answer: "" }] });
  const updateQuizRow = (i, field, val) => {
    const next = [...lesson.quiz];
    next[i][field] = val;
    setLesson({ ...lesson, quiz: next });
  };
  const removeQuizRow = (i) => setLesson({ ...lesson, quiz: lesson.quiz.filter((_, idx) => idx !== i) });

  const handleOptionChange = (index, value) => {
    const newOptions = [...qForm.options];
    newOptions[index] = value;
    setQForm({ ...qForm, options: newOptions });
  };

  const addQuestion = () => {
    if (!qForm.question.trim() || !qForm.answer.trim()) {
      alert("ദയവായി ചോദ്യവും ശരിയായ ഉത്തരവും നൽകുക!");
      return;
    }
    if (qForm.type === "mcq" && qForm.options.some(opt => !opt.trim())) {
      alert("ദയവായി നാല് ഓപ്ഷനുകളും പൂരിപ്പിക്കുക!");
      return;
    }

    const newQ = {
      id: Date.now(),
      uses: 0,
      ...qForm,
      options: qForm.type === "mcq" ? qForm.options : []
    };

    const updated = [...questions, newQ];
    saveQuestionsToStorage(updated);

    setQForm({ level: "A1", skill: "Grammar", type: "mcq", question: "", options: ["", "", "", ""], answer: "" });
    setShowQForm(false);
    setSuccessMessage("ചോദ്യം വിജയകരമായി ചേർത്തു!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const deleteQuestion = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    saveQuestionsToStorage(updated);
  };

  const filteredQuestions = questions.filter((q) => qFilter === "All" || q.level === qFilter);

  const totalStudents = COURSES.reduce((a, c) => a + c.students, 0);
  const avgCompletion = Math.round(COURSES.reduce((a, c) => a + c.completion, 0) / COURSES.length);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex">
      <div className="w-56 border-r border-slate-800 bg-slate-950 flex-shrink-0 hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="text-lg font-bold text-amber-400">German Academy</div>
          <div className="text-gray-500 text-[11px]">Admin Panel</div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left
                ${activeNav === item.key
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "text-gray-400 hover:bg-slate-800 hover:text-gray-200"}
              `}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 min-w-0">
        <div className="md:hidden border-b border-slate-800 flex gap-2 overflow-x-auto px-4 py-3 bg-slate-950">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition
                ${activeNav === item.key ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-gray-400"}
              `}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-center font-medium">
              {successMessage}
            </div>
          )}

          {activeNav === "overview" && (
            <div>
              <h1 className="text-2xl font-extrabold mb-6">Overview</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Students", value: totalStudents.toLocaleString() },
                  { label: "Avg. Completion", value: `${avgCompletion}%` },
                  { label: "Active Lessons", value: COURSES.reduce((a, c) => a + c.lessons, 0) },
                  { label: "Questions in Bank", value: questions.length },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{s.label}</p>
                    <p className="text-2xl font-extrabold text-amber-400">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6">
                <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-5">New Signups (Last 7 Days)</h2>
                <div className="flex items-end justify-between h-32 gap-3">
                  {SIGNUP_TREND.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end h-24">
                        <div
                          className="w-full bg-amber-500 rounded-t-md"
                          style={{ height: `${(v / Math.max(...SIGNUP_TREND)) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-500 text-[10px]">D{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === "courses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold">Course Management</h1>
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-2 px-4 rounded-lg transition">
                  + Add Level
                </button>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wide">
                      <th className="text-left px-5 py-3">Level</th>
                      <th className="text-left px-5 py-3">Lessons</th>
                      <th className="text-left px-5 py-3">Students</th>
                      <th className="text-left px-5 py-3">Completion</th>
                      <th className="text-right px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.map((c) => (
                      <tr key={c.level} className="border-b border-slate-700/60 last:border-0">
                        <td className="px-5 py-3 font-bold text-amber-400">{c.level}</td>
                        <td className="px-5 py-3 text-gray-300">{c.lessons}</td>
                        <td className="px-5 py-3 text-gray-300">{c.students}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: `${c.completion}%` }} />
                            </div>
                            <span className="text-gray-400 text-xs">{c.completion}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button className="text-amber-400 hover:underline text-xs font-semibold">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav === "builder" && (
            <div>
              <h1 className="text-2xl font-extrabold mb-6">Lesson Builder</h1>

              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 mb-4">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-xs font-semibold block mb-1.5">Lesson Title</label>
                    <input
                      value={lesson.title}
                      onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                      placeholder="e.g. Zahlen & Uhrzeit"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-semibold block mb-1.5">Level</label>
                    <select
                      value={lesson.level}
                      onChange={(e) => setLesson({ ...lesson, level: e.target.value })}
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-amber-400"
                    >
                      {["A1", "A2", "B1", "B2", "C1", "C2"].map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <label className="text-gray-400 text-xs font-semibold block mb-1.5">Learning Objective</label>
                <textarea
                  value={lesson.objective}
                  onChange={(e) => setLesson({ ...lesson, objective: e.target.value })}
                  rows={2}
                  placeholder="ഈ പാഠം കഴിയുമ്പോൾ വിദ്യാർത്ഥിക്ക് എന്ത് ചെയ്യാൻ കഴിയും?"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 mb-4">
                <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4">Vocabulary</h2>
                <div className="space-y-2">
                  {lesson.vocab.map((v, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={v.de}
                        onChange={(e) => updateVocabRow(i, "de", e.target.value)}
                        placeholder="German"
                        className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                      />
                      <input
                        value={v.en}
                        onChange={(e) => updateVocabRow(i, "en", e.target.value)}
                        placeholder="English"
                        className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                      />
                      <input
                        value={v.ml}
                        onChange={(e) => updateVocabRow(i, "ml", e.target.value)}
                        placeholder="മലയാളം"
                        className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                      />
                      <button onClick={() => removeVocabRow(i)} className="text-red-400 hover:text-red-300 px-2">✕</button>
                    </div>
                  ))}
                </div>
                <button onClick={addVocabRow} className="text-amber-400 text-sm font-semibold mt-3 hover:underline">
                  + Add word
                </button>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 mb-4">
                <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4">Quiz Questions</h2>
                <div className="space-y-2">
                  {lesson.quiz.map((q, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={q.q}
                        onChange={(e) => updateQuizRow(i, "q", e.target.value)}
                        placeholder="Question"
                        className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                      />
                      <input
                        value={q.answer}
                        onChange={(e) => updateQuizRow(i, "answer", e.target.value)}
                        placeholder="Correct answer"
                        className="w-40 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                      />
                      <button onClick={() => removeQuizRow(i)} className="text-red-400 hover:text-red-300 px-2">✕</button>
                    </div>
                  ))}
                </div>
                <button onClick={addQuizRow} className="text-amber-400 text-sm font-semibold mt-3 hover:underline">
                  + Add question
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition">
                  Publish Lesson
                </button>
                <button className="flex-1 border border-slate-700 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-bold py-3 rounded-xl transition">
                  Save Draft
                </button>
              </div>
            </div>
          )}

          {activeNav === "questions" && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h1 className="text-2xl font-extrabold">Question Bank & Placement Test Creator</h1>
                <button
                  onClick={() => setShowQForm(!showQForm)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-2 px-4 rounded-lg transition"
                >
                  {showQForm ? "Cancel" : "+ Add Question"}
                </button>
              </div>

              {showQForm && (
                <div className="bg-slate-800/60 border border-amber-400/40 rounded-2xl p-5 mb-5 space-y-4">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold block mb-1">Level</label>
                      <select
                        value={qForm.level}
                        onChange={(e) => setQForm({ ...qForm, level: e.target.value })}
                        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
                      >
                        {["A1", "A2", "B1", "B2", "C1", "C2"].map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold block mb-1">Skill</label>
                      <select
                        value={qForm.skill}
                        onChange={(e) => setQForm({ ...qForm, skill: e.target.value })}
                        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
                      >
                        {["Grammar", "Vocabulary", "Listening", "Reading", "Speaking"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold block mb-1">Question Type</label>
                      <select
                        value={qForm.type}
                        onChange={(e) => setQForm({ ...qForm, type: e.target.value })}
                        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
                      >
                        <option value="mcq">Multiple Choice</option>
                        <option value="text">Text Input (Fill in blanks)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs font-semibold block mb-1">Question Text</label>
                    <input
                      value={qForm.question}
                      onChange={(e) => setQForm({ ...qForm, question: e.target.value })}
                      placeholder="ഉദാഹരണത്തിന്: Wie ______ du?"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  {qForm.type === "mcq" && (
                    <div>
                      <label className="text-gray-400 text-xs font-semibold block mb-1">4 Options</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {qForm.options.map((opt, idx) => (
                          <input
                            key={idx}
                            value={opt}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                            placeholder={`Option ${idx + 1}`}
                            className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-gray-400 text-xs font-semibold block mb-1">Correct Answer</label>
                    <input
                      value={qForm.answer}
                      onChange={(e) => setQForm({ ...qForm, answer: e.target.value })}
                      placeholder="ശരിയായ ഉത്തരം കൃത്യമായി നൽകുക"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <button onClick={addQuestion} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-2 px-5 rounded-lg transition">
                    Save Question
                  </button>
                </div>
              )}

              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {["All", "A1", "A2", "B1", "B2", "C1", "C2"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setQFilter(l)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border
                      ${qFilter === l ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-800/60 text-gray-300 border-slate-700"}
                    `}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredQuestions.map((q) => (
                  <div key={q.id} className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-amber-400 border border-amber-500/40 rounded-full px-2 py-0.5">{q.level}</span>
                        <span className="text-gray-500 text-xs">{q.skill}</span>
                        <span className="text-gray-400 text-xs uppercase bg-slate-900 px-1.5 py-0.5 rounded">{q.type || "mcq"}</span>
                        <span className="text-gray-600 text-xs">· used {q.uses}x</span>
                      </div>
                      <p className="text-gray-200 text-sm truncate">{q.question}</p>
                      <p className="text-gray-500 text-xs">Answer: {q.answer}</p>
                    </div>
                    <button onClick={() => deleteQuestion(q.id)} className="text-red-400 hover:text-red-300 text-xs font-semibold flex-shrink-0">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === "users" && (
            <div>
              <h1 className="text-2xl font-extrabold mb-6">User Analytics</h1>
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wide">
                      <th className="text-left px-5 py-3">Name</th>
                      <th className="text-left px-5 py-3">Level</th>
                      <th className="text-left px-5 py-3">Progress</th>
                      <th className="text-left px-5 py-3">Streak</th>
                      <th className="text-left px-5 py-3">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u) => (
                      <tr key={u.name} className="border-b border-slate-700/60 last:border-0">
                        <td className="px-5 py-3 font-medium text-white">{u.name}</td>
                        <td className="px-5 py-3">
                          <span className="text-[10px] font-bold text-amber-400 border border-amber-500/40 rounded-full px-2 py-0.5">{u.level}</span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: `${u.progress}%` }} />
                            </div>
                            <span className="text-gray-400 text-xs">{u.progress}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-300">{u.streak > 0 ? `🔥 ${u.streak}` : "—"}</td>
                        <td className="px-5 py-3 text-gray-400 text-xs">{u.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav === "registrations" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-extrabold">Registered Students (Contact List)</h1>
                <button 
                  onClick={() => {
                    const students = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
                    setRegisteredStudents(students);
                  }}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-xs font-semibold text-amber-400 transition"
                >
                  🔄 Refresh List
                </button>
              </div>

              {registeredStudents.length === 0 ? (
                <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 text-center text-gray-400">
                  ഇതുവരെ ആരും രജിസ്റ്റർ ചെയ്തിട്ടില്ല. (അല്ലെങ്കിൽ ലോക്കൽ സ്റ്റോറേജിൽ ഡാറ്റ ലഭ്യമല്ല).
                </div>
              ) : (
                <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wide bg-slate-900/50">
                        <th className="text-left px-5 py-3.5">Name & Email</th>
                        <th className="text-left px-5 py-3.5">Phone / WhatsApp</th>
                        <th className="text-left px-5 py-3.5">Goal</th>
                        <th className="text-left px-5 py-3.5">City</th>
                        <th className="text-left px-5 py-3.5">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredStudents.map((student, idx) => (
                        <tr key={idx} className="border-b border-slate-700/60 last:border-0 hover:bg-slate-800/40 transition">
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-amber-400">{student.fullName}</div>
                            <div className="text-xs text-gray-400">{student.email}</div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-300 font-mono">{student.phone}</td>
                          <td className="px-5 py-3.5 text-gray-300">
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-xs">
                              {student.goal}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-300">{student.city || 'N/A'}</td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs">{student.preferredTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}