"use client";

import { useState, useTransition, useRef } from "react";
import { addLesson } from "./actions";

interface LessonItem {
  id: string;
  title: string;
  content: string | null;
  dayNumber: number;
  courseLevel: {
    level: string;
    title: string;
  };
}

export default function AdminLessonsClientWrapper({ 
  initialLessons, 
  deleteAction 
}: { 
  initialLessons: LessonItem[], 
  deleteAction: (id: string) => Promise<{ success: boolean; message: string }> 
}) {
  const [lessons, setLessons] = useState<LessonItem[]>(initialLessons);
  const [totalDays, setTotalDays] = useState<number>(60);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const courseLevels = [
    { id: "a1", title: "A1 Level", level: "A1" },
    { id: "a2", title: "A2 Level", level: "A2" },
    { id: "b1", title: "B1 Level", level: "B1" },
    { id: "b2", title: "B2 Level", level: "B2" },
    { id: "c1", title: "C1 Level", level: "C1" },
    { id: "c2", title: "C2 Level", level: "C2" },
  ];

  const daysList = Array.from({ length: totalDays }, (_, i) => `Day ${i + 1}`);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setMessage("");
    startTransition(async () => {
      const result = await addLesson(formData);
      setMessage(result.message);
      if (result.success) {
        formRef.current?.reset();
        window.location.reload(); // പുതിയ പാഠം ലിസ്റ്റിൽ കാണാൻ പേജ് റിഫ്രഷ് ചെയ്യുന്നു
      }
    });
  }

  async function handleDelete(lessonId: string) {
    if (!confirm("തീർച്ചയായും ഈ പാഠം ഡിലീറ്റ് ചെയ്യണമെന്നുണ്ടോ?")) return;

    startTransition(async () => {
      const result = await deleteAction(lessonId);
      setMessage(result.message);
      if (result.success) {
        setLessons(lessons.filter((l) => l.id !== lessonId));
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* പാഠങ്ങൾ ചേർക്കാനുള്ള ഫോം */}
        <div className="bg-gray-800 p-6 rounded-lg shadow space-y-6">
          <h1 className="text-2xl font-bold text-green-400">പാഠങ്ങൾ (Lessons) ചേർക്കുക</h1>

          {message && (
            <div className={`p-3 rounded text-sm ${message.includes("✅") || message.includes("🗑️") ? "bg-green-600" : "bg-red-600"}`}>
              {message}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">കോഴ്സ് ലെവൽ:</label>
              <select name="courseLevel" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" required>
                <option value="">-- ലെവൽ തിരഞ്ഞെടുക്കുക --</option>
                {courseLevels.map((lvl) => (
                  <option key={lvl.id} value={lvl.level}>{lvl.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ഈ ലെവലിലെ ആകെ ദിവസങ്ങൾ (Total Days):</label>
              <input 
                type="number" 
                value={totalDays} 
                onChange={(e) => setTotalDays(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                min={1}
                max={365}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ഏത് ദിവസം (Day Selection):</label>
              <select name="daySelection" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" required>
                <option value="">-- ദിവസം തിരഞ്ഞെടുക്കുക --</option>
                {daysList.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">പാഠത്തിന്റെ ടൈറ്റിൽ (Lesson Title):</label>
              <input 
                type="text" 
                name="lessonTitle" 
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" 
                placeholder="ഉദാ: Introduction to German Alphabet" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">പാഠഭാഗങ്ങൾ / കണ്ടന്റ് (Content - Optional):</label>
              <textarea name="content" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" placeholder="വിവരങ്ങൾ ഇവിടെ എഴുതുക..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">പ്രധാന പോയിന്റുകൾ (Key Points - Optional):</label>
              <textarea 
                name="keyPoints" 
                rows={3} 
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" 
                placeholder="ഉദാ: 
- പോയിന്റ് 1
- പോയിന്റ് 2" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ഇമേജ് ലിങ്ക് (Image URL - Optional):</label>
              <input 
                type="url" 
                name="imageUrl" 
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" 
                placeholder="https://example.com/image.jpg" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">വീഡിയോ ലിങ്ക് (Video URL - Optional):</label>
              <input 
                type="url" 
                name="videoUrl" 
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" 
                placeholder="https://youtube.com/..." 
              />
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-medium transition disabled:opacity-50"
            >
              {isPending ? "സേവ് ചെയ്യുന്നു..." : "പാഠം സേവ് ചെയ്യുക"}
            </button>
          </form>
        </div>

        {/* ഡാറ്റാബേസിലുള്ള പാഠങ്ങൾ കാണാനും ഡിലീറ്റ് ചെയ്യാനുമുള്ള സെക്ഷൻ */}
        <div className="bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-amber-400">നിലവിലുള്ള പാഠങ്ങൾ (Manage Existing Lessons)</h2>
          
          {lessons.length === 0 ? (
            <p className="text-gray-400 text-sm">പാഠങ്ങൾ ഒന്നും ഇതുവരെ ചേർത്തിട്ടില്ല.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="bg-gray-700/60 border border-gray-600 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="flex gap-2 mb-1">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded font-bold">
                        {lesson.courseLevel.level}
                      </span>
                      <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded font-bold">
                        Day {lesson.dayNumber}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold">{lesson.title}</h3>
                    <p className="text-gray-400 text-xs truncate max-w-sm">{lesson.content || "കണ്ടന്റ് നൽകിയിട്ടില്ല"}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(lesson.id)}
                    disabled={isPending}
                    className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded text-xs font-medium transition shrink-0"
                  >
                    🗑️ ഡിലീറ്റ്
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}