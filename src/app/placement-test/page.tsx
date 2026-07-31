'use client';

import { useState, useEffect } from "react";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_TITLES = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
  B2: "Upper-Intermediate",
  C1: "Advanced",
  C2: "Mastery",
};

// സ്ഥിരമായി നൽകിയിരിക്കുന്ന അടിസ്ഥാന ചോദ്യങ്ങൾ (ഇതിനോടൊപ്പം അഡ്മിൻ ചേർത്തവയും വരും)
const INITIAL_QUESTION_BANK = {
  A1: [
    { type: "mcq", q: "Wie ______ du?", options: ["heißt", "bist", "hast", "machst"], answer: "heißt" },
    { type: "mcq", q: "\"das Haus\" — which article group does Haus belong to?", options: ["der", "die", "das", "den"], answer: "das" },
  ],
  A2: [
    { type: "mcq", q: "Ich ______ gestern ins Kino gegangen. (Perfekt)", options: ["habe", "bin", "war", "hatte"], answer: "bin" },
  ],
  B1: [
    { type: "mcq", q: "Konjunktiv II of \"haben\", ich-form:", options: ["habte", "hätte", "habe", "hatte"], answer: "hätte" },
  ],
  B2: [
    { type: "mcq", q: "\"Das muss gemacht werden\" means:", options: ["It was made", "It must be done", "It may be done", "It is making"], answer: "It must be done" },
  ],
  C1: [
    { type: "mcq", q: "Mid-sentence, \"eigentlich\" often signals:", options: ["pure emphasis", "a subtle contradiction to expectation", "a formal register", "a question"], answer: "a subtle contradiction to expectation" },
  ],
  C2: [
    { type: "mcq", q: "\"vonnöten sein\" is a formal/elevated way of saying:", options: ["nötig sein", "möglich sein", "verboten sein", "üblich sein"], answer: "nötig sein" },
  ],
};

const PASS_THRESHOLD = 0.8;

export default function PlacementTest() {
  const [stage, setStage] = useState("intro");
  const [levelIndex, setLevelIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [textInputAnswer, setTextInputAnswer] = useState("");
  const [levelResults, setLevelResults] = useState({});
  const [finalLevel, setFinalLevel] = useState(null);
  const [finalStatus, setFinalStatus] = useState(null);
  
  // ചോദ്യങ്ങൾ സ്റ്റോർ ചെയ്യാൻ
  const [questionBank, setQuestionBank] = useState(INITIAL_QUESTION_BANK);

  // അഡ്മിൻ പാനലിൽ നിന്ന് localStorage-ൽ സേവ് ചെയ്ത ചോദ്യങ്ങൾ ലോഡ് ചെയ്യുന്നു
  useEffect(() => {
    const savedQuestions = localStorage.getItem("customQuestionBank");
    if (savedQuestions) {
      try {
        const parsed = JSON.parse(savedQuestions);
        setQuestionBank(prev => {
          const updated = { ...prev };
          Object.keys(parsed).forEach(lvl => {
            if (parsed[lvl] && parsed[lvl].length > 0) {
              updated[lvl] = [...(prev[lvl] || []), ...parsed[lvl]];
            }
          });
          return updated;
        });
      } catch (e) {
        console.error("Failed to load custom questions", e);
      }
    }
  }, []);

  const startAt = (level) => {
    const idx = LEVELS.indexOf(level);
    setLevelIndex(idx);
    setQIndex(0);
    setCorrectCount(0);
    setSelected(null);
    setTextInputAnswer("");
    setStage("testing");
  };

  const handlePriorKnowledge = (choice) => {
    if (choice === "never") {
      setFinalStatus("zero");
      setStage("result");
      return;
    }
    const map = {
      some: "A1",
      A1: "A1",
      A2: "A2",
      B1: "B1",
      B2: "B2",
      unsure: "A1",
    };
    startAt(map[choice] || "A1");
  };

  const currentLevel = LEVELS[levelIndex];
  const questions = questionBank[currentLevel] || [];
  const currentQuestion = questions[qIndex];

  const submitAnswer = () => {
    if (!currentQuestion) return;

    let isCorrect = false;
    if (currentQuestion.type === "text") {
      isCorrect = textInputAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
    } else {
      isCorrect = selected === currentQuestion.answer;
    }

    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setTextInputAnswer("");
      return;
    }

    const score = questions.length > 0 ? newCorrect / questions.length : 0;
    const passed = score >= PASS_THRESHOLD;
    setLevelResults((prev) => ({ ...prev, [currentLevel]: score }));

    if (!passed) {
      setFinalLevel(currentLevel);
      setFinalStatus("stopped");
      setStage("result");
      return;
    }

    if (levelIndex + 1 < LEVELS.length) {
      setStage("transition");
    } else {
      setFinalLevel("C2");
      setFinalStatus("passedAll");
      setStage("result");
    }
  };

  const continueToNextLevel = () => {
    setLevelIndex(levelIndex + 1);
    setQIndex(0);
    setCorrectCount(0);
    setSelected(null);
    setTextInputAnswer("");
    setStage("testing");
  };

  const restart = () => {
    setStage("intro");
    setLevelIndex(0);
    setQIndex(0);
    setCorrectCount(0);
    setSelected(null);
    setTextInputAnswer("");
    setLevelResults({});
    setFinalLevel(null);
    setFinalStatus(null);
  };

  const priorOptions = [
    { key: "never", label: "ഒരിക്കലും പഠിച്ചിട്ടില്ല" },
    { key: "some", label: "കുറച്ച് അറിയാം" },
    { key: "A1", label: "A1 പഠിച്ചിട്ടുണ്ട്" },
    { key: "A2", label: "A2 പഠിച്ചിട്ടുണ്ട്" },
    { key: "B1", label: "B1 പഠിച്ചിട്ടുണ്ട്" },
    { key: "B2", label: "B2 പഠിച്ചിട്ടുണ്ട്" },
    { key: "unsure", label: "ഉറപ്പില്ല" },
  ];

  const Stepper = () => (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-10 flex-wrap">
      {LEVELS.map((lvl, i) => {
        const result = levelResults[lvl];
        const isCurrent = stage === "testing" && i === levelIndex;
        const isPassed = result !== undefined && result >= PASS_THRESHOLD;
        const isFailed = result !== undefined && result < PASS_THRESHOLD;
        return (
          <div key={lvl} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 transition
                  ${isCurrent ? "border-amber-400 bg-amber-500/10 text-amber-400 animate-pulse" : ""}
                  ${isPassed ? "border-amber-400 bg-amber-500 text-slate-950" : ""}
                  ${isFailed ? "border-red-400/60 bg-red-500/10 text-red-400" : ""}
                  ${!isCurrent && !isPassed && !isFailed ? "border-slate-700 text-slate-500" : ""}
                `}
              >
                {lvl}
              </div>
              {result !== undefined && (
                <span className={`text-[10px] font-semibold ${isPassed ? "text-amber-400" : "text-red-400"}`}>
                  {Math.round(result * 100)}%
                </span>
              )}
            </div>
            {i < LEVELS.length - 1 && (
              <div className={`w-6 md:w-10 h-0.5 mx-0.5 ${i < levelIndex || (i === levelIndex && stage !== "intro") ? "bg-amber-500/40" : "bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            German Level Assessment
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-white">
            Placement Test
          </h1>
        </div>

        {stage !== "intro" && <Stepper />}

        {/* INTRO */}
        {stage === "intro" && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-center">
              നിങ്ങൾക്ക് മുമ്പ് ജർമൻ പഠിച്ചിട്ടുണ്ടോ?
            </h2>
            <div className="grid gap-3">
              {priorOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handlePriorKnowledge(opt.key)}
                  className="text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-700 hover:border-amber-400 rounded-xl px-5 py-3.5 transition font-medium text-gray-200 hover:text-amber-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TESTING */}
        {stage === "testing" && currentQuestion && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="text-amber-400 font-bold text-sm">
                {currentLevel} · {LEVEL_TITLES[currentLevel]}
              </span>
              <span className="text-gray-400 text-sm">
                Question {qIndex + 1} / {questions.length}
              </span>
            </div>

            <div className="w-full h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className="text-lg md:text-xl font-semibold mb-6 leading-relaxed">
              {currentQuestion.q}
            </h3>

            {/* മൾട്ടിപ്പിൾ ചോയ്സ് ചോദ്യങ്ങൾ ആണെങ്കിൽ ഓപ്ഷനുകൾ കാണിക്കുന്നു */}
            {(!currentQuestion.type || currentQuestion.type === "mcq") && (
              <div className="grid gap-3 mb-8">
                {currentQuestion.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    className={`text-left rounded-xl px-5 py-3.5 border transition font-medium
                      ${selected === opt
                        ? "border-amber-400 bg-amber-500/10 text-amber-300"
                        : "border-slate-700 bg-slate-900/60 text-gray-200 hover:border-slate-500"}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* ടൈപ്പ് ചെയ്യേണ്ട ചോദ്യങ്ങൾ (Text Input) ആണെങ്കിൽ ഇൻപുട്ട് ബോക്സ് കാണിക്കുന്നു */}
            {currentQuestion.type === "text" && (
              <div className="mb-8">
                <input
                  type="text"
                  value={textInputAnswer}
                  onChange={(e) => setTextInputAnswer(e.target.value)}
                  placeholder="ഉത്തരം ഇവിടെ ടൈപ്പ് ചെയ്യുക..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            )}

            <button
              onClick={submitAnswer}
              disabled={(!currentQuestion.type || currentQuestion.type === "mcq") ? selected === null : textInputAnswer.trim() === ""}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition"
            >
              {qIndex + 1 < questions.length ? "Next Question" : "Finish Level"}
            </button>
          </div>
        )}

        {/* TRANSITION between passed levels */}
        {stage === "transition" && (
          <div className="bg-slate-800/60 border border-amber-400/40 rounded-2xl p-8 shadow-lg text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-amber-400 mb-2">
              {currentLevel} Passed — {Math.round((levelResults[currentLevel] || 0) * 100)}%
            </h2>
            <p className="text-gray-300 mb-8">
              Great work. Let's check whether you're ready for {LEVELS[levelIndex + 1]}.
            </p>
            <button
              onClick={continueToNextLevel}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-8 rounded-xl transition"
            >
              Start {LEVELS[levelIndex + 1]} Test
            </button>
          </div>
        )}

        {/* RESULT */}
        {stage === "result" && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8 shadow-lg text-center">
            {finalStatus === "zero" && (
              <>
                <div className="text-4xl mb-4">🔤</div>
                <h2 className="text-2xl font-bold text-amber-400 mb-3">
                  നിങ്ങളുടെ തുടക്കം: Level 0 — Alphabet Course
                </h2>
                <p className="text-gray-300 mb-2">
                  ജർമൻ അക്ഷരമാല, ഉച്ചാരണം, അടിസ്ഥാന ശബ്ദങ്ങൾ എന്നിവയിൽ നിന്ന് ആരംഭിക്കാം.
                </p>
              </>
            )}

            {finalStatus === "stopped" && (
              <>
                <div className="text-4xl mb-4">📍</div>
                <h2 className="text-2xl font-bold text-amber-400 mb-3">
                  നിങ്ങളുടെ നിലവിലെ ജർമൻ നിലവാരം{" "}
                  {levelIndex > 0 ? LEVELS[levelIndex - 1] : "Beginner"} ആണ്.
                </h2>
                <p className="text-gray-300 mb-2">
                  {finalLevel} ടെസ്റ്റിൽ നിങ്ങൾക്ക് {Math.round((levelResults[finalLevel] || 0) * 100)}% സ്കോർ ലഭിച്ചു
                  (80% വേണം അടുത്ത ലെവലിലേക്ക് പോകാൻ).
                </p>
                <p className="text-gray-300 mb-2">
                  ഇനി നിങ്ങൾ <span className="text-amber-400 font-bold">{finalLevel}</span> മുതൽ പഠനം ആരംഭിക്കണം.
                </p>
              </>
            )}

            {finalStatus === "passedAll" && (
              <>
                <div className="text-4xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-amber-400 mb-3">
                  അഭിനന്ദനങ്ങൾ! നിങ്ങൾ C2 നിലവാരത്തിൽ എത്തി
                </h2>
                <p className="text-gray-300 mb-2">
                  എല്ലാ ലെവലും വിജയകരമായി പൂർത്തിയാക്കി. Mastery-level content ലേക്ക് പോകാം.
                </p>
              </>
            )}

            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 mt-6 mb-8 text-left">
              <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-3">
                Personal Study Plan
              </h3>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>
                  Start at: <strong className="text-white">
                    {finalStatus === "zero" ? "Level 0 (Alphabet)" : finalLevel}
                  </strong>
                </li>
                <li>Focus areas: Grammar, Vocabulary, Listening, Reading, Speaking</li>
                <li>Daily AI-guided lesson with progress tracking</li>
                <li>Retest available anytime once you feel ready</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-8 rounded-xl transition">
                Start Learning
              </button>
              <button
                onClick={restart}
                className="border border-slate-700 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-bold py-3 px-8 rounded-xl transition"
              >
                Retake Test
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-8">
          Admin-managed Dynamic Assessment System.
        </p>
      </div>
    </div>
  );
}