'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Camera, ShieldCheck, X, AlertCircle, Lock } from 'lucide-react';

export interface PermissionModalProps {
  isOpen: boolean;
  type: 'microphone' | 'camera' | 'location';
  onAllow: () => void;
  onDeny: () => void;
  locale?: string;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
  type,
  onAllow,
  onDeny,
  locale = 'en',
}) => {
  const isTe = locale === 'te';

  const details = {
    microphone: {
      icon: <Mic className="w-6 h-6 text-[#F2B31B]" />,
      titleEn: 'Microphone Access for Voice Query',
      titleTe: 'వాయిస్ శోధనకు మైక్రోఫోన్ అనుమతి',
      subEn: 'Ruchi AI listens to your recipe and culinary questions in Telugu or English.',
      subTe: 'రుచి AI మీ తెలుగు లేదా ఆంగ్ల వంటకాల ప్రశ్నలను వినడానికి మైక్రోఫోన్ అవసరం.',
      privacyEn: 'Audio is processed ephemerally in real-time. We never store, record, or distribute your voice recordings.',
      privacyTe: 'మీ వాయిస్ డేటా కేవలం తాత్కాలికంగా మాత్రమే ప్రాసెస్ అవుతుంది. ఎక్కడా భద్రపరచబడదు లేదా విక్రయించబడదు.',
    },
    camera: {
      icon: <Camera className="w-6 h-6 text-[#F2B31B]" />,
      titleEn: 'Camera & Image Upload Permission',
      titleTe: 'చిత్రాల విశ్లేషణకు అనుమతి',
      subEn: 'Upload or capture ingredient photos for instant traditional recipe recognition.',
      subTe: 'మీ వద్ద ఉన్న దినుసులు లేదా వంటకం ఫోటోను అప్‌లోడ్ చేసి సంప్రదాయ విధానాన్ని కనుగొనండి.',
      privacyEn: 'Photographs are analyzed strictly in memory to detect ingredients and are deleted after analysis.',
      privacyTe: 'ఫోటోలు కేవలం దినుసులను గుర్తించడానికి మాత్రమే ఉపయోగించబడతాయి, తరువాత తొలగించబడతాయి.',
    },
    location: {
      icon: <ShieldCheck className="w-6 h-6 text-[#5EB08D]" />,
      titleEn: 'Geographic Location Discovery',
      titleTe: 'సమీప జిల్లాల వంటకాల శోధన',
      subEn: 'Discover verified culinary specialties from your nearest Andhra Pradesh district.',
      subTe: 'మీరు ఉన్న ప్రాంతానికి సమీపంలోని 26 జిల్లాల ప్రత్యేక వంటకాలను అన్వేషించండి.',
      privacyEn: 'Location coordinates are used solely to sort regional dishes and are never tracked remotely.',
      privacyTe: 'లొకేషన్ కేవలం సమీప వంటకాలను చూపించడానికి మాత్రమే ఉపయోగపడుతుంది.',
    },
  }[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onDeny}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-2xl bg-[#081C14] border-2 border-[#1F5A43] shadow-[0_24px_60px_rgba(0,0,0,0.8)] text-[#FAF9F5] p-6 space-y-5 select-none"
          >
            {/* Close Button */}
            <button
              onClick={onDeny}
              className="absolute top-4 right-4 text-[#E8E4D3]/60 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Icon */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#103226] border border-[#2A7356] flex items-center justify-center flex-shrink-0 shadow-inner">
                {details.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FDE8A8]/70 block">
                  AP Tourism · Data Governance
                </span>
                <h3 className="font-displayTe text-lg font-bold text-[#FAF9F5] leading-snug">
                  {isTe ? details.titleTe : details.titleEn}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#E8E4D3]/90 leading-relaxed">
              {isTe ? details.subTe : details.subEn}
            </p>

            {/* Privacy Box */}
            <div className="p-3.5 rounded-xl bg-[#0D2E20] border border-[#2A7356] flex items-start gap-2.5 text-xs text-[#E8E4D3]/85">
              <Lock className="w-4 h-4 text-[#5EB08D] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {isTe ? details.privacyTe : details.privacyEn}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onAllow}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#F2B31B] hover:bg-[#F7C545] text-[#081C14] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isTe ? 'అనుమతించు (Allow Access)' : 'Grant Permission'}</span>
              </button>
              <button
                type="button"
                onClick={onDeny}
                className="py-2.5 px-4 rounded-xl bg-[#103226] hover:bg-[#154231] border border-[#2A7356] text-[#E8E4D3] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              >
                {isTe ? 'రద్దు చేయి' : 'Cancel'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
