import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, answers, status } = body;

    // Server-side validation
    if (!name?.trim() || !phone?.trim() || !status?.trim()) {
      return NextResponse.json({ error: 'حقول مطلوبة مفقودة' }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('quiz_leads')
      .insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          q3: answers?.q3 || null,
          q4: answers?.q4 || null,
          q5: answers?.q5 || null,
          status: status.trim()
        }
      ]);

    if (error) {
      console.error('[Supabase Insert Error]', error);
      return NextResponse.json({ error: 'حدث خطأ أثناء حفظ البيانات' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Quiz Register Error]', error);
    return NextResponse.json({ error: 'خطأ داخلي، يرجى المحاولة لاحقاً' }, { status: 500 });
  }
}
