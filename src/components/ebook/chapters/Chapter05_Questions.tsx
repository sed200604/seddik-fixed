'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

interface Chapter05Props {
  onVisible: (chapterIndex: number) => void;
}

type Severity = 'safe' | 'doubt' | 'warning' | 'disaster';

interface QuizOption {
  text: string;
  severity: Severity;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const SEVERITY_STYLES: Record<Severity, { borderColor: string; label: string; labelColor: string }> = {
  safe: {
    borderColor: 'var(--color-ebook-green)',
    label: 'آمن',
    labelColor: 'var(--color-ebook-green)',
  },
  doubt: {
    borderColor: 'oklch(0.80 0.16 90)',
    label: 'شك',
    labelColor: 'oklch(0.80 0.16 90)',
  },
  warning: {
    borderColor: 'oklch(0.70 0.18 55)',
    label: 'تحذير',
    labelColor: 'oklch(0.70 0.18 55)',
  },
  disaster: {
    borderColor: 'var(--color-ebook-red)',
    label: 'كارثة',
    labelColor: 'var(--color-ebook-red)',
  },
};

const QUIZ_DATA: QuizQuestion[] = [
  {
    question: 'هل عندك مكتب فيزيائي؟',
    options: [
      { text: 'نعم، عنوان حقيقي مع عقد إيجار ويمكنك زيارته', severity: 'safe' },
      { text: 'نعم، عنوان تجاري مسجل لكن ما نستقبلوش زوار', severity: 'doubt' },
      { text: 'نستخدمو عنوان افتراضي من خدمة معروفة', severity: 'warning' },
      { text: 'العنوان مش مهم، كلشي أونلاين', severity: 'disaster' },
    ],
  },
  {
    question: 'هل راح تكون معي في مكالمة أثناء التأسيس؟',
    options: [
      { text: 'نعم، جلسة 90 دقيقة على Google Meet وأنت تعمل من لابتوبك', severity: 'safe' },
      { text: 'نعم، مكالمة قصيرة 15 دقيقة للشرح', severity: 'doubt' },
      { text: 'لا، نرسلولك فيديو تعليمي', severity: 'warning' },
      { text: 'لا، أرسلنا المعلومات ونديرو كلشي نحنا', severity: 'disaster' },
    ],
  },
  {
    question: 'وين تخزن وثائقي؟',
    options: [
      { text: 'ما نخزنو والو — كلشي يبقى عندك على لابتوبك', severity: 'safe' },
      { text: 'على Google Drive مشفر مع وصول محدود', severity: 'doubt' },
      { text: 'على سيرفراتنا الداخلية', severity: 'warning' },
      { text: 'ما نعرفش، الفريق يتعامل مع هاذ الأمور', severity: 'disaster' },
    ],
  },
  {
    question: 'كيفاش تتعامل مع تحقق Wise؟',
    options: [
      { text: 'نحضرك لكل سؤال قبل التأسيس ونعمل simulation', severity: 'safe' },
      { text: 'نرسلولك guide مكتوب للتحقق', severity: 'doubt' },
      { text: 'نديرو التحقق من عندنا بدون ما تشارك', severity: 'warning' },
      { text: 'Wise سهل، ما يحتاجش تحضير', severity: 'disaster' },
    ],
  },
  {
    question: 'واش يصرا كي حسابي يتقفل؟',
    options: [
      { text: 'ندخلو فوراً مجاناً: نحقق السبب، نجهزو الردود، نتابعو حتى يتحل', severity: 'safe' },
      { text: 'نساعدوك بتقديم نصائح عامة', severity: 'doubt' },
      { text: 'نقدرو نساعدو لكن بمقابل إضافي', severity: 'warning' },
      { text: 'هذا مش من مسؤوليتنا، تواصل مع البنك مباشرة', severity: 'disaster' },
    ],
  },
  {
    question: 'واش عندك عنوان حقيقي ولا افتراضي؟',
    options: [
      { text: 'عنوان حقيقي مع عقد إيجار + فيديو إثبات شهري', severity: 'safe' },
      { text: 'عنوان حقيقي لكن بدون إثبات إضافي', severity: 'doubt' },
      { text: 'عنوان افتراضي من خدمة Regus أو مشابهة', severity: 'warning' },
      { text: 'نستخدمو عنوان أي حد، المهم يكون أمريكي', severity: 'disaster' },
    ],
  },
  {
    question: 'واش عندك سياسة استرجاع؟',
    options: [
      { text: 'استرجاع كامل في 30 يوم إذا الخطأ منا، بعقد مكتوب', severity: 'safe' },
      { text: 'استرجاع جزئي حسب الحالة', severity: 'doubt' },
      { text: 'ما عندناش سياسة رسمية لكن نتفاهمو', severity: 'warning' },
      { text: 'لا استرجاع. الخدمة مدفوعة مسبقاً.', severity: 'disaster' },
    ],
  },
];

function getSeverityCount(answers: (Severity | null)[]): Record<Severity, number> {
  const counts: Record<Severity, number> = { safe: 0, doubt: 0, warning: 0, disaster: 0 };
  for (const answer of answers) {
    if (answer) {
      counts[answer]++;
    }
  }
  return counts;
}

function getVerdict(counts: Record<Severity, number>): { text: string; color: string } {
  const badCount = counts.disaster + counts.warning;
  const goodCount = counts.safe;

  if (goodCount >= 5) {
    return { text: 'هذا الوكيل يبدو موثوقاً', color: 'var(--color-ebook-green)' };
  }
  if (badCount >= 4) {
    return { text: 'ابتعد فوراً. هذا الوكيل خطير.', color: 'var(--color-ebook-red)' };
  }
  return { text: 'احذر — هناك علامات خطر', color: 'oklch(0.80 0.16 90)' };
}

export default function Chapter05_Questions({ onVisible }: Chapter05Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(Severity | null)[]>(Array.from({ length: 7 }, () => null));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = useCallback(
    (optionIndex: number) => {
      setSelectedOption(optionIndex);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = QUIZ_DATA[currentQuestion].options[optionIndex].severity;
      setAnswers(newAnswers);
    },
    [answers, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < 6) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(Array.from({ length: 7 }, () => null));
    setSelectedOption(null);
    setShowResult(false);
  }, []);

  const counts = getSeverityCount(answers);
  const verdict = getVerdict(counts);

  return (
    <ChapterWrapper
      id="chapter-05-questions"
      chapterIndex={5}
      titleAr="الـ٧ أسئلة حاسمة"
      onVisible={onVisible}
    >
      <div data-gated style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h2 className="ebook-heading-2" style={{ color: 'var(--color-ebook-gold)', textAlign: 'center' }}>
          الـ٧ أسئلة حاسمة
        </h2>
        <p className="ebook-body-text" style={{ textAlign: 'center', color: 'var(--color-ebook-text-secondary)' }}>
          اسأل وكيلك هذه الأسئلة. إجاباته تكشف إن كان يحميك أو يبيعك.
        </p>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ width: '100%', maxWidth: '40rem' }}
            >
              {/* Progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBlockEnd: '1.5rem' }}>
                <span
                  className="ebook-mono"
                  style={{ fontSize: '0.875rem', color: 'var(--color-ebook-gold)' }}
                >
                  {currentQuestion + 1} / 7
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '4px',
                    background: 'var(--color-ebook-border)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'var(--color-ebook-gold)',
                      borderRadius: '2px',
                    }}
                    animate={{ width: `${((currentQuestion + 1) / 7) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3
                className="ebook-heading-3"
                style={{ marginBlockEnd: '1.5rem', color: 'var(--color-ebook-text)' }}
              >
                {QUIZ_DATA[currentQuestion].question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {QUIZ_DATA[currentQuestion].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const style = SEVERITY_STYLES[option.severity];

                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        background: isSelected
                          ? 'oklch(0.19 0.015 250)'
                          : 'var(--color-ebook-surface)',
                        border: `2px solid ${isSelected ? style.borderColor : 'var(--color-ebook-border)'}`,
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        textAlign: 'start',
                        color: 'var(--color-ebook-text)',
                        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                        fontSize: '0.9375rem',
                        lineHeight: 1.6,
                        transition: 'border-color 0.2s ease',
                        width: '100%',
                      }}
                      aria-pressed={isSelected}
                    >
                      <span>{option.text}</span>
                      {isSelected && (
                        <span
                          className="ebook-mono"
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: style.labelColor,
                            whiteSpace: 'nowrap',
                            paddingInlineStart: '0.5rem',
                          }}
                        >
                          {style.label}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next button */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBlockStart: '1.5rem', display: 'flex', justifyContent: 'center' }}
                >
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ebook-magnetic-btn ebook-magnetic-btn-gold"
                    style={{ minWidth: '12rem' }}
                  >
                    {currentQuestion < 6 ? 'السؤال التالي' : 'اعرض النتيجة'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                width: '100%',
                maxWidth: '40rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              {/* Verdict */}
              <div
                style={{
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: `2px solid ${verdict.color}`,
                  background: 'var(--color-ebook-surface)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <h3
                  className="ebook-heading-2"
                  style={{ color: verdict.color, marginBlockEnd: '0.5rem' }}
                >
                  {verdict.text}
                </h3>
              </div>

              {/* Scorecard */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                {(Object.keys(SEVERITY_STYLES) as Severity[]).map((sev) => (
                  <div
                    key={sev}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      background: 'var(--color-ebook-surface)',
                      borderRadius: '0.75rem',
                      border: `1px solid ${SEVERITY_STYLES[sev].borderColor}`,
                    }}
                  >
                    <span
                      className="ebook-mono"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: SEVERITY_STYLES[sev].labelColor,
                      }}
                    >
                      {counts[sev]}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        color: SEVERITY_STYLES[sev].labelColor,
                        fontWeight: 600,
                      }}
                    >
                      {SEVERITY_STYLES[sev].label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Restart */}
              <button
                type="button"
                onClick={handleRestart}
                className="ebook-magnetic-btn ebook-magnetic-btn-outline"
              >
                أعد الاختبار
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterWrapper>
  );
}
