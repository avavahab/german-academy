"use client";
import { useState } from "react";

export default function AdminLessonsPage() {
  const [totalDays, setTotalDays] = useState<number>(60); // ഡിഫോൾട്ട് ആയി 60 ദിവസം, അഡ്മിന് മാറ്റാം

  // ജർമൻ ലെവലുകൾ
  const courseLevels = [
    { id: "a1", title: "A1 Level", level: "A1" },
    { id: "a2", title: "A2 Level", level: "A2" },
    { id: "b1", title: "B1 Level", level: "B1" },
    { id: "b2", title: "B2 Level", level: "B2" },
    { id: "c1", title: "C1 Level", level: "C1" },
    { id: "c2", title: "C2 Level", level: "C2" },
  ];

  // അഡ്മിൻ നൽകുന്ന ദിവസങ്ങളുടെ എണ്ണമനുസരിച്ച് ഡേ ലിസ്റ്റ് ഉണ്ടാക്കുന്നു (ഉദാ: Day 1 മുതൽ Day 60 വരെ അല്ലെങ്കിൽ മാറ്റിയ എണ്ണം)
  const daysList = Array.from({ length: totalDays }, (_, i) => `Day ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold text-green-400">പാഠങ്ങൾ (Lessons) ചേർക്കുക</h1>

        <form className="space-y-4">
          {/* 1. ലെവൽ തിരഞ്ഞെടുക്കുക */}
          <div>
            <label className="block text-sm font-medium mb-2">കോഴ്സ് ലെവൽ:</label>
            <select name="courseLevel" className="w-full p-3 bg-gray-750 border border-gray-600 rounded text-white" required>
              <option value="">-- ലെവൽ തിരഞ്ഞെടുക്കുക --</option>
              {courseLevels.map((lvl) => (
                <option key={lvl.id} value={lvl.level}>{lvl.title}</option>
              ))}
            </select>
          </div>

          {/* 2. ആകെ ദിവസങ്ങളുടെ എണ്ണം മാറ്റാനുള്ള ഓപ്ഷൻ (ഉദാ: 60, 30 മുതലായവ) */}
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

          {/* 3. ഡേ 1 മുതൽ അഡ്മിൻ നിശ്ചയിച്ച ദിവസം വരെയുള്ള ഡ്രോപ്പ്ഡൗൺ */}
          <div>
            <label className="block text-sm font-medium mb-2">ഏത് ദിവസത്തെ പാഠമാണ് (Day Selection):</label>
            <select name="dayTitle" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" required>
              <option value="">-- ദിവസം തിരഞ്ഞെടുക്കുക --</option>
              {daysList.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          {/* 4. പാഠഭാഗങ്ങൾ */}
          <div>
            <label className="block text-sm font-medium mb-2">പാഠഭാഗങ്ങൾ / കണ്ടന്റ് (Content):</label>
            <textarea name="content" rows={4} className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white" placeholder="വിവരങ്ങൾ ഇവിടെ എഴുതുക..." required />
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-medium transition">
            പാഠം സേവ് ചെയ്യുക
          </button>
        </form>
      </div>
    </div>
  );
}