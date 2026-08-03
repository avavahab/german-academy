"use client";

import { useState } from "react";
import { db } from "@/lib/db"; // ഡാറ്റാബേസ് കണക്ഷൻ
import { revalidatePath } from "next/cache";

export default function AdminLessonsPage() {
  const [totalDays, setTotalDays] = useState<number>(60);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const courseLevels = [
    { id: "a1", title: "A1 Level", level: "A1" },
    { id: "a2", title: "A2 Level", level: "A2" },
    { id: "b1", title: "B1 Level", level: "B1" },
    { id: "b2", title: "B2 Level", level: "B2" },
    { id: "c1", title: "C1 Level", level: "C1" },
    { id: "c2", title: "C2 Level", level: "C2" },
  ];

  const daysList = Array.from({ length: totalDays }, (_, i) => `Day ${i + 1}`);

  async function handleAddLesson(formData: FormData) {
    setLoading(true);
    setMessage("");

    const courseLevelCode = formData.get("courseLevel") as string;
    const dayTitle = formData.get("dayTitle") as string;
    const content = formData.get("content") as string;

    try {
      // 1. ഡാറ്റാബേസിൽ ഈ ലെവൽ (ഉദാ: A1) ഉണ്ടോ എന്ന് നോക്കുന്നു, ഇല്ലെങ്കിൽ ഉണ്ടാക്കുന്നു
      let levelRecord = await db.courseLevel.findUnique({
        where: { level: courseLevelCode },
      });

      if (!levelRecord) {
        levelRecord = await db.courseLevel.create({
          data: {
            level: courseLevelCode,
            title: `${courseLevelCode} Course`,
          },
        });
      }

      // 2. ആ ലെവലിലേക്ക് ലെസൺ സേവ് ചെയ്യുന്നു
      await db.lesson.create({
        data: {
          title: dayTitle,
          content: content,
          courseLevelId: levelRecord.id,
        },
      });

      setMessage("പാഠം വിജയകരമായി സേവ് ചെയ്തു! ✅");
    } catch (error) {
      console.error(error);
      setMessage("സേവ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക. ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold text-green-400">പാഠങ്ങൾ (Lessons) ചേർക്കുക</h1>

        {message && (
          <div className={`p-3 rounded text-sm ${message.includes("✅") ? "bg-green-600" : "bg-red-600"}`}>
            {message}
          </div>
        )}

        <form action={handleAddLesson} className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">ഏത് ദിവസത്തെ പാഠമാണ് (Day Selection):</label>
            <select name="dayTitle" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" required>
              <option value="">-- ദിവസം തിരഞ്ഞെടുക്കുക --</option>
              {daysList.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">പാഠഭാഗങ്ങൾ / കണ്ടന്റ് (Content):</label>
            <textarea name="content" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" placeholder="വിവരങ്ങൾ ഇവിടെ എഴുതുക..." required />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-medium transition disabled:opacity-50"
          >
            {loading ? "സേവ് ചെയ്യുന്നു..." : "പാഠം സേവ് ചെയ്യുക"}
          </button>
        </form>
      </div>
    </div>
  );
}