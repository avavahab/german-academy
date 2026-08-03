"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addLesson(formData: FormData) {
  const courseLevelCode = formData.get("courseLevel") as string;
  const dayTitle = formData.get("dayTitle") as string;
  const content = formData.get("content") as string;

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

    await db.lesson.create({
      data: {
        title: dayTitle,
        content: content,
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