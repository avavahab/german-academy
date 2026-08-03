"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addLesson(formData: FormData) {
  const courseLevelCode = formData.get("courseLevel") as string;
  const daySelection = formData.get("daySelection") as string; // ഉദാ: Day 1
  const lessonTitle = formData.get("lessonTitle") as string;     // ടൈറ്റിൽ (ഉദാ: Basic Grammar)
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;           // പുതിയത്
  const videoUrl = formData.get("videoUrl") as string;           // പുതിയത്

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

    // ദിവസവും ടൈറ്റിലും ചേർത്ത് ഫുൾ ടൈറ്റിൽ ഉണ്ടാക്കുന്നു (ഉദാ: Day 1: Basic Grammar)
    const fullTitle = `${daySelection}: ${lessonTitle}`;

    await db.lesson.create({
      data: {
        title: fullTitle,
        content: content,
        imageUrl: imageUrl ? imageUrl : null,
        videoUrl: videoUrl ? videoUrl : null,
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