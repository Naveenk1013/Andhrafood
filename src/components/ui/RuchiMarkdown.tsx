"use client";

import React, { useState, useEffect, useRef } from "react";

interface RuchiMarkdownProps {
  content: string;
  isStreaming?: boolean;
  onStreamComplete?: () => void;
  className?: string;
  onTick?: () => void;
}

/**
 * Parses inline formatting like **bold**, *italic*, and `code`
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex to match **bold**, *italic*, `code`
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong
          key={`${match.index}-b`}
          className="font-bold text-leaf-950 dark:text-turmeric-300 tracking-tight"
        >
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <em key={`${match.index}-i`} className="italic text-ink-800 dark:text-rice-100">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={`${match.index}-c`}
          className="px-1.5 py-0.5 rounded bg-leaf-100/80 dark:bg-leaf-800 text-leaf-900 dark:text-turmeric-300 text-xs font-mono"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Renders structured markdown blocks (headers, lists, blockquotes, paragraphs)
 */
function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  // Split content by lines
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: React.ReactNode[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="my-2.5 space-y-1.5 pl-1.5 list-none"
        >
          {currentList.items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-turmeric-600 dark:bg-turmeric-400 mt-2 flex-shrink-0" />
              <div className="flex-1">{it}</div>
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="my-2.5 space-y-2 pl-0.5 list-none"
        >
          {currentList.items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-leaf-100 dark:bg-leaf-800/80 text-leaf-900 dark:text-turmeric-300 text-[11px] font-bold mt-0.5 flex-shrink-0 border border-leaf-200/80 dark:border-leaf-700/60 shadow-2xs">
                {idx + 1}
              </span>
              <div className="flex-1">{it}</div>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h4
          key={`h4-${i}`}
          className="font-displayTe font-bold text-sm sm:text-[15px] text-leaf-950 dark:text-turmeric-400 mt-3 mb-1.5 flex items-center gap-1.5"
        >
          {parseInlineFormatting(line.slice(4))}
        </h4>
      );
      continue;
    }

    if (line.startsWith("## ") || line.startsWith("# ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="font-displayTe font-extrabold text-base text-leaf-950 dark:text-turmeric-400 mt-3.5 mb-1.5"
        >
          {parseInlineFormatting(line.replace(/^#+\s*/, ""))}
        </h3>
      );
      continue;
    }

    // Unordered List Items (- or *)
    const ulMatch = line.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (currentList && currentList.type !== "ul") {
        flushList();
      }
      if (!currentList) {
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(parseInlineFormatting(ulMatch[1]));
      continue;
    }

    // Ordered List Items (1. or 2.)
    const olMatch = line.match(/^\d+[.)]\s+(.*)$/);
    if (olMatch) {
      if (currentList && currentList.type !== "ol") {
        flushList();
      }
      if (!currentList) {
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(parseInlineFormatting(olMatch[1]));
      continue;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p
        key={`p-${i}`}
        className="my-1.5 text-sm leading-relaxed text-ink-800 dark:text-rice-50/90"
      >
        {parseInlineFormatting(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{elements}</div>;
}

/**
 * Animated Markdown with smooth typewriter / chunk streaming effect.
 */
export function RuchiMarkdown({
  content,
  isStreaming = false,
  onStreamComplete,
  className = "",
  onTick,
}: RuchiMarkdownProps) {
  const [displayedText, setDisplayedText] = useState(isStreaming ? "" : content);
  const [isAnimating, setIsAnimating] = useState(isStreaming);
  const animationRef = useRef<number | null>(null);
  const onStreamCompleteRef = useRef(onStreamComplete);
  const onTickRef = useRef(onTick);
  useEffect(() => {
    onStreamCompleteRef.current = onStreamComplete;
    onTickRef.current = onTick;
  });

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(content);
      setIsAnimating(false);
      return;
    }

    // Smooth streaming generator
    setIsAnimating(true);
    let index = 0;
    const totalChars = content.length;
    // Adapt step speed dynamically based on total length so it finishes in 1.2-2.0s
    const stepSize = Math.max(3, Math.ceil(totalChars / 55));
    const delay = 18; // 18ms intervals

    let lastTime = performance.now();

    const step = (time: number) => {
      if (time - lastTime >= delay) {
        index = Math.min(totalChars, index + stepSize);
        setDisplayedText(content.slice(0, index));
        lastTime = time;
        if (onTickRef.current) onTickRef.current();

        if (index >= totalChars) {
          setIsAnimating(false);
          if (onStreamCompleteRef.current) onStreamCompleteRef.current();
          return;
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [content, isStreaming]);

  // Fast skip: click bubble to show all immediately
  const handleSkip = () => {
    if (isAnimating) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setDisplayedText(content);
      setIsAnimating(false);
      if (onStreamComplete) onStreamComplete();
      if (onTick) onTick();
    }
  };

  return (
    <div
      onClick={handleSkip}
      className={`relative select-text ${isAnimating ? "cursor-pointer" : ""} ${className}`}
      title={isAnimating ? "Click to display immediately" : undefined}
    >
      <MarkdownRenderer content={displayedText} />

      {isAnimating && (
        <span
          className="inline-block w-1.5 h-3.5 ml-1 bg-turmeric-600 dark:bg-turmeric-400 rounded-2xs animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
