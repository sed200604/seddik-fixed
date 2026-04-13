'use client';
import { Shield, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-light-gray pt-20 pb-8 overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link href="/" className="flex items-center gap-2 text-white font-tajawal font-bold text-2xl mb-4">
              <Shield className="w-8 h-8 text-gold" />
              <span>Go LLC</span>
            </Link>
            <p className="text-medium-gray mb-6">شريكك في تأسيس الشركات الأمريكية. نبسط لك الإجراءات المعقدة لتنطلق عالمياً.</p>
            <div className="flex gap-4">
              <a href="#" aria-label="فيسبوك" className="text-medium-gray hover:text-gold transition-colors p-2 -ml-2"><Facebook className="w-6 h-6" /></a>
              <a href="#" aria-label="انستغرام" className="text-medium-gray hover:text-gold transition-colors p-2"><Instagram className="w-6 h-6" /></a>
              <a href="#" aria-label="لينكد إن" className="text-medium-gray hover:text-gold transition-colors p-2"><Linkedin className="w-6 h-6" /></a>
              <a href="https://wa.me/213791789125" target="_blank" rel="noopener noreferrer" aria-label="واتساب" className="text-medium-gray hover:text-gold transition-colors p-2"><MessageCircle className="w-6 h-6" /></a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-white font-bold text-lg mb-6">خدماتنا</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-gold transition-colors">تأسيس LLC</Link></li>
              <li><Link href="/tax-filing" className="hover:text-gold transition-colors">الإقرار الضريبي</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">فتح الحسابات البنكية</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">استشارات</Link></li>
              <li><Link href="/#pricing" className="hover:text-gold transition-colors">الأسعار</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-white font-bold text-lg mb-6">الشركة</h4>
            <ul className="space-y-3">
              <li><Link href="/#about" className="hover:text-gold transition-colors">من نحن</Link></li>
              <li><Link href="/why-choose-us" className="hover:text-gold transition-colors">لماذا Go LLC</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition-colors">المدونة</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">أسئلة شائعة</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">شروط الخدمة</Link></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="text-white font-bold text-lg mb-6">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>Email: admin@go-llc.com</li>
              <li dir="ltr" className="text-right">WhatsApp: +213791789125</li>
              <li>ساعات العمل: الأحد-الخميس، 9 AM - 6 PM</li>
            </ul>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-medium-gray">© 2026 Go LLC. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 opacity-50 grayscale">
            <span className="font-bold">VISA</span>
            <span className="font-bold">Mastercard</span>
            <span className="font-bold">PayPal</span>
            <span className="font-bold">Stripe</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
