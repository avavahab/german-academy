import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// PostgreSQL പൂൾ സെറ്റപ്പ് (Prisma v7 ആവശ്യപ്പെടുന്നത്)
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// പാഠം എഡിറ്റ് ചെയ്യാനും അപ്ഡേറ്റ് ചെയ്യാനും
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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