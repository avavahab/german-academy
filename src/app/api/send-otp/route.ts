import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Resend ഉപയോഗിച്ച് ഇമെയിൽ അയക്കുന്നു
    const data = await resend.emails.send({
      from: 'German Academy <onboarding@resend.dev>', // നിങ്ങളുടെ ഡൊമെയ്ൻ അല്ലെങ്കിൽ Resend-ന്റെ ഡിഫോൾട്ട് ഇമെയിൽ
      to: [email],
      subject: 'German Academy - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #f59e0b;">Welcome to German Academy, ${name}!</h2>
          <p>നിങ്ങളുടെ ഇമെയിൽ വെരിഫൈ ചെയ്യാനുള്ള ഒടിപി (OTP) കോഡ് താഴെ നൽകുന്നു:</p>
          <div style="background: #f3f4f6; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; border-radius: 8px;">
            ${otp}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: 666;">ഈ കോഡ് ആരുമായും പങ്കുവെക്കരുത്.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, otp, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}