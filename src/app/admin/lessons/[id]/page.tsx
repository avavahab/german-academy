import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // നമ്മൾ നേരത്തെ ഉണ്ടാക്കിയ ഗ്ലോബൽ db ഉപയോഗിക്കുന്നു

// പാഠം ഫെച്ച് ചെയ്യാൻ (GET)
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const lesson = await db.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      return NextResponse.json({ success: false, error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lesson });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch lesson" }, { status: 500 });
  }
}

// പാഠം അപ്ഡേറ്റ് ചെയ്യാൻ (PUT)
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { title, content, keyPoints, videoUrl, imageUrl } = await request.json();

    const updatedLesson = await db.lesson.update({
      where: { id },
      data: {
        title,
        content,
        keyPoints,
        videoUrl,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, updatedLesson });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update lesson" }, { status: 500 });
  }
}