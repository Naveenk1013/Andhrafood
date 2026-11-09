"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
  Sparkles,
  X,
  Maximize2,
  Send,
  MessageCircle,
  Flame,
  UtensilsCrossed,
  ArrowRight,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Strands from "@/components/ui/Strands";
import { ruchiAudio } from "@/lib/sound-effects";
import { queryRuchiKnowledge } from "@/lib/json-db";

const ANDHRA_ORB_COLORS = [
  "#D92D20", // Guntur Crimson
  "#EA580C", // Chilli Amber
  "#F59E0B", // Turmeric Gold
  "#FFFBEB", // Warm Ghee Core
  "#10B981", // Fresh Coriander
  "#1F5A43", // Banana Leaf Green
  "#064E3B", // Deep Forest Green
];

interface Message {
  sender: "user" | "ruchi";
  text: string;
  source?: string;
  relatedDishSlug?: string;
  timestamp: string;
}

export function RuchiFloatingCTA() {
  const pathname = usePathname();
  const locale = useLocale();
  const isTe = locale === "te";

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadPulse, setHasUnreadPulse] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ruchi",
      text: isTe
        ? "నమస్కారం! నేను రుచి (Ruchi) — మీ ఆంధ్ర పాకశాస్త్ర ఏఐ గైడ్. 26 జిల్లాల అసలైన వంటకాలు, పద్ధతులు లేదా కారం సమతుల్యత గురించి నన్ను అడగండి!"
        : "Namaskaram! I am Ruchi — your Andhra Culinary AI Guide. Ask me anything about authentic heirloom recipes, rolu stone techniques, or spice scales across all 26 districts!",
      source: isTe ? "ఆంధ్ర రుచులు గ్రంథాలయం (26 జిల్లాలు)" : "Andhra Ruchulu Archives (26 Districts)",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Hide CTA completely if already on the dedicated /ruchi conversation page
  if (!mounted || pathname === "/ruchi" || pathname?.startsWith("/ruchi")) {
    return null;
  }

  const quickPrompts = isTe
    ? [
        { label: "గుంటూరు కారం రహస్యం", query: "గుంటూరు కారం ఘాటును సమతుల్యం చేసే సంప్రదాయ పద్ధతులు ఏమిటి?", icon: Flame },
        { label: "రాయలసీమ రాగి సంగటి", query: "రాయలసీమ రాగి సంగటితో నాటుకోడి పులుసు రహస్యం ఏమిటి?", icon: Compass },
        { label: "గోదావరి చేపల పులుసు", query: "గోదావరి పులస చేపల పులుసు మట్టి కుండలో ఎలా వండుతారు?", icon: UtensilsCrossed },
        { label: "ఎమ్మెల్యే పెసరట్టు టిప్", query: "ఎమ్మెల్యే పెసరట్టు అసలు పెసరపప్పుతో పులియబెట్టకుండా ఎలా చేస్తారు?", icon: Sparkles },
      ]
    : [
        { label: "Guntur Heat Secrets", query: "How is fiery Guntur chilli balanced with tamarind?", icon: Flame },
        { label: "Rayalaseema Ragi Sangati", query: "What makes Rayalaseema Ragi Sangati & Natu Kodi special?", icon: Compass },
        { label: "Godavari Fish Curry", query: "Why is Godavari Pulasa Pulusu simmered in clay pots?", icon: UtensilsCrossed },
        { label: "MLA Pesarattu Crisping", query: "How do you get MLA Pesarattu crispy with unfermented batter?", icon: Sparkles },
      ];

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setHasUnreadPulse(false);
    ruchiAudio.playPromptEnterChime();
    if (nextState) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  };

  const handleSend = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isThinking) return;

    setInputValue("");
    const userMsg: Message = {
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setThinkingStep(isTe ? "26 జిల్లాల గ్రంథాలను శోధిస్తోంది..." : "Searching 26 district archives...");

    try {
      const res = await fetch("/api/ruchi/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, locale }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: "ruchi",
            text: data.text,
            source: data.source,
            relatedDishSlug: data.relatedDish?.slug,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error("API call error");
      }
    } catch {
      // Local fallback from verified JSON database
      const fallback = queryRuchiKnowledge(query, locale);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ruchi",
          text: fallback.text,
          source: fallback.source,
          relatedDishSlug: fallback.relatedDish?.slug,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsThinking(false);
      setThinkingStep("");
    }
  };

  return (
    <>
      {/* 1. Quick-Chat Flyout Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 sm:bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[410px] h-[550px] max-h-[calc(100vh-110px)] flex flex-col bg-[#05130D]/95 text-[#FAF9F5] border-2 border-[#103226] shadow-[0_25px_60px_rgba(0,0,0,0.7)] rounded-3xl overflow-hidden backdrop-blur-2xl"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 pointer-events-none opacity-25 rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, #F2B31B 0%, #10B981 60%, transparent 80%)",
              }}
            />

            {/* Flyout Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-[#081C14]/90 border-b border-[#103226] relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Strands
                    colors={ANDHRA_ORB_COLORS}
                    count={3}
                    speed={isThinking ? 2.2 : 1.1}
                    energy={isThinking ? 1.0 : 0.7}
                    listening={isThinking}
                    glass={true}
                    glassSize={1.12}
                    glow={1.3}
                    interactive={false}
                    className="w-full h-full"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#081C14] animate-pulse z-20" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-displayTe font-bold text-sm sm:text-base text-[#FAF9F5] leading-tight">
                      {isTe ? "రుచి ఏఐ చెఫ్" : "Ruchi AI Chef"}
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#103226] text-[#F2B31B] border border-[#2A7356]">
                      26 Districts
                    </span>
                  </div>
                  <p className="text-[11px] text-[#E8E4D3]/70 font-medium">
                    {isTe ? "ఆంధ్ర పాకశాస్త్ర సలహాదారు" : "Authentic Andhra Culinary Guide"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Expand to Full Page */}
                <Link
                  href="/ruchi"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-[#E8E4D3]/70 hover:text-[#FAF9F5] hover:bg-[#103226] transition-all"
                  title={isTe ? "పూర్తి పేజీలో తెరవండి" : "Open Fullscreen Studio"}
                >
                  <Maximize2 className="w-4 h-4" />
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-[#E8E4D3]/70 hover:text-[#FAF9F5] hover:bg-[#103226] transition-all"
                  aria-label="Close Ruchi quick chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Flyout Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-[#103226] scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#103226] to-[#1F5A43] text-white border border-[#2A7356] rounded-br-none"
                        : "bg-[#092218] text-[#FAF9F5] border border-[#103226] rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line font-body">{msg.text}</p>

                    {/* Source Attribution Tag */}
                    {msg.source && (
                      <div className="mt-2 pt-2 border-t border-[#103226] text-[10px] text-[#FDE8A8]/80 flex items-center gap-1 font-mono">
                        <Sparkles className="w-3 h-3 text-[#F2B31B] flex-shrink-0" />
                        <span className="truncate">{msg.source}</span>
                      </div>
                    )}

                    {/* Related Dish Recipe Link */}
                    {msg.relatedDishSlug && (
                      <div className="mt-2">
                        <Link
                          href={`/dishes/${msg.relatedDishSlug}`}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#F2B31B] hover:underline"
                        >
                          <span>{isTe ? "రెసిపీని చూడండి" : "View Heirloom Recipe"}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#E8E4D3]/40 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Progressive Thinking Step */}
              {isThinking && (
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#092218] border border-[#103226] text-xs text-[#F2B31B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2B31B] animate-spin" />
                  <span className="animate-pulse font-medium">{thinkingStep}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Pills (if messages list is short) */}
            {messages.length <= 2 && !isThinking && (
              <div className="px-3 pb-2 pt-1 border-t border-[#103226]/60 bg-[#081C14]/60">
                <p className="text-[10px] text-[#FDE8A8]/70 font-semibold mb-1.5 uppercase tracking-wider">
                  {isTe ? "త్వరిత ప్రశ్నలు:" : "Quick Inspirations:"}
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {quickPrompts.map((p, i) => {
                    const IconComponent = p.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSend(p.query)}
                        className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#103226] hover:bg-[#1F5A43] border border-[#2A7356] text-[11px] text-[#FAF9F5] transition-colors"
                      >
                        <IconComponent className="w-3 h-3 text-[#F2B31B]" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-[#081C14] border-t border-[#103226] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => ruchiAudio.playPromptEnterChime()}
                placeholder={
                  isTe
                    ? "వంటకాలు, పద్ధతులు, కారం గురించి అడగండి..."
                    : "Ask about dishes, recipes, spices..."
                }
                disabled={isThinking}
                className="flex-1 bg-[#05130D] border border-[#103226] focus:border-[#F2B31B] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FAF9F5] placeholder-[#E8E4D3]/40 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#F2B31B] to-[#CF8800] text-[#081C14] font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md flex-shrink-0"
                aria-label="Send prompt"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Action CTA Button — Pure Self-Explanatory Strands Component */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 select-none">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full cursor-pointer flex items-center justify-center p-0 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-turmeric-400 group"
          aria-label={isOpen ? "Close Ruchi AI assistant" : "Ask Ruchi AI Chef"}
          title={isTe ? "రుచి ఏఐ ని అడగండి" : "Ask Ruchi AI Chef"}
        >
          {/* Subtle Ambient Outer Aura Halo */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-turmeric-500/35 via-guntur-500/25 to-leaf-500/35 blur-md group-hover:blur-lg opacity-80 group-hover:opacity-100 transition-all pointer-events-none" />

          {/* Golden Specular Glass Ring */}
          <div className="absolute inset-0 rounded-full border border-turmeric-400/50 group-hover:border-turmeric-400/90 shadow-[0_4px_25px_rgba(242,179,27,0.3)] group-hover:shadow-[0_6px_35px_rgba(242,179,27,0.5)] transition-all pointer-events-none" />

          {/* Living WebGL Strands Orb */}
          <div className="w-full h-full rounded-full overflow-hidden relative z-10 pointer-events-none">
            <Strands
              colors={ANDHRA_ORB_COLORS}
              count={3}
              speed={isOpen || isThinking ? 2.0 : 1.15}
              energy={isOpen || isThinking ? 0.95 : 0.72}
              listening={isOpen || isThinking}
              glass={true}
              glassSize={1.12}
              glow={1.4}
              amplitude={1.15}
              thickness={1.1}
              spread={1.1}
              interactive={true}
              clickPulse={true}
              className="w-full h-full"
            />
          </div>
        </motion.button>
      </div>
    </>
  );
}

export default RuchiFloatingCTA;

