import { supabase } from './supabase';

interface InlineBookingData {
  firstName: string;
  lastName: string;
  phone: string;
  sector: string;
  llcName: string;
}

export async function submitInlineBooking(data: InlineBookingData): Promise<void> {
  const { error } = await supabase.from('inline_booking_leads').insert({
    first_name: data.firstName,
    last_name: data.lastName,
    phone_number: data.phone,
    sector: data.sector,
    llc_name: data.llcName
  });

  if (error) {
    console.error('Supabase inline_booking_leads insert error:', error);
    throw new Error(error.message);
  }
}
