import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. പ്ലേസ്മെന്റ് ചോദ്യം ആഡ് ചെയ്യാൻ
async function handleAddQuestion(formData: FormData) {
  "use server";
  const question = formData.get("question") as string;
  const correctAnswer = formData.get("correctAnswer") as string;
  const options = [
    formData.get("opt0") as string,
    formData.get("opt1") as string,
    formData.get("opt2") as string,
    formData.get("opt3") as string,
  ];

  if (!question || !correctAnswer) return;

  await db.question.create({
    data: { question, options, correctAnswer },
  });

  revalidatePath("/admin");
}

// 2. പ്ലേസ്മെന്റ് ചോദ്യം ഡിലീറ്റ് ചെയ്യാൻ
async function handleDeleteQuestion(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await db.question.delete({ where: { id } });
  revalidatePath("/admin");
}

// 3. കോഴ്സ് ലെസ്സൺ (Lesson / Day content) ആഡ് ചെയ്യാൻ
async function handleAddLesson(formData: FormData) {
  "use server";
  const title = formData.get("title") as string; // ഉദാഹരണത്തിന്: "Day 1: Introduction"
  const content = formData.get("content") as string; // പാഠഭാഗങ്ങൾ
  const courseLevelId = formData.get("courseLevelId") as string; // A1 ലെവലിന്റെ ID

  if (!title || !content || !courseLevelId) return;

  await db.lesson.create({
    data: {
      title,
      content,
      courseLevelId,
    },
  });

  revalidatePath("/admin");
}

export default async function AdminPage() {
  const questions = await db.question.findMany({ orderBy: { createdAt: "desc" } });
  const courseLevels = await db.courseLevel.findMany({ include: { lessons: true } });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-indigo-400">Admin Dashboard - German Academy</h1>

        {/* --- SECTION 1: PLACEMENT TEST QUESTIONS --- */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">പ്ലേസ്മെന്റ് ടെസ്റ്റ് ചോദ്യങ്ങൾ ചേർക്കുക</h2>
          
          <form action={handleAddQuestion} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">ചോദ്യം:</label>
              <input
                type="text"
                name="question"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                placeholder="ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">ഓപ്ഷൻ {index + 1}:</label>
                  <input
                    type="text"
                    name={`opt${index}`}
                    className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                    placeholder={`ഓപ്ഷൻ ${index + 1}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ശരിയായ ഉത്തരം:</label>
              <input
                type="text"
                name="correctAnswer"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                placeholder="ശരിയായ ഉത്തരം ഇവിടെ നൽകുക..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded font-medium transition"
            >
              ചോദ്യം സേവ് ചെയ്യുക
            </button>
          </form>

          <h3 className="text-lg font-semibold mb-3 text-gray-300">നിലവിലുള്ള ചോദ്യങ്ങൾ</h3>
          {questions.length === 0 ? (
            <p className="text-gray-400 text-sm">ചോദ്യങ്ങൾ ഒന്നും ലഭ്യമല്ല.</p>
          ) : (
            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="p-3 bg-gray-700 rounded flex justify-between items-start">
                  <div>
                    <p className="font-medium text-indigo-300">{q.question}</p>
                    <p className="text-xs text-green-400 mt-1">ശരിയായ ഉത്തരം: {q.correctAnswer}</p>
                  </div>
                  <form action={handleDeleteQuestion}>
                    <input type="hidden" name="id" value={q.id} />
                    <button type="submit" className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs text-white">
                      ഡിലീറ്റ്
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- SECTION 2: COURSE LESSONS (60 DAYS CONTENT) --- */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">കോഴ്സ് പാഠങ്ങൾ (Lessons / Days) ചേർക്കുക</h2>
          
          <form action={handleAddLesson} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">കോഴ്സ് ലെവൽ തിരഞ്ഞെടുക്കുക:</label>
              <select 
                name="courseLevelId" 
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">-- ലെവൽ തിരഞ്ഞെടുക്കുക (ഉദാ: A1) --</option>
                {courseLevels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.title} ({lvl.level})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">പാഠത്തിന്റെ പേര് (ഉദാ: Day 1 - Alphabet):</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                placeholder="Day 1..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">പാഠഭാഗങ്ങൾ / കണ്ടന്റ് (Content):</label>
              <textarea
                name="content"
                rows={4}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-indigo-500"
                placeholder="ഈ ദിവസത്തെ പഠന വിവരങ്ങൾ ഇവിടെ എഴുതുക..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded font-medium transition"
            >
              പാഠം (Lesson) സേവ് ചെയ്യുക
            </button>
          </form>

          <h3 className="text-lg font-semibold mb-3 text-gray-300">ആഡ് ചെയ്ത ലെവലുകളും ലെസ്സണുകളും</h3>
          {courseLevels.length === 0 ? (
            <p className="text-gray-400 text-sm">കോഴ്സ് ലെവലുകൾ ഒന്നും ഡാറ്റാബേസിൽ ഇല്ല. (ആദ്യം Supabase-ൽ അല്ലെങ്കിൽ Prisma വഴി ഒരു A1 CourseLevel ഉണ്ടെന്ന് ഉറപ്പുവരുത്തുക).</p>
          ) : (
            <div className="space-y-4">
              {courseLevels.map((lvl) => (
                <div key={lvl.id} className="p-4 bg-gray-700 rounded">
                  <h4 className="font-bold text-indigo-300 text-lg">{lvl.title} ({lvl.level})</h4>
                  <p className="text-xs text-gray-400 mt-1">ആകെ ആഡ് ചെയ്ത പാഠങ്ങൾ: {lvl.lessons.length}</p>
                  <ul className="mt-2 space-y-1">
                    {lvl.lessons.map((lesson) => (
                      <li key={lesson.id} className="text-sm bg-gray-800 p-2 rounded flex justify-between">
                        <span>{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}