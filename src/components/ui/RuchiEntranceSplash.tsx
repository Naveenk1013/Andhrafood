'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

// Lazy load the WebGL2-powered RuchiOrb with an elegant glowing placeholder
const RuchiOrbLazy = dynamic(
  () => import('@/components/ui/RuchiOrb').then((mod) => mod.RuchiOrb),
  {
    ssr: false,
    loading: () => (
      <div className="w-[140px] h-[140px] rounded-full flex items-center justify-center relative select-none">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#F2B31B] via-[#D92D20] to-[#1F5A43] animate-pulse blur-md opacity-85" />
        <div className="absolute inset-0 rounded-full border border-[#F2B31B]/40 animate-spin [animation-duration:8s]" />
      </div>
    ),
  }
);

export interface RuchiEntranceSplashProps {
  locale?: string;
  forceShow?: boolean;
}

const STAGES = [
  {
    tag: 'SYSTEM BOOT · సిస్టమ్ ప్రారంభం',
    titleEn: 'Initializing Ruchi AI...',
    titleTe: 'రుచి AI సిద్ధమవుతోంది...',
    subEn: 'Waking up your living neural culinary assistant',
    subTe: 'మీ సజీవ వంటల సహాయకుడిని ప్రేరేపిస్తోంది',
    progress: 35,
  },
  {
    tag: 'HERITAGE KNOWLEDGE BASE · 26 జిల్లాలు',
    titleEn: 'Calibrating 26 District Archives...',
    titleTe: '26 జిల్లాల చారిత్రక రికార్డులను సమన్వయం చేస్తోంది...',
    subEn: 'Indexing oral traditions, fire techniques & heirloom millets',
    subTe: 'సంప్రదాయ పద్ధతులు, ఘాటు కొలతలు & చిట్కాలను శోధిస్తోంది',
    progress: 78,
  },
  {
    tag: 'NEURAL CHEF READY · సిద్ధం',
    titleEn: 'Your Personal Heritage Chef',
    titleTe: 'మీ వ్యక్తిగత ఆంధ్ర హెరిటేజ్ చెఫ్ సిద్ధం!',
    subEn: 'Authentic flavors, verified recipes & zero internet guesswork',
    subTe: 'స్వచ్ఛమైన ఆంధ్ర సంప్రదాయ రుచులు మీ సేవలో',
    progress: 100,
  },
];

export const RuchiEntranceSplash: React.FC<RuchiEntranceSplashProps> = ({
  locale = 'en',
  forceShow = false,
}) => {
  const isTe = locale === 'te';
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [currentStage, setCurrentStage] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(15);

  useEffect(() => {
    setMounted(true);

    try {
      const alreadySeen =
        localStorage.getItem('ruchi_intro_seen') ||
        sessionStorage.getItem('ruchi_intro_seen');
      if (alreadySeen && !forceShow) {
        setIsOpen(false);
        document.documentElement.classList.remove('ruchi-splash-active');
        return;
      }
      setIsOpen(true);
      // Ensure the zero-flicker locking class is active
      document.documentElement.classList.add('ruchi-splash-active');
    } catch {
      setIsOpen(false);
      document.documentElement.classList.remove('ruchi-splash-active');
    }
  }, [forceShow]);

  // Crisp, synchronized stage timeline progression (fast 1.7s total sequence)
  useEffect(() => {
    if (!isOpen) return;

    // Stage 0 -> Stage 1 at 550ms
    const t1 = setTimeout(() => {
      setCurrentStage(1);
      setSmoothProgress(75);
    }, 550);

    // Stage 1 -> Stage 2 at 1150ms
    const t2 = setTimeout(() => {
      setCurrentStage(2);
      setSmoothProgress(100);
    }, 1150);

    // Complete & dismiss at 1700ms
    const t3 = setTimeout(() => {
      handleDismiss();
    }, 1700);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('ruchi-splash-active');
    }
    try {
      localStorage.setItem('ruchi_intro_seen', 'true');
      sessionStorage.setItem('ruchi_intro_seen', 'true');
    } catch {
      // Ignore storage errors
    }
  };

  if (!mounted) {
    return null;
  }

  const stageData = STAGES[currentStage];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ruchi-splash-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(14px)',
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-10 bg-[#081C14] text-[#FAF9F5] select-none overflow-hidden"
          style={{ backgroundColor: '#081C14' }}
        >
          {/* Subtle Atmospheric Ambient Lighting */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full blur-[120px] opacity-25"
            style={{
              background:
                'radial-gradient(circle, rgba(242, 179, 27, 0.45) 0%, rgba(61, 143, 110, 0.35) 45%, rgba(217, 45, 32, 0.2) 70%, transparent 100%)',
            }}
          />

          {/* Top Bar: Brand tag & Skip button */}
          <div className="w-full max-w-4xl flex items-center justify-between relative z-10 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FDE8A8]/80">
              <Sparkles className="w-3.5 h-3.5 text-[#F2B31B] animate-pulse" />
              <span>Andhra Ruchulu · AI Companion</span>
            </div>

            <button
              onClick={handleDismiss}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#103226]/80 hover:bg-[#154231] border border-[#2A7356] hover:border-[#F2B31B]/60 text-[#E8E4D3] hover:text-[#FAF9F5] text-xs font-semibold shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              <span>{isTe ? 'విందుకు వెళ్లండి' : 'Skip to Feast'}</span>
              <ArrowRight className="w-3 h-3 text-[#F2B31B] group-hover:translate-x-1 transition-transform" />
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-[#081C14] text-[#F7C545] border border-[#2A7356] rounded font-mono">
                ESC
              </kbd>
            </button>
          </div>

          {/* Center Stage: Lazy-Loaded RuchiOrb & Phased Neural Loading */}
          <div className="flex flex-col items-center justify-center text-center space-y-7 relative z-10 max-w-xl mx-auto my-auto">
            {/* Ruchi Living Glass Orb (Lazy loaded via next/dynamic) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-full"
            >
              <RuchiOrbLazy
                size="lg"
                state={currentStage === 2 ? 'speaking' : 'thinking'}
                showHalo={true}
                className="shadow-[0_0_50px_rgba(242,179,27,0.35)] rounded-full"
              />
              {/* Soft decorative orbital glow ring */}
              <div className="absolute -inset-4 rounded-full border border-[#F2B31B]/20 animate-spin [animation-duration:12s] pointer-events-none" />
            </motion.div>

            {/* Stage Indicator Pill */}
            <motion.div
              key={stageData.tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D2E20] border border-[#F2B31B]/50 text-[#FDE8A8] text-[11px] font-bold tracking-wider uppercase shadow-md"
            >
              {currentStage === 2 ? (
                <ShieldCheck className="w-3.5 h-3.5 text-[#5EB08D]" />
              ) : (
                <Flame className="w-3.5 h-3.5 text-[#E5484D] animate-pulse" />
              )}
              <span>{stageData.tag}</span>
            </motion.div>

            {/* Dynamic Stage Text (Typewriter/Fade Transition) */}
            <div className="space-y-2 min-h-[72px]">
              <motion.h2
                key={`title-${currentStage}`}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="font-displayTe text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F5] via-[#FFFBF0] to-[#FDE8A8] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              >
                {isTe ? stageData.titleTe : stageData.titleEn}
              </motion.h2>

              <motion.p
                key={`sub-${currentStage}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="font-body text-xs sm:text-sm text-[#E8E4D3]/90 font-medium max-w-md mx-auto"
              >
                {isTe ? stageData.subTe : stageData.subEn}
              </motion.p>
            </div>

            {/* High-Tech Progress Capsule */}
            <div className="w-48 sm:w-64 space-y-2 pt-2">
              <div className="h-1.5 w-full bg-[#103226] rounded-full overflow-hidden border border-[#2A7356] shadow-inner relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F2B31B] via-[#F7C545] to-[#5EB08D] rounded-full"
                  initial={{ width: '15%' }}
                  animate={{ width: `${smoothProgress}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#FDE8A8]/60 font-mono">
                <span>RUCHI_v2.0</span>
                <span>{smoothProgress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="w-full max-w-4xl flex items-center justify-between relative z-10 text-[11px] text-[#E8E4D3]/60 pt-2 border-t border-[#103226]">
            <span>26 Districts · Verified Heritage Standards</span>
            <span>Grounded AI · Zero Internet Guesswork</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RuchiEntranceSplash;
