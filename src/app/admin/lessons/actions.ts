"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addLesson(formData: FormData) {
  const courseLevelCode = formData.get("courseLevel") as string;
  const daySelection = formData.get("daySelection") as string; // ഉദാ: "Day 1"
  const lessonTitle = formData.get("lessonTitle") as string;       // ടൈറ്റിൽ (ഉദാ: Basic Grammar)
  const content = formData.get("content") as string;
  const keyPoints = formData.get("keyPoints") as string;         // പുതിയത്: പോയിന്റുകൾ
  const imageUrl = formData.get("imageUrl") as string;            
  const videoUrl = formData.get("videoUrl") as string;            

  try {
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

    // "Day 1" എന്നതിൽ നിന്ന് നമ്പര്‍ മാത്രം എക്സ്ട്രാക്റ്റ് ചെയ്യുന്നു (ഉദാ: 1)
    const dayNumber = parseInt(daySelection.replace(/\D/g, "")) || 1;

    // ദിവസവും ടൈറ്റിലും ചേർത്ത് ഫുൾ ടൈറ്റിൽ ഉണ്ടാക്കുന്നു
    const fullTitle = `${daySelection}: ${lessonTitle}`;

    await db.lesson.create({
      data: {
        title: fullTitle,
        content: content ? content : null,
        keyPoints: keyPoints ? keyPoints : null,
        imageUrl: imageUrl ? imageUrl : null,
        videoUrl: videoUrl ? videoUrl : null,
        dayNumber: dayNumber, // പുതിയത്: ഡേ നമ്പർ ഡാറ്റാബേസിലേക്ക് സേവ് ചെയ്യുന്നു
        courseLevelId: levelRecord.id,
      },
    });

    revalidatePath("/admin/lessons");
    return { success: true, message: "പാഠം വിജയകരമായി സേവ് ചെയ്തു! ✅" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "സേവ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ❌" };
  }
}