import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ഫയലിന്റെ പേര് یونീക്ക് ആക്കാൻ ടൈംസ്റ്റാംപ് ചേർക്കുന്നു
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const pathDir = path.join(process.cwd(), 'public/uploads', filename);

    // public/uploads ഫോൾഡറിലേക്ക് ഫയൽ സേവ് ചെയ്യുന്നു
    await writeFile(pathDir, buffer);

    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Image upload failed" }, { status: 500 });
  }
}