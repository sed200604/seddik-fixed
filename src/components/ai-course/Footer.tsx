'use client';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#13203a] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
        <div>
          <span className="text-[#f0ece2] font-black text-lg">
            GO <span className="text-[#c9a84c]">LLC</span>
          </span>
          <p className="text-[#5d6e85] text-xs mt-1">دورات تطبيقية في الذكاء الاصطناعي — الجزائر</p>
        </div>

        <div dir="ltr" className="font-jetbrains text-xs text-[#5d6e85] tracking-wider">
          go-llc.com · +213 554 21 87 43
        </div>

        <p className="text-[#39506f] text-xs">© 2026 GO LLC — جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}
