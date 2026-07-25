'use client';

import {
  Barcode,
  BanknoteIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  Reveal,
  SectionFrame,
  TicketIcon,
} from './ui';

const DETAILS = [
  { icon: CalendarIcon, label: 'التاريخ', value: '8 أوت' },
  { icon: ClockIcon, label: 'التوقيت', value: '10:00 صباحًا — 16:00' },
  { icon: MapPinIcon, label: 'المكان', value: 'مول باب الزوار، المحمدية' },
  { icon: BanknoteIcon, label: 'السعر', value: '8,000 دج' },
  { icon: TicketIcon, label: 'الأماكن', value: '20 مقعدًا فقط' },
];

export default function LogisticsSection() {
  return (
    <SectionFrame num="07" label="التفاصيل">
      <Reveal>
        <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-10">
          تذكرتك إلى الجلسة
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex flex-col md:flex-row rounded-2xl border border-[#1a2c48] bg-[#0a1424] overflow-hidden max-w-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* Main panel */}
          <div className="flex-1 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <span dir="ltr" className="font-jetbrains text-[10px] tracking-[0.3em] text-[#5d6e85]">
                BOARDING PASS — AI SESSION
              </span>
              <span className="text-[#f0ece2] font-black text-sm">
                GO <span className="text-[#c9a84c]">LLC</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-7">
              {DETAILS.map((item, i) => (
                <div key={i} className={i === DETAILS.length - 1 && DETAILS.length % 2 !== 0 ? 'col-span-2' : ''}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <item.icon className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-[#5d6e85] text-xs font-bold tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-[#f0ece2] font-extrabold text-base md:text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perforated divider */}
          <div className="relative shrink-0">
            <div className="hidden md:block h-full border-r-2 border-dashed border-[#1a2c48]" />
            <div className="md:hidden w-full border-t-2 border-dashed border-[#1a2c48]" />
            {/* notches */}
            <span className="hidden md:block absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#060c17] border border-[#13203a]" />
            <span className="hidden md:block absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#060c17] border border-[#13203a]" />
            <span className="md:hidden absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#060c17] border border-[#13203a]" />
            <span className="md:hidden absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#060c17] border border-[#13203a]" />
          </div>

          {/* Stub */}
          <div className="md:w-52 bg-[#0c1526] p-6 sm:p-8 flex md:flex-col items-center justify-between gap-5">
            <div className="text-center">
              <span dir="ltr" className="block font-jetbrains text-[10px] tracking-[0.3em] text-[#5d6e85] mb-1">
                ADMIT ONE
              </span>
              <span dir="ltr" className="block font-jetbrains text-[#e8d48b] text-2xl">
                AUG 08
              </span>
            </div>
            <Barcode className="w-24 h-9 text-[#39506f]" />
            <span dir="ltr" className="font-jetbrains text-[10px] tracking-[0.25em] text-[#5d6e85]">
              SEAT 01—20
            </span>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
