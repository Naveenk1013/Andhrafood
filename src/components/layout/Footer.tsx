'use client';

import React from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import {
  Compass,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export interface FooterProps {
  locale?: string;
}

const XIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ locale = 'en' }) => {
  const pathname = usePathname();
  const isTe = locale === 'te';

  // Do not render footer on dedicated Ruchi AI conversational page
  if (pathname === '/ruchi' || pathname?.startsWith('/ruchi') || pathname?.endsWith('/ruchi')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#05130D] text-[#FAF9F5] border-t-2 border-[#103226] pt-12 pb-10 mt-16 select-none relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Top Cultural Heritage Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#103226]">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#103226] border border-[#2A7356] flex items-center justify-center text-[#F2B31B] shadow-inner font-bold text-base">
                ఆం
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#FAF9F5] leading-none">
                  Andhra Ruchulu
                </h3>
                <span className="text-[11px] text-[#FDE8A8]/80 font-displayTe tracking-wider block mt-1">
                  ఆంధ్ర రుచులు · Bringing All Andhra Dishes Together
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#E8E4D3]/80 max-w-xl leading-relaxed">
              {isTe
                ? 'ఆంధ్రప్రదేశ్ 26 జిల్లాల ఘుమఘుమలాడే సాంప్రదాయ వంటకాలను, ఆహార ప్రియుల కోసం ఒకే వేదికపైకి తెచ్చే సామూహిక ప్రయత్నం.'
                : 'A dedicated platform celebrating authentic heirloom flavours, indigenous culinary wisdom, and traditional food culture across all 26 districts of Andhra Pradesh.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2E20] border border-[#2A7356] text-xs text-[#FDE8A8] font-semibold shadow-sm">
              <Compass className="w-4 h-4 text-[#F2B31B]" />
              <span>{isTe ? '26 జిల్లాల వంటకాలు' : '26 Districts United'}</span>
            </div>
          </div>
        </div>

        {/* 2. Institutional Alliances & Tourism Collaboration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F2B31B]" />
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#FDE8A8]/80 font-bold">
              {isTe ? 'సంస్థాగత & పర్యాటక భాగస్వామ్యాలు' : 'Institutional & Tourism Alliances'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* APTDC Card */}
            <a
              href="https://tourism.ap.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#081C14]/90 hover:bg-[#0D281E] border border-[#103226] hover:border-[#2A7356] transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="h-12 px-3 bg-white/95 rounded-xl border border-white/20 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Image
                    src="/aptourism.png"
                    alt="Andhra Pradesh Tourism"
                    width={130}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-sm font-bold text-[#FAF9F5] group-hover:text-[#F2B31B] transition-colors truncate">
                      {isTe ? 'ఆంధ్రప్రదేశ్ పర్యాటక రంగం (APTDC)' : 'Andhra Pradesh Tourism (APTDC)'}
                    </h5>
                    <ExternalLink className="w-3 h-3 text-[#E8E4D3]/40 group-hover:text-[#F2B31B] flex-shrink-0 transition-colors" />
                  </div>
                  <p className="text-[11px] text-[#E8E4D3]/70 truncate mt-0.5">
                    {isTe
                      ? 'రాష్ట్ర పర్యాటక అభివృద్ధి సంస్థ · అధికారిక పోర్టల్'
                      : 'State Tourism Development Corporation · Official Portal'}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-1 rounded-md bg-[#103226] text-[#FDE8A8] border border-[#2A7356] flex-shrink-0">
                ap.gov.in ↗
              </span>
            </a>

            {/* IIHM Card */}
            <a
              href="https://www.iihm.ac.in/courses-offered"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#081C14]/90 hover:bg-[#0D281E] border border-[#103226] hover:border-[#2A7356] transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 bg-white/95 rounded-xl border border-white/20 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform p-1">
                  <Image
                    src="/iihmlogo.webp"
                    alt="IIHM Hotel School"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-sm font-bold text-[#FAF9F5] group-hover:text-[#F2B31B] transition-colors truncate">
                      {isTe ? 'ఐఐహెచ్‌ఎం హోటల్ స్కూల్ (IIHM)' : 'IIHM Hotel School'}
                    </h5>
                    <ExternalLink className="w-3 h-3 text-[#E8E4D3]/40 group-hover:text-[#F2B31B] flex-shrink-0 transition-colors" />
                  </div>
                  <p className="text-[11px] text-[#E8E4D3]/70 truncate mt-0.5">
                    {isTe
                      ? 'పాకశాస్త్ర & హాస్పిటాలిటీ కోర్సులు'
                      : 'Culinary & Hospitality Knowledge Partner'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#F2B31B] bg-[#103226] px-2.5 py-1 rounded-lg border border-[#2A7356] flex-shrink-0 group-hover:bg-[#1F5A43] transition-colors">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isTe ? 'కోర్సుల వివరాలు' : 'Courses Offered'}
                </span>
                <span>↗</span>
              </div>
            </a>
          </div>
        </div>

        {/* 3. Social Channels & Rights Bar */}
        <div className="pt-6 border-t border-[#103226] flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#E8E4D3]/70">
          {/* Copyright & Author Attribution */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Andhra Ruchulu · Bringing all Andhra dishes together.
            </p>
            <span className="hidden sm:inline text-[#2A7356]">|</span>
            <p className="text-[#F2B31B]/90 font-medium">
              Designed & developed by{' '}
              <a
                href="https://naveen-kr.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF9F5] underline underline-offset-4 decoration-[#F2B31B]/60 hover:text-[#F2B31B] hover:decoration-[#F2B31B] transition-colors font-semibold"
              >
                Naveen Kumar
              </a>
            </p>
          </div>

          {/* Social Links (X & YouTube) + Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-2 pr-2 border-r border-[#103226]">
              <a
                href="https://x.com/iihmhotelschool"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IIHM on X (Twitter)"
                title="Follow IIHM on X (Twitter)"
                className="w-8 h-8 rounded-full bg-[#103226] hover:bg-[#1F5A43] border border-[#2A7356] hover:border-[#F2B31B] text-[#FAF9F5] hover:text-[#F2B31B] flex items-center justify-center transition-all hover:scale-105"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com/iihmhotelschool"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IIHM on YouTube"
                title="Watch IIHM on YouTube"
                className="w-8 h-8 rounded-full bg-[#103226] hover:bg-[#1F5A43] border border-[#2A7356] hover:border-[#F2B31B] text-[#FAF9F5] hover:text-[#F2B31B] flex items-center justify-center transition-all hover:scale-105"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Legal Pages */}
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span>·</span>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <span>·</span>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
