'use client';

import { motion } from 'motion/react';
import {
  EASE,
  SectionFrame,
  Reveal,
  ArrowLeftIcon,
  TerminalIcon,
  BriefcaseIcon,
  GridIcon,
  BanknoteIcon,
  ClockIcon,
} from './ui';

const MODULES = [
  {
    icon: TerminalIcon,
    title: 'صياغة الأوامر (Prompt Engineering)',
    body: 'كيف تكتب أوامر دقيقة تحصل بها على نتائج قوية من أي أداة ذكاء اصطناعي',
    highlighted: false,
  },
  {
    icon: BriefcaseIcon,
    title: 'التوظيف في العمل والدراسة',
    body: 'كيف تستخدم الذكاء الاصطناعي فعليًا في مهامك اليومية — الكتابة، البحث، التنظيم، التحليل',
    highlighted: false,
  },
  {
    icon: GridIcon,
    title: 'الأداة المناسبة لكل مهمة',
    body: 'تعرّف على أفضل الأدوات المتاحة وكيف تختار الأنسب حسب حاجتك',
    highlighted: false,
  },
  {
    icon: BanknoteIcon,
    title: 'كيف تربح من الذكاء الاصطناعي',
    body: 'طرق عملية لتحويل هذه المهارة إلى دخل حقيقي — العمل الحر، تقديم خدمات، مشاريع صغيرة',
    highlighted: true,
  },
  {
    icon: ClockIcon,
    title: 'ساعة كاملة من التطبيق الحر والأسئلة المباشرة',
    body: 'تطبّق ما تعلمته مباشرة مع المدرب — لتتأكد أنك طبّقت فعلاً قبل ما تخرج',
    highlighted: false,
  },
];

export default function CurriculumSection() {
  return (
    <SectionFrame num="03" label="البرنامج" id="curriculum">
      <Reveal>
        <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-[1.3] mb-4">
          ماذا ستتعلم في هذه الجلسة؟
        </h2>
        <p className="text-[#8fa0b8] text-lg leading-relaxed mb-10 md:mb-14">
          خمس وحدات تطبيقية — من أول أمر تكتبه إلى أول دخل تحققه.
        </p>
      </Reveal>

      <div>
        {MODULES.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            className="group border-t border-[#13203a] last:border-b"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-7 md:py-9 px-2 md:px-5 transition-colors duration-300 hover:bg-[#0a1424]/70">
              <div className="flex items-center gap-5 md:gap-8 shrink-0">
                <span
                  dir="ltr"
                  className="font-jetbrains text-2xl md:text-3xl w-12 text-[#39506f] group-hover:text-[#c9a84c] transition-colors duration-300"
                >
                  0{i + 1}
                </span>
                <span
                  className={`grid place-items-center w-12 h-12 rounded-xl border transition-colors duration-300 ${
                    mod.highlighted
                      ? 'border-[#c9a84c]/60 bg-[#c9a84c]/10 text-[#e8d48b]'
                      : 'border-[#1a2c48] bg-[#0a1424] text-[#c9a84c] group-hover:border-[#c9a84c]/50'
                  }`}
                >
                  <mod.icon className="w-5 h-5" />
                </span>
              </div>

              <div className="flex-1">
                <h3 className="flex flex-wrap items-center gap-3 text-[#f0ece2] font-extrabold text-xl md:text-2xl mb-1.5 leading-snug">
                  {mod.title}
                  {mod.highlighted && (
                    <span className="rounded-full border border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#e8d48b] text-[11px] font-bold px-3 py-1">
                      الوحدة الذهبية
                    </span>
                  )}
                </h3>
                <p className="text-[#8fa0b8] text-base md:text-lg leading-relaxed">{mod.body}</p>
              </div>

              <ArrowLeftIcon className="hidden md:block w-6 h-6 shrink-0 text-[#c9a84c] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
