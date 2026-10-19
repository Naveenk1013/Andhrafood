import Link from 'next/link';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#FAF9F5] text-[#141C18] p-4">
        <div
          style={{ backgroundColor: '#081C14' }}
          className="relative overflow-hidden rounded-[28px] bg-[#081C14] bg-gradient-to-br from-[#081C14] via-[#103226] to-[#081C14] border-2 border-[#1F5A43] p-8 sm:p-14 text-[#FAF9F5] shadow-2xl max-w-xl w-full text-center space-y-6"
        >
          {/* Top Golden Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B]/70 to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2E20] border border-[#F2B31B]/60 text-[#FDE8A8] text-xs font-bold tracking-wider uppercase">
            <span>Andhra Ruchulu · 404</span>
          </div>

          <div className="space-y-3">
            <span className="text-7xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F2B31B] via-[#FAF9F5] to-[#F7C545]">
              404
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAF9F5]">
              Recipe or Page Not Found
            </h1>
            <p className="text-sm text-[#E8E4D3] leading-relaxed max-w-md mx-auto">
              This page or regional archive does not exist. Explore the living culinary encyclopedia of Andhra Pradesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/en"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] font-black text-sm shadow-xl hover:brightness-110 transition-all"
            >
              Explore in English
            </Link>
            <Link
              href="/te"
              className="px-5 py-2.5 rounded-xl bg-[#154231] hover:bg-[#1A4F3B] border border-[#2A7356] text-[#FAF9F5] font-bold text-sm shadow-md transition-all"
            >
              తెలుగులో చూడండి
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
