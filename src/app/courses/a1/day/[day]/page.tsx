import { db } from "@/lib/db";
import DayLessonClient from "./DayLessonClient";

interface PageProps {
  params: Promise<{ day: string }>;
}

export default async function DayLessonPage({ params }: PageProps) {
  const resolvedParams = await params;
  const dayNumber = resolvedParams?.day ? Number(resolvedParams.day) : 1;

  // Supabase ഡാറ്റാബേസിൽ നിന്ന് A1 ലെവലിലെയും ഈ ദിവസത്തെയും (dayNumber) പാഠങ്ങൾ ഫെച്ച് ചെയ്യുന്നു
  const courseLevel = await db.courseLevel.findUnique({
    where: { level: "A1" },
    include: {
      lessons: {
        where: { dayNumber: dayNumber },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const dbLessons = courseLevel?.lessons || [];

  // ഡാറ്റാബേസിൽ പാഠങ്ങൾ ഉണ്ടെങ്കിൽ അവയും, ഇല്ലെങ്കിൽ ഡിഫോൾട്ട് പാഠങ്ങളും നൽകുന്നു
  const subLessons = dbLessons.length > 0 
    ? dbLessons.map((lesson, index) => ({
        id: index + 1,
        title: lesson.title,
        content: lesson.content || lesson.keyPoints || "വിവരങ്ങൾ ലഭ്യമല്ല.",
      }))
    : [
        { id: 1, title: 'Introduction & Basics', content: 'ഇന്നത്തെ പാഠത്തിന്റെ ആമുഖം.' },
        { id: 2, title: 'Core Concepts', content: 'പ്രധാനപ്പെട്ട ആശയങ്ങൾ.' },
        { id: 3, title: 'Examples & Practice', content: 'ഉദാഹരണങ്ങളും പരിശീലനവും.' },
      ];

  return <DayLessonClient dayNumber={dayNumber} initialSubLessons={subLessons} />;
}