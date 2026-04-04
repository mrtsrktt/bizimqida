import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Tüm alanlar zorunludur.' },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: 'Bizim Qida <onboarding@resend.dev>',
      to: 'info@surkit.com.tr',
      subject: 'Bizim Qida — Yeni İletişim Mesajı',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0D1E40;border-bottom:2px solid #C8A951;padding-bottom:12px">
            Yeni İletişim Mesajı
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40;width:120px">Ad Soyad:</td>
              <td style="padding:10px 0;color:#333">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">E-posta:</td>
              <td style="padding:10px 0;color:#333">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">Telefon:</td>
              <td style="padding:10px 0;color:#333">${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">Konu:</td>
              <td style="padding:10px 0;color:#333">${subject || '—'}</td>
            </tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:6px">
            <strong style="color:#0D1E40">Mesaj:</strong>
            <p style="color:#333;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#999">
            Bu mesaj bizimqida.az iletişim formundan gönderilmiştir.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 },
    );
  }
}
