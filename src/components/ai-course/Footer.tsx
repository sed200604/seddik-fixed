'use client';

import { motion } from 'motion/react';
import { VIEWPORT } from './motion';
import { WhatsAppIcon } from './ui';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6 }}
      className="w-full bg-ac-navy-deep border-t border-white/[0.06] py-12 px-5"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
        <div>
          <span className="font-tajawal font-black text-xl tracking-tight text-white">
            GO <span className="text-ac-gold">LLC</span>
          </span>
          <p className="text-ac-muted/70 text-sm mt-1.5">
            تعلّم تبني مواقع بالذكاء الاصطناعي وابدا تربح — الجزائر
          </p>
        </div>

        {/* social placeholders — TODO(placeholder): swap for real links */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="واتساب"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-white/10 transition-colors hover:bg-ac-gold hover:text-ac-navy-deep"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="إنستغرام"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-white/10 transition-colors hover:bg-ac-gold hover:text-ac-navy-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="فيسبوك"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-white/10 transition-colors hover:bg-ac-gold hover:text-ac-navy-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M13.5 9H16l.5-3h-3V4.5c0-.9.3-1.5 1.6-1.5H16.5V.2C16.2.13 15.1 0 13.9 0 11.3 0 9.5 1.6 9.5 4.5V6H7v3h2.5v9h4V9z" />
            </svg>
          </a>
        </div>

        <p className="text-ac-muted/50 text-xs">© 2026 GO LLC — جميع الحقوق محفوظة</p>
      </div>
    </motion.footer>
  );
}
