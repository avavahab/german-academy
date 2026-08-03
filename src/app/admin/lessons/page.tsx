import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import AdminLessonsClientWrapper from "./AdminLessonsClientWrapper";

// ഡിലീറ്റ് ചെയ്യാനുള്ള സർവർ ആക്ഷൻ
async function deleteLesson(lessonId: string) {
  "use server";
  try {
    await db.lesson.delete({
      where: { id: lessonId },
    });
    revalidatePath("/admin/lessons");
    revalidatePath("/courses/a1/day/[day]");
    return { success: true, message: "പാഠം വിജയകരമായി ഡിലീറ്റ് ചെയ്തു! 🗑️" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "ഡിലീറ്റ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ❌" };
  }
}

export default async function AdminLessonsPage() {
  // ഡാറ്റാബേസിൽ നിന്ന് എല്ലാ ലെസനുകളും ഫെച്ച് ചെയ്യുന്നു
  const lessons = await db.lesson.findMany({
    include: {
      courseLevel: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminLessonsClientWrapper initialLessons={lessons} deleteAction={deleteLesson} />;
}