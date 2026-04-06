import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, contactName, phone, email, address, message } = body;

    if (!businessName || !businessType || !contactName || !phone) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik.' },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: 'Bizim Qida <onboarding@resend.dev>',
      to: 'info@surkit.com.tr',
      subject: 'Bizim Qida — Yeni Başvuru',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0D1E40;border-bottom:2px solid #C8A951;padding-bottom:12px">
            Yeni Bayilik / Tedarik Başvurusu
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40;width:160px">İşletme Adı:</td>
              <td style="padding:10px 0;color:#333">${businessName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">İşletme Türü:</td>
              <td style="padding:10px 0;color:#333">${businessType}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">Yetkili Kişi:</td>
              <td style="padding:10px 0;color:#333">${contactName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">Telefon:</td>
              <td style="padding:10px 0;color:#333">${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">E-posta:</td>
              <td style="padding:10px 0;color:#333">${email || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:bold;color:#0D1E40">Adres:</td>
              <td style="padding:10px 0;color:#333">${address || '—'}</td>
            </tr>
          </table>
          ${message ? `
          <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:6px">
            <strong style="color:#0D1E40">Ek Mesaj:</strong>
            <p style="color:#333;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>` : ''}
          <p style="margin-top:24px;font-size:12px;color:#999">
            Bu başvuru bizimqida.com başvuru formundan gönderilmiştir.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 },
    );
  }
}
