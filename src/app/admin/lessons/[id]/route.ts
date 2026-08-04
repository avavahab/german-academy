import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// പാഠം എഡിറ്റ് ചെയ്യാനും അപ്ഡേറ്റ് ചെയ്യാനും
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, content, imageUrl } = await request.json();

    const updatedLesson = await prisma.lesson.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl, // പുതിയ ഇമേജ് ലിങ്ക്
      },
    });

    return NextResponse.json({ success: true, updatedLesson });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update lesson" }, { status: 500 });
  }
}