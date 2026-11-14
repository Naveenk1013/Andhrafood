import Link from 'next/link';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex items-center justify-center bg-[#081C14] text-[#FAF9F5] p-4 selection:bg-[#F2B31B] selection:text-[#081C14]">
        {/* Background Ambient Glows */}
        <div
          className="fixed inset-0 pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(242, 179, 27, 0.2) 0%, rgba(61, 143, 110, 0.15) 50%, transparent 80%)',
          }}
        />

        <div className="relative overflow-hidden rounded-[32px] bg-[#081C14]/95 backdrop-blur-2xl border border-[#1F5A43]/70 p-8 sm:p-14 text-[#FAF9F5] shadow-[0_25px_80px_rgba(0,0,0,0.6)] max-w-xl w-full text-center space-y-6">
          {/* Top Golden Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B31B] to-transparent pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2E20] border border-[#F2B31B]/50 text-[#FDE8A8] text-xs font-bold tracking-wider uppercase shadow-inner">
            <span>Andhra Ruchulu · 404</span>
          </div>

          {/* Steaming Handi Pot Vector Illustration */}
          <div className="relative w-32 h-24 mx-auto flex items-center justify-center">
            <svg
              viewBox="0 0 160 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_6px_16px_rgba(242,179,27,0.35)]"
              aria-hidden="true"
            >
              <path
                d="M62 30 C58 20, 68 12, 62 4"
                stroke="#FDE8A8"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M80 32 C74 18, 86 10, 80 2"
                stroke="#F2B31B"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M98 30 C102 20, 92 12, 98 4"
                stroke="#FDE8A8"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              <ellipse cx="80" cy="42" rx="46" ry="7" fill="#CF8800" stroke="#F7C545" strokeWidth="2" />
              <ellipse cx="80" cy="39" rx="32" ry="4" fill="#9C6300" />
              <circle cx="80" cy="35" r="4" fill="#F2B31B" />
              <path
                d="M34 42 C24 64, 22 92, 48 108 C60 115, 100 115, 112 108 C138 92, 136 64, 126 42 Z"
                fill="#7A4B36"
                stroke="#F7C545"
                strokeWidth="2"
              />
              <path
                d="M31 66 C48 74, 112 74, 129 66"
                stroke="#F2B31B"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />
              <ellipse cx="80" cy="108" rx="30" ry="6" fill="#4A2B1E" stroke="#F2B31B" strokeWidth="1.5" />
              <path d="M28 50 C16 52, 16 64, 29 66" stroke="#F2B31B" strokeWidth="3" strokeLinecap="round" />
              <path d="M132 50 C144 52, 144 64, 131 66" stroke="#F2B31B" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-2">
            <span className="text-7xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F2B31B] via-[#FFE28A] to-[#CF8800]">
              404
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAF9F5]">
              Recipe or Page Not Found
            </h1>
            <p className="text-sm text-[#E8E4D3]/90 leading-relaxed max-w-md mx-auto">
              ఈ గిన్నె ఖాళీగా ఉంది · This page or regional recipe is not in our archives. Explore the living culinary encyclopedia of Andhra Pradesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/en"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] font-black text-sm shadow-[0_4px_20px_rgba(242,179,27,0.3)] hover:brightness-110 active:scale-95 transition-all"
            >
              Explore in English
            </Link>
            <Link
              href="/te"
              className="px-6 py-3 rounded-xl bg-[#154231] hover:bg-[#1A4F3B] border border-[#2A7356] text-[#FAF9F5] font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              తెలుగులో చూడండి
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
