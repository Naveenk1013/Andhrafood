'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/routing';
import {
  ShieldCheck,
  Compass,
} from 'lucide-react';

export interface FooterProps {
  locale?: string;
}

export const Footer: React.FC<FooterProps> = ({ locale = 'en' }) => {
  const pathname = usePathname();
  const isTe = locale === 'te';

  // Do not render footer on dedicated Ruchi AI conversational page
  if (pathname === '/ruchi' || pathname?.startsWith('/ruchi') || pathname?.endsWith('/ruchi')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#05130D] text-[#FAF9F5] border-t-2 border-[#103226] pt-10 pb-10 mt-16 select-none relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Cultural Heritage Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#103226]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#103226] border border-[#2A7356] flex items-center justify-center text-[#F2B31B] shadow-inner font-bold text-sm">
                ఆం
              </div>
              <div>
                <h3 className="font-displayTe text-xl font-extrabold text-[#FAF9F5] leading-none">
                  {isTe ? 'ఆంధ్ర రుచులు' : 'Andhra Ruchulu'}
                </h3>
                <span className="text-[10px] text-[#FDE8A8]/70 font-mono tracking-wider uppercase">
                  {isTe ? 'ఆంధ్ర వంటకాల సమగ్ర వేదిక' : 'Bringing All Andhra Dishes Together'}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#E8E4D3]/80 max-w-md leading-relaxed">
              {isTe
                ? 'ఆంధ్రప్రదేశ్ 26 జిల్లాల ఘుమఘుమలాడే సాంప్రదాయ వంటకాలను, ఆహార ప్రియుల కోసం ఒకే వేదికపైకి తెచ్చే సామూహిక ప్రయత్నం.'
                : 'A dedicated platform made to bring together all the authentic dishes, heirloom flavours, and culinary traditions across all 26 districts of Andhra Pradesh.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D2E20] border border-[#2A7356] text-xs text-[#FDE8A8] font-semibold">
              <Compass className="w-4 h-4 text-[#F2B31B]" />
              <span>{isTe ? '26 జిల్లాల వంటకాలు' : '26 Districts United'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#103226] text-[11px] text-[#E8E4D3]/60">
          <p>
            © {new Date().getFullYear()} Andhra Ruchulu · Made to bring all the dishes of Andhra together.
          </p>
          <div className="flex items-center gap-4">
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
    </footer>
  );
};
