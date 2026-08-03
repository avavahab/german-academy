import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend API Key .env ഫയലിൽ നിന്ന് എടുക്കുന്നു
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email;
    const name = body?.name || "Student";

    if (!email) {
      return NextResponse.json({ error: "ഇമെയിൽ അഡ്രസ് നൽകിയിട്ടില്ല." }, { status: 400 });
    }

    // 4 അക്ക ഒടിപി ജനേറ്റ് ചെയ്യുന്നു
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Resend വഴി ഇമെയിൽ അയക്കുന്നു
    const { data, error } = await resend.emails.send({
      from: 'German Academy <onboarding@resend.dev>', // നിങ്ങളുടെ സ്വന്തം ഡൊമെയ്ൻ സെറ്റ് ചെയ്താൽ ഇവിടെ മാറ്റാം
      to: [email],
      subject: 'German Academy - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; border-radius: 10px;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #4f46e5; text-align: center;">German Academy</h2>
            <p style="font-size: 16px; color: #374151;">ഹലോ <b>${name}</b>,</p>
            <p style="font-size: 16px; color: #374151;">ഞങ്ങളുടെ അക്കാദമിയിലേക്ക് സ്വാഗതം! നിങ്ങളുടെ ഇമെയിൽ വെരിഫൈ ചെയ്യാനുള്ള ഒടിപി (OTP) കോഡ് താഴെ നൽകുന്നു:</p>
            
            <div style="background: #eef2ff; color: #4f46e5; padding: 15px; font-size: 28px; font-weight: bold; text-align: center; letter-spacing: 6px; border-radius: 8px; margin: 20px 0;">
              ${otp}
            </div>
            
            <p style="font-size: 14px; color: #6b7280; text-align: center;">ഈ കോഡ് ആരുമായും പങ്കുവെക്കരുത്. ഇത് കുറച്ചു സമയത്തേക്ക് മാത്രമേ ഉണ്ടാകൂ.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, otp, data });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}