import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // We use formsubmit.co to send the email directly without requiring SMTP setup or passwords.
    // The very first submission will send an activation email to sed200604@gmail.com.
    const emailPayload = {
      "الاسم الكامل": `${data.firstName} ${data.lastName}`,
      "رقم الهاتف": data.phone,
      "اسم الشركة": data.llcName || 'غير محدد',
      "قطاع النشاط": data.sector || 'غير محدد',
      _subject: "🎉 تسجيل جديد في الاستشارة!"
    };

    const [res1, res2] = await Promise.all([
      fetch("https://formsubmit.co/ajax/sed200604@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailPayload)
      }),
      fetch("https://formsubmit.co/ajax/abenameur231@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailPayload)
      })
    ]);

    if (!res1.ok || !res2.ok) {
      console.error('Failed to send email via FormSubmit to one or both addresses');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in email-notify route:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
