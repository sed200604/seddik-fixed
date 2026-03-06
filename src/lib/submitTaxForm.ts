import { supabase } from './supabase';

interface TaxFormData {
    name: string;
    email: string;
    countryCode: string;
    phone: string;
    goal: string;
    hasLlc: string;
    timeline: string;
}

export async function submitTaxForm(formData: TaxFormData): Promise<void> {
    const whatsapp = `${formData.countryCode} ${formData.phone}`;
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || formData.name;
    const lastName = nameParts.slice(1).join(' ') || 'غير محدد';

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('tax_filing_leads').insert({
        first_name: firstName,
        last_name: lastName,
        whatsapp_number: whatsapp,
        company_name: 'غير محدد',
        formation_year: 'غير محدد',
        formation_state: 'غير محدد',
        filed_before: formData.hasLlc,
        additional_notes: formData.goal,
    });

    if (dbError) {
        console.error('Supabase insert error (tax):', dbError);
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
                formType: 'tax_filing',
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    whatsapp_number: whatsapp,
                    company_name: 'غير محدد',
                    formation_year: 'غير محدد',
                    formation_state: 'غير محدد',
                    filed_before: formData.hasLlc,
                    additional_notes: formData.goal,
                },
            }),
        });
    } catch (emailError) {
        console.error('Email sending failed (tax):', emailError);
    }
}
