"use client";

import React, { useState, useRef, useEffect } from "react";
import { RuchiOrb, RuchiGeneratingLoader } from "@/components/ui/RuchiOrb";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import {
  Sparkles,
  Flame,
  RotateCcw,
  Compass,
  UtensilsCrossed,
} from "lucide-react";
import { useParams } from "next/navigation";
import { queryRuchiKnowledge } from "@/lib/json-db";
import { PageTransition } from "@/components/ui/FluidMotion";
import { motion } from "framer-motion";
import { RuchiMarkdown } from "@/components/ui/RuchiMarkdown";
import { CulinaryWatermark, FloatingParticles } from "@/components/ui/SectionVisuals";

interface Message {
  sender: "user" | "ruchi";
  text: string;
  source?: string;
  timestamp?: string;
  isGemini?: boolean;
  isStreaming?: boolean;
}

const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function RuchiAIPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTe = locale === "te";

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ruchi",
      text: isTe
        ? "నమస్కారం! నేను రుచి (Ruchi) — మీ ప్రామాణిక ఆంధ్ర పాకశాస్త్ర సలహాదారుని. 26 జిల్లాల అసలైన వంటకాలు, పద్ధతులు, కారం కొలతలతో మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను. మీ సందేహాన్ని అడగండి!"
        : "Namaskaram! I am Ruchi, your verified Andhra Culinary Intelligence. Grounded in 26 districts of authentic culinary history, traditional ratios, and strict heat balances. What would you like to explore or cook today?",
      source: isTe ? "ఆంధ్ర రుచులు అధికారిక గ్రంథాలయం (26 జిల్లాలు)" : "Andhra Ruchulu Heritage Archives (26 Districts)",
      timestamp: "Just now",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [generatingStep, setGeneratingStep] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const curatedTopics = isTe
    ? [
        {
          title: "గుంటూరు కారం & ఘాటు సమతుల్యం",
          subtitle: "చింతపండు పులుపుతో కారం సమతుల్యత రహస్యాలు",
          query: "గుంటూరు కారం ఘాటును సమతుల్యం చేసే సంప్రదాయ పద్ధతులు ఏమిటి?",
          tag: "కారం కొలత",
          icon: Flame,
          color: "text-guntur-600 border-guntur-500/30 bg-guntur-600/5",
        },
        {
          title: "గోదావరి చేపల పులుసు & మట్టి కుండ",
          subtitle: "మట్టి పాత్రలలోనే ఎందుకు వండాలి?",
          query: "గోదావరి పులస చేపల పులుసు వర్షాకాలంలోనే ఎందుకు ప్రసిద్ధి మరియు మట్టి కుండల ప్రాముఖ్యత ఏమిటి?",
          tag: "మట్టి పాత్రలు",
          icon: UtensilsCrossed,
          color: "text-turmeric-700 border-turmeric-500/30 bg-turmeric-500/5",
        },
        {
          title: "రాయలసీమ రాగి సంగటి & నాటుకోడి",
          subtitle: "కరువు నేలల బలవర్ధక సంప్రదాయ భోజనం",
          query: "రాయలసీమ రాగి సంగటితో నాటుకోడి పులుసు రహస్యం ఏమిటి?",
          tag: "రాయలసీమ",
          icon: Compass,
          color: "text-leaf-800 border-leaf-600/30 bg-leaf-700/5",
        },
        {
          title: "ఎమ్మెల్యే పెసరట్టు అసలు పద్ధతి",
          subtitle: "పులియబెట్టకుండా పచ్చి పెసలతో కరకరలాడే విధానం",
          query: "ఎమ్మెల్యే పెసరట్టు అసలు పెసరపప్పుతో పులియబెట్టకుండా ఎలా చేస్తారు?",
          tag: "టిఫిన్లు",
          icon: Sparkles,
          color: "text-amber-700 border-amber-500/30 bg-amber-500/5",
        },
      ]
    : [
        {
          title: "Guntur Chilli & Heat Balance",
          subtitle: "Balancing fiery pungency with tart Gongura and country oils",
          query: "What is the secret balance of Gongura sourness with Guntur chilli heat?",
          tag: "Spice Ratio",
          icon: Flame,
          color: "text-guntur-600 border-guntur-500/30 bg-guntur-600/5",
        },
        {
          title: "Godavari Pulasa & Earthen Pots",
          subtitle: "Why earthen pot slow-cooking changes fish gelatin chemistry",
          query: "Why is Godavari Pulasa fish prepared strictly in earthen pots?",
          tag: "Traditional Vessels",
          icon: UtensilsCrossed,
          color: "text-turmeric-700 border-turmeric-500/30 bg-turmeric-500/5",
        },
        {
          title: "Rayalaseema Ragi Sangati & Kodi",
          subtitle: "The stamina food of the Deccan plateau",
          query: "What makes Rayalaseema Ragi Sangati & Natu Kodi Pulusu so legendary?",
          tag: "Rayalaseema",
          icon: Compass,
          color: "text-leaf-800 border-leaf-600/30 bg-leaf-700/5",
        },
        {
          title: "MLA Pesarattu Crisping Secret",
          subtitle: "Why unfermented whole green gram stays crisp with Upma",
          query: "How do you get MLA Pesarattu crispy with raw unfermented batter?",
          tag: "Breakfast Lore",
          icon: Sparkles,
          color: "text-amber-700 border-amber-500/30 bg-amber-500/5",
        },
      ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    setGeneratingStep(
      isTe
        ? "26 జిల్లాల పాకశాస్త్ర గ్రంథాలు & ప్రామాణిక నిష్పత్తులను శోధిస్తోంది..."
        : "Scanning 26 Andhra district culinary records & ancient ratios..."
    );

    // Progressive status updates
    const stepTimer = setTimeout(() => {
      setGeneratingStep(
        isTe
          ? "జెమిని ఏఐ పాకశాస్త్ర విశ్లేషణ & సాంప్రదాయ పద్ధతులను సరిచూస్తోంది..."
          : "Gemini AI validating rolu stone techniques, regional spice scales & vessels..."
      );
    }, 600);

    try {
      const res = await fetch("/api/ruchi/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend, locale }),
      });

      clearTimeout(stepTimer);

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: "ruchi",
            text: data.text,
            source: data.source,
            isGemini: data.isGemini,
            isStreaming: true,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error("API call failed with status: " + res.status);
      }
    } catch (err) {
      console.warn("Falling back to local knowledge base:", err);
      clearTimeout(stepTimer);
      const local = queryRuchiKnowledge(textToSend, locale);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ruchi",
          text: local.text,
          source: local.source,
          isGemini: false,
          isStreaming: true,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsThinking(false);
      setGeneratingStep("");
    }
  };

  const handleSendRef = useRef(handleSend);
  handleSendRef.current = handleSend;

  // Auto-send prompt from URL parameter (e.g. from Pantry mode)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const promptParam = urlParams.get("prompt");
      if (promptParam && promptParam.trim()) {
        handleSendRef.current(promptParam.trim());
        // Clean URL to prevent re-triggering on page refresh
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, "", cleanUrl);
      }
    }
  }, []);

  const handleStreamComplete = (index: number) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isStreaming: false } : msg))
    );
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: "ruchi",
        text: isTe
          ? "నమస్కారం! నేను రుచి (Ruchi) — మీ ప్రామాణిక ఆంధ్ర పాకశాస్త్ర సలహాదారుని. 26 జిల్లాల అసలైన వంటకాలు, పద్ధతులు, కారం కొలతలతో మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను. మీ సందేహాన్ని అడగండి!"
          : "Namaskaram! I am Ruchi, your verified Andhra Culinary Intelligence. Grounded in 26 districts of authentic culinary history, traditional ratios, and strict heat balances. What would you like to explore or cook today?",
        source: isTe ? "ఆంధ్ర రుచులు అధికారిక గ్రంథాలయం (26 జిల్లాలు)" : "Andhra Ruchulu Heritage Archives (26 Districts)",
        timestamp: "Just now",
        isStreaming: false,
      },
    ]);
  };

  const handleShareWhatsApp = (text: string, source?: string) => {
    const header = isTe
      ? "🌟 *ఆంధ్ర రుచులు — రుచి ఏఐ పాకశాస్త్ర సమాచారం:*\n\n"
      : "🌟 *Andhra Ruchulu — Ruchi AI Culinary Insight:*\n\n";

    const citation = source ? `\n\n🍲 _మూలం / Source: ${source}_\n` : "\n\n";
    const footer = `\n👉 ${
      isTe
        ? "మరిన్ని సాంప్రదాయ ఆంధ్ర వంటకాల కోసం చూడండి:"
        : "Explore authentic Andhra recipes:"
    } ${window.location.origin}/${locale}/ruchi`;

    const fullMessage = `${header}${text}${citation}${footer}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <PageTransition className="relative flex flex-col min-h-[calc(100vh-4rem)] bg-ambient-light-drift text-ink-900 overflow-hidden">
      {/* Ambient Visual Backdrops & Authentic Watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-turmeric-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[30rem] h-[30rem] bg-leaf-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-chilli-500/5 rounded-full blur-3xl" />
        
        {/* Authentic Andhra Heritage Watermarks */}
        <CulinaryWatermark
          motif="kolam"
          className="w-96 h-96 top-4 left-1/2 -translate-x-1/2 opacity-[0.035] text-leaf-900"
        />
        <CulinaryWatermark
          motif="star-anise"
          className="w-72 h-72 -top-12 -right-12 opacity-[0.05] text-turmeric-700"
        />
        <CulinaryWatermark
          motif="curry-leaf"
          className="w-64 h-64 bottom-24 -left-12 opacity-[0.05] text-leaf-700 -rotate-12"
        />
        <FloatingParticles count={6} />
      </div>

      {/* Main Conversational Workspace */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 pt-6 pb-4 flex flex-col justify-between">
        {/* Messages Stream */}
        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Active Chat Header Bar with New Chat action */}
          {messages.length > 1 && (
            <div className="flex items-center justify-between pb-3 border-b border-leaf-200/60 mb-2">
              <div className="flex items-center gap-2">
                <RuchiOrb size="xs" state={isThinking ? "generating" : "idle"} />
                <span className="font-displayTe font-bold text-sm text-leaf-950 dark:text-[#FAF9F5]">
                  {isTe ? "రుచి ఏఐ · పాకశాస్త్ర వేదిక" : "Ruchi AI · Culinary Intelligence"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearChat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white hover:bg-leaf-50 dark:bg-leaf-950 dark:hover:bg-leaf-900 text-ink-700 dark:text-rice-100 border border-leaf-200 dark:border-leaf-700 shadow-sm transition-colors active:scale-95"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5 text-turmeric-700" />
                <span>{isTe ? "కొత్త చర్చ" : "New Chat"}</span>
              </button>
            </div>
          )}

          {/* Welcome Intro (shown when starting) */}
          {messages.length === 1 && (
            <div className="text-center py-6 sm:py-10 space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-turmeric-500/10 border border-turmeric-500/25 shadow-inner animate-gentle-float">
                <RuchiOrb size="sm" state="idle" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h1 className="font-displayTe text-2xl sm:text-3xl font-extrabold text-leaf-950 dark:text-[#FAF9F5] leading-tight">
                  {isTe ? "రుచి ఏఐ · పాకశాస్త్ర వేదిక" : "Ruchi AI · Culinary Intelligence"}
                </h1>
                <p className="font-body text-xs sm:text-sm text-ink-600 dark:text-rice-200/80 leading-relaxed">
                  {isTe
                    ? "26 జిల్లాల చారిత్రక రికార్డులు, సంప్రదాయ కొలతలు మరియు రోలు రుబ్బుడు పద్ధతులతో కూడిన విశ్వసనీయ సమాచారం."
                    : "Grounded in historical recipes, exact Guntur heat scales, rolu stone grinding traditions, and 26 district archives."}
                </p>
              </div>

              {/* 4 Curated Category Tiles */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-left">
                {curatedTopics.map((topic, i) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(topic.query)}
                      className={`p-4 rounded-card border transition-all text-left group hover:shadow-lg hover:scale-[1.01] ${topic.color} bg-white/80 dark:bg-leaf-950/80 backdrop-blur-xl border-white/80 dark:border-leaf-800 hover:border-leaf-300 dark:hover:border-leaf-600 shadow-[0_8px_25px_rgba(31,90,67,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] card-fluid-hover active:scale-[0.985]`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-chip bg-leaf-100/90 dark:bg-leaf-800 text-leaf-900 dark:text-turmeric-400 border border-leaf-200/60 dark:border-leaf-700 shadow-xs">
                          {topic.tag}
                        </span>
                        <Icon className="w-4 h-4 opacity-75 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="font-displayTe text-sm font-bold text-ink-900 dark:text-rice-50 leading-snug group-hover:text-leaf-900 dark:group-hover:text-turmeric-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="font-body text-xs text-ink-600 dark:text-rice-50/70 mt-1 line-clamp-2">
                        {topic.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conversation History */}
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`flex gap-3 sm:gap-4 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ruchi" && (
                <div className="flex-shrink-0 mt-0.5" title="Ruchi AI Persona">
                  <RuchiOrb size="sm" state="idle" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed transition-all ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-leaf-100/95 to-leaf-50/95 dark:from-[#154231] dark:to-[#0D2E20] text-leaf-950 dark:text-[#E8F5ED] rounded-tr-none shadow-sm border border-leaf-300/80 dark:border-leaf-700"
                    : "bg-white/90 dark:bg-[#081C14]/90 backdrop-blur-xl text-ink-900 dark:text-[#FAF9F5] border border-white/90 dark:border-leaf-800 rounded-tl-none shadow-[0_10px_35px_rgba(31,90,67,0.07)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                }`}
              >
                {m.sender === "ruchi" && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-leaf-100 dark:border-leaf-800/80 text-[11px] font-semibold text-leaf-800 dark:text-turmeric-400">
                    <span className="font-displayTe font-bold text-leaf-950 dark:text-turmeric-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" />
                      {isTe ? "రుచి వివరణ" : "Ruchi AI Culinary Insight"}
                    </span>
                    <div className="flex items-center gap-2">
                      {m.timestamp && <span className="text-ink-400 dark:text-rice-50/50 font-normal">{m.timestamp}</span>}
                      <button
                        type="button"
                        onClick={() => handleShareWhatsApp(m.text, m.source)}
                        className="p-1 rounded-md text-[#25D366] hover:bg-[#25D366]/10 transition-colors flex items-center justify-center cursor-pointer"
                        title={isTe ? "వాట్సాప్‌లో షేర్ చేయండి" : "Share on WhatsApp"}
                        aria-label="Share on WhatsApp"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {m.sender === "user" ? (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-[#0A2E20] dark:text-[#E8F5ED] font-medium">
                    {m.text}
                  </p>
                ) : (
                  <RuchiMarkdown
                    content={m.text}
                    isStreaming={m.isStreaming}
                    onStreamComplete={() => handleStreamComplete(idx)}
                    onTick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                  />
                )}

                {m.sender === "user" && m.timestamp && (
                  <div className="flex justify-end pt-1 -mb-1 text-[10px] text-[#185339]/70 dark:text-[#88C6A3]/70 font-normal select-none">
                    {m.timestamp}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Living Persona Generating / Thinking Loader */}
          {isThinking && (
            <div className="pt-2 animate-fade-in">
              <RuchiGeneratingLoader
                locale={locale}
                stepText={generatingStep}
                variant="bubble"
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Docked AI Prompt Box Section */}
        <div className="pt-4 sticky bottom-4 z-20">
          {/* Quick Suggested Chips (shown if user has already started chatting) */}
          {messages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-leaf-800 dark:text-turmeric-400 uppercase tracking-wider flex-shrink-0">
                {isTe ? "సూచనలు:" : "Quick Queries:"}
              </span>
              {curatedTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(topic.query)}
                  className="bg-white/95 dark:bg-leaf-900/80 hover:bg-leaf-800 dark:hover:bg-turmeric-500 hover:text-white dark:hover:text-[#081C14] text-ink-700 dark:text-rice-100 px-3 py-1 rounded-full border border-leaf-200/90 dark:border-leaf-700 whitespace-nowrap transition-all shadow-sm font-medium flex-shrink-0 text-[11px]"
                >
                  {topic.title}
                </button>
              ))}
            </div>
          )}

          {/* The AI Prompt Box with Embedded Micro-Orb Component & Futuristic Sound */}
          <div className="rounded-3xl shadow-[0_12px_45px_rgba(31,90,67,0.08)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.6)] bg-white/80 dark:bg-[#081C14]/85 backdrop-blur-xl border border-white/90 dark:border-[#1F5A43] p-1">
            <PromptInputBox
              placeholder={
                isTe
                  ? "ఆంధ్రా వంటల గురించి ఏదైనా అడగండి (ఉదా: పెసరట్టు, నాటుకోడి, గుంటూరు కారం కొలతలు)..."
                  : "Ask Ruchi about any Andhra dish, technique, spice ratio or district tradition..."
              }
              isLoading={isThinking}
              locale={locale}
              enableSound={true}
              onSend={(message) => handleSend(message)}
            />
          </div>

          <p className="text-center text-[10px] text-gray-500 dark:text-rice-200/60 mt-2 font-medium">
            {isTe
              ? "రుచి కేవలం చారిత్రక, ధృవీకరించబడిన ఆంధ్రా పాకశాస్త్ర సూత్రాలపై మాత్రమే ఆధారపడి సమాధానాలు ఇస్తుంది."
              : "Ruchi is grounded strictly in historical recipes, traditional heat scales, and verified district archives."}
          </p>
        </div>
      </main>
    </PageTransition>
  );
}
