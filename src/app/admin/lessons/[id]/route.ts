import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// പാഠം എഡിറ്റ് ചെയ്യാനും അപ്ഡേറ്റ് ചെയ്യാനും
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // params-നെ await ചെയ്യുക
    const { title, content, keyPoints, videoUrl, imageUrl } = await request.json();

    const updatedLesson = await prisma.lesson.update({
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