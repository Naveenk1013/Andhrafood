import React from "react";
import { BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceChipProps {
  sourceId: string;
  title?: string;
  url?: string;
  tier?: "A" | "B" | "C" | "D";
  className?: string;
}

export function SourceChip({
  sourceId,
  title,
  url,
  tier = "A",
  className,
}: SourceChipProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip text-xs font-medium border transition-colors",
        "bg-rice-50 text-ink-900 border-leaf-100 hover:border-leaf-700/40 hover:bg-leaf-100/50",
        className
      )}
    >
      <ShieldCheck className="w-3 h-3 text-leaf-700" />
      <span className="font-semibold text-leaf-700">[{sourceId}]</span>
      {title && <span className="truncate max-w-[200px]">{title}</span>}
      {tier && (
        <span
          className={cn(
            "px-1 py-0.2 rounded text-[10px] font-bold",
            tier === "A" && "bg-leaf-100 text-leaf-700",
            tier === "B" && "bg-turmeric-500/20 text-turmeric-700"
          )}
        >
          Tier {tier}
        </span>
      )}
      {url && <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block focus:outline-none focus:ring-2 focus:ring-turmeric-500 rounded-chip"
      >
        {content}
      </a>
    );
  }

  return content;
}
