import { supabase } from './supabase';

interface LLCFormData {
    name: string;
    email: string;
    countryCode: string;
    phone: string;
    goal: string;
    hasLlc: string;
    industry: string[];
    timeline: string;
    budget: string;
}

export async function submitLLCForm(formData: LLCFormData): Promise<void> {
    const whatsapp = `${formData.countryCode} ${formData.phone}`;

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('llc_formation_leads').insert({
        full_name: formData.name,
        email: formData.email,
        whatsapp_number: whatsapp,
        primary_goal: formData.goal,
        has_existing_llc: formData.hasLlc === 'نعم، لدي LLC',
        business_field: formData.industry.join(', ') || 'غير محدد',
        start_timeline: formData.timeline,
        expected_budget: formData.budget,
    });

    if (dbError) {
        console.error('Supabase insert error:', dbError);
        throw new Error(dbError.message);
    }

    // 2. Send email notification
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        await fetch(`${supabaseUrl}/functions/v1/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({
                formType: 'llc_formation',
                data: {
                    full_name: formData.name,
                    email: formData.email,
                    whatsapp_number: whatsapp,
                    primary_goal: formData.goal,
                    has_existing_llc: formData.hasLlc === 'نعم، لدي LLC',
                    existing_llc_state: '',
                    business_field: formData.industry.join(', ') || 'غير محدد',
                    start_timeline: formData.timeline,
                    expected_budget: formData.budget,
                },
            }),
        });
    } catch (emailError) {
        // Email failure should not block the form submission
        console.error('Email sending failed:', emailError);
    }
}
