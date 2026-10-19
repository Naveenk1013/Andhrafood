"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Paperclip, Square, X, StopCircle, Mic, Globe, BrainCog, FolderCode, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RuchiOrb } from "@/components/ui/RuchiOrb";
import { ruchiAudio } from "@/lib/sound-effects";
import { PermissionModal } from "@/components/ui/PermissionModal";

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-ink-950 dark:text-rice-50 placeholder:text-ink-400 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none scrollbar-thin scrollbar-thumb-leaf-200 dark:scrollbar-thumb-[#444444] scrollbar-track-transparent",
      className
    )}
    ref={ref}
    rows={1}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// Tooltip Components
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Dialog Components
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#333333] bg-[#1F2023] p-0 shadow-xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full bg-[#2E3033]/80 p-2 hover:bg-[#2E3033] transition-all">
        <X className="h-5 w-5 text-gray-200 hover:text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-gray-100", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white hover:bg-white/80 text-black",
      outline: "border border-[#444444] bg-transparent hover:bg-[#3A3A40]",
      ghost: "bg-transparent hover:bg-[#3A3A40]",
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6",
      icon: "h-8 w-8 rounded-full aspect-[1/1]",
    };
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// VoiceRecorder Component
interface VoiceRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: (duration: number) => void;
  visualizerBars?: number;
}
const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  visualizerBars = 32,
}) => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      onStartRecording();
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onStopRecording(time);
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, time, onStartRecording, onStopRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full transition-all duration-300 py-3",
        isRecording ? "opacity-100" : "opacity-0 h-0"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-mono text-sm text-white/80">{formatTime(time)}</span>
      </div>
      <div className="w-full h-10 flex items-center justify-center gap-0.5 px-4">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-white/50 animate-pulse"
            style={{
              height: `${Math.max(15, Math.random() * 100)}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ImageViewDialog Component
interface ImageViewDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}
const ImageViewDialog: React.FC<ImageViewDialogProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-[90vw] md:max-w-[800px]">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative bg-[#1F2023] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={imageUrl}
            alt="Full preview"
            className="w-full max-h-[80vh] object-contain rounded-2xl"
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

// PromptInput Context and Components
interface PromptInputContextType {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
  onFocus?: () => void;
}
const PromptInputContext = React.createContext<PromptInputContextType>({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
  onFocus: undefined,
});
export function usePromptInput() {
  const context = React.useContext(PromptInputContext);
  if (!context) throw new Error("usePromptInput must be used within a PromptInput");
  return context;
}

interface PromptInputProps {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}
export const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      className,
      isLoading = false,
      maxHeight = 240,
      value,
      onValueChange,
      onSubmit,
      onFocus,
      children,
      disabled = false,
      onDragOver,
      onDragLeave,
      onDrop,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value || "");
    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };
    return (
      <TooltipProvider>
        <PromptInputContext.Provider
          value={{
            isLoading,
            value: value ?? internalValue,
            setValue: onValueChange ?? handleChange,
            maxHeight,
            onSubmit,
            disabled,
            onFocus,
          }}
        >
          <div
            ref={ref}
            className={cn(
              "rounded-3xl border border-leaf-200/80 dark:border-[#444444] bg-white/95 dark:bg-[#1F2023] p-2 shadow-[0_8px_30px_rgba(31,90,67,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300",
              isLoading && "border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
              className
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    );
  }
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps {
  disableAutosize?: boolean;
  placeholder?: string;
}
export const PromptInputTextarea: React.FC<PromptInputTextareaProps & React.ComponentProps<typeof Textarea>> = ({
  className,
  onKeyDown,
  onFocus,
  disableAutosize = false,
  placeholder,
  ...props
}) => {
  const { value, setValue, maxHeight, onSubmit, onFocus: ctxFocus, disabled } = usePromptInput();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      typeof maxHeight === "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [value, maxHeight, disableAutosize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    ctxFocus?.();
    onFocus?.(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      className={cn("text-base", className)}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
};

export const PromptInputActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}
export const PromptInputAction: React.FC<PromptInputActionProps> = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}) => {
  const { disabled } = usePromptInput();
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

// Custom Divider Component
export const CustomDivider: React.FC = () => (
  <div className="relative h-6 w-[1.5px] mx-1">
    <div
      className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F59E0B]/70 to-transparent rounded-full"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 140% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 60%, -40% 50%, 0% 40%)",
      }}
    />
  </div>
);

// Main PromptInputBox Component
export interface PromptInputBoxProps {
  onSend?: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  locale?: string;
  enableSound?: boolean;
}

export const PromptInputBox = React.forwardRef<HTMLDivElement, PromptInputBoxProps>((props, ref) => {
  const {
    onSend = () => {},
    isLoading = false,
    placeholder = "Type your culinary question here...",
    className,
    locale = "en",
    enableSound = true,
  } = props;

  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showThink, setShowThink] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const lastSoundPlayedRef = useRef<number>(0);

  const [permissionType, setPermissionType] = useState<"microphone" | "camera" | null>(null);

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const promptBoxRef = useRef<HTMLDivElement>(null);

  const handleVoiceTrigger = () => {
    try {
      const hasPermission = localStorage.getItem("ruchi_mic_permission");
      if (hasPermission) {
        setIsRecording(true);
      } else {
        setPermissionType("microphone");
      }
    } catch {
      setIsRecording(true);
    }
  };

  const handleUploadTrigger = () => {
    try {
      const hasPermission = localStorage.getItem("ruchi_cam_permission");
      if (hasPermission) {
        uploadInputRef.current?.click();
      } else {
        setPermissionType("camera");
      }
    } catch {
      uploadInputRef.current?.click();
    }
  };

  const handlePermissionAllow = () => {
    try {
      if (permissionType === "microphone") {
        localStorage.setItem("ruchi_mic_permission", "granted");
        setPermissionType(null);
        setIsRecording(true);
      } else if (permissionType === "camera") {
        localStorage.setItem("ruchi_cam_permission", "granted");
        setPermissionType(null);
        uploadInputRef.current?.click();
      }
    } catch {
      setPermissionType(null);
    }
  };

  // Play modern clean futuristic sound effect on entering/focusing the prompt box
  const handlePromptEnter = useCallback(() => {
    if (!enableSound || soundMuted) return;
    const now = Date.now();
    // Throttle sound so repeated rapid clicks don't spam audio
    if (now - lastSoundPlayedRef.current > 400) {
      lastSoundPlayedRef.current = now;
      ruchiAudio.playPromptEnterChime();
    }
  }, [enableSound, soundMuted]);

  const handleToggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    ruchiAudio.setMuted(next);
    if (!next) {
      ruchiAudio.playToggleClick();
    }
  };

  const handleToggleChange = (value: string) => {
    if (enableSound && !soundMuted) ruchiAudio.playToggleClick();
    if (value === "search") {
      setShowSearch((prev) => !prev);
      setShowThink(false);
    } else if (value === "think") {
      setShowThink((prev) => !prev);
      setShowSearch(false);
    }
  };

  const handleCanvasToggle = () => {
    if (enableSound && !soundMuted) ruchiAudio.playToggleClick();
    setShowCanvas((prev) => !prev);
  };

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const processFile = useCallback((file: File) => {
    if (!isImageFile(file)) return;
    if (file.size > 10 * 1024 * 1024) return;
    setFiles([file]);
    const reader = new FileReader();
    reader.onload = (e) => setFilePreviews({ [file.name]: e.target?.result as string });
    reader.readAsDataURL(file);
    if (enableSound && !soundMuted) ruchiAudio.playToggleClick();
  }, [enableSound, soundMuted]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file) => isImageFile(file));
    if (imageFiles.length > 0) processFile(imageFiles[0]);
  }, [processFile]);

  const handleRemoveFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove && filePreviews[fileToRemove.name]) setFilePreviews({});
    setFiles([]);
  };

  const openImageModal = (imageUrl: string) => setSelectedImage(imageUrl);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processFile(file);
          break;
        }
      }
    }
  }, [processFile]);

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      if (enableSound && !soundMuted) ruchiAudio.playSendChime();
      let messagePrefix = "";
      if (showSearch) messagePrefix = "[District Search: ";
      else if (showThink) messagePrefix = "[Deep Recipe Analysis: ";
      else if (showCanvas) messagePrefix = "[Cooking Guide: ";
      const formattedInput = messagePrefix ? `${messagePrefix}${input}]` : input;
      onSend(formattedInput, files);
      setInput("");
      setFiles([]);
      setFilePreviews({});
    }
  };

  const handleStartRecording = () => {
    if (enableSound && !soundMuted) ruchiAudio.playToggleClick();
  };

  const handleStopRecording = (duration: number) => {
    setIsRecording(false);
    if (enableSound && !soundMuted) ruchiAudio.playSendChime();
    onSend(`[Voice Query - ${duration}s Andhra Recipe Analysis]`, []);
  };

  const hasContent = input.trim() !== "" || files.length > 0;

  return (
    <>
      <PromptInput
        value={input}
        onValueChange={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onFocus={handlePromptEnter}
        className={cn(
          "w-full bg-white/95 dark:bg-[#18191B] border-leaf-200/80 dark:border-[#383A40] shadow-[0_8px_32px_rgba(31,90,67,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out focus-within:border-turmeric-500/70 focus-within:ring-2 focus-within:ring-turmeric-500/20",
          isRecording && "border-red-500/70",
          className
        )}
        disabled={isLoading || isRecording}
        ref={ref || promptBoxRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {files.length > 0 && !isRecording && (
          <div className="flex flex-wrap gap-2 p-0 pb-2 transition-all duration-300">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                {file.type.startsWith("image/") && filePreviews[file.name] && (
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border border-white/20 shadow-md"
                    onClick={() => openImageModal(filePreviews[file.name])}
                  >
                    <img
                      src={filePreviews[file.name]}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      className="absolute top-1 right-1 rounded-full bg-black/80 p-0.5 opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div
          className={cn(
            "transition-all duration-300",
            isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100"
          )}
          onClick={handlePromptEnter}
        >
          <PromptInputTextarea
            placeholder={
              showSearch
                ? (locale === "te" ? "ఆంధ్రప్రదేశ్ 26 జిల్లాల డేటాబేస్‌ను శోధించండి..." : "Search across 26 Andhra district culinary records...")
                : showThink
                ? (locale === "te" ? "వంటకాల సూక్ష్మ కొలతలు, ఘాటు నిష్పత్తులను విశ్లేషించండి..." : "Deeply analyze spice ratios, rolu stone grinding & traditional methods...")
                : showCanvas
                ? (locale === "te" ? "పూర్తి వంట విధానం & దశలను రూపొందించండి..." : "Generate full cooking steps and traditional Andhra menu...")
                : placeholder
            }
            className="text-base text-ink-950 dark:text-rice-50 placeholder:text-ink-400 dark:placeholder:text-gray-400"
          />
        </div>

        {isRecording && (
          <VoiceRecorder
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        )}

        <PromptInputActions className="flex items-center justify-between gap-2 p-0 pt-2 border-t border-leaf-200/50 dark:border-white/5">
          <div
            className={cn(
              "flex items-center gap-1 transition-opacity duration-300 flex-wrap",
              isRecording ? "opacity-0 invisible h-0" : "opacity-100 visible"
            )}
          >
            <PromptInputAction tooltip="Upload dish or ingredient image">
              <button
                type="button"
                onClick={handleUploadTrigger}
                className="flex h-8 w-8 text-ink-500 dark:text-[#9CA3AF] cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-ink-900 dark:hover:text-rice-50"
                disabled={isRecording}
                aria-label="Upload image"
              >
                <Paperclip className="h-4 w-4 transition-colors" />
                <input
                  ref={uploadInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) processFile(e.target.files[0]);
                    if (e.target) e.target.value = "";
                  }}
                  accept="image/*"
                />
              </button>
            </PromptInputAction>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleToggleChange("search")}
                className={cn(
                  "rounded-full transition-all flex items-center gap-1 px-2.5 py-1 border h-7 text-xs font-semibold",
                  showSearch
                    ? "bg-[#1EAEDB]/20 border-[#1EAEDB] text-[#1EAEDB] shadow-[0_0_10px_rgba(30,174,219,0.3)]"
                    : "bg-transparent border-transparent text-ink-600 dark:text-[#9CA3AF] hover:text-ink-950 dark:hover:text-[#D1D5DB]"
                )}
              >
                <Globe className={cn("w-3.5 h-3.5", showSearch ? "text-[#1EAEDB]" : "text-inherit")} />
                <AnimatePresence>
                  {showSearch && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] overflow-hidden whitespace-nowrap text-[#1EAEDB]"
                    >
                      {locale === "te" ? "శోధన" : "Districts"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <CustomDivider />

              <button
                type="button"
                onClick={() => handleToggleChange("think")}
                className={cn(
                  "rounded-full transition-all flex items-center gap-1 px-2.5 py-1 border h-7 text-xs font-semibold",
                  showThink
                    ? "bg-turmeric-500/20 border-turmeric-400 text-turmeric-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                    : "bg-transparent border-transparent text-ink-600 dark:text-[#9CA3AF] hover:text-ink-950 dark:hover:text-[#D1D5DB]"
                )}
              >
                <BrainCog className={cn("w-3.5 h-3.5", showThink ? "text-turmeric-400" : "text-inherit")} />
                <AnimatePresence>
                  {showThink && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] overflow-hidden whitespace-nowrap text-turmeric-400"
                    >
                      {locale === "te" ? "విశ్లేషణ" : "Deep Recipe"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <CustomDivider />

              <button
                type="button"
                onClick={handleCanvasToggle}
                className={cn(
                  "rounded-full transition-all flex items-center gap-1 px-2.5 py-1 border h-7 text-xs font-semibold",
                  showCanvas
                    ? "bg-guntur-600/25 border-guntur-500 text-guntur-500 shadow-[0_0_10px_rgba(217,45,32,0.3)]"
                    : "bg-transparent border-transparent text-ink-600 dark:text-[#9CA3AF] hover:text-ink-950 dark:hover:text-[#D1D5DB]"
                )}
              >
                <FolderCode className={cn("w-3.5 h-3.5", showCanvas ? "text-guntur-500" : "text-inherit")} />
                <AnimatePresence>
                  {showCanvas && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] overflow-hidden whitespace-nowrap text-guntur-500"
                    >
                      {locale === "te" ? "విధానం" : "Culinary Card"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Feedback Mute/Unmute Toggle */}
            {enableSound && (
              <button
                type="button"
                onClick={handleToggleSound}
                className="w-7 h-7 rounded-full flex items-center justify-center text-ink-500 dark:text-gray-400 hover:text-ink-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title={soundMuted ? "Sound Unmute" : "Futuristic Sound Active"}
                aria-label="Toggle audio feedback"
              >
                {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-turmeric-600 dark:text-turmeric-400" />}
              </button>
            )}

            {/* Living Ruchi Orb Persona Submit Button (Replacing plain icon!) */}
            <PromptInputAction
              tooltip={
                isLoading
                  ? "Ruchi is generating..."
                  : isRecording
                  ? "Stop recording"
                  : hasContent
                  ? "Ask Ruchi AI"
                  : "Voice query"
              }
            >
              <button
                type="button"
                className={cn(
                  "group relative p-1 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turmeric-400/50",
                  isRecording
                    ? "bg-red-500/20 border border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                    : hasContent
                    ? "bg-leaf-800/80 hover:bg-leaf-700 border border-turmeric-400/60 shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-105"
                    : "bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/10"
                )}
                onClick={() => {
                  if (isRecording) setIsRecording(false);
                  else if (hasContent) handleSubmit();
                  else handleVoiceTrigger();
                }}
                disabled={isLoading && !hasContent}
                aria-label="Ruchi AI Submit"
              >
                {isLoading ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Square className="h-3.5 w-3.5 fill-turmeric-400 text-turmeric-400 animate-pulse" />
                  </div>
                ) : isRecording ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <StopCircle className="h-5 w-5 text-red-500 animate-pulse" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-1 py-0.5">
                    {/* The Luminous Ruchi Orb Persona */}
                    <RuchiOrb
                      size="xs"
                      state={hasContent ? "speaking" : "idle"}
                      className="transition-transform duration-300 group-hover:scale-110 shadow-lg"
                    />
                    {hasContent && (
                      <span className="text-[11px] font-bold text-turmeric-400 pr-1 tracking-tight hidden sm:inline">
                        {locale === "te" ? "అడుగు" : "Ask Ruchi"}
                      </span>
                    )}
                  </div>
                )}
              </button>
            </PromptInputAction>
          </div>
        </PromptInputActions>
      </PromptInput>

      <ImageViewDialog imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* Transparent DPDP Permission Prompt Modal */}
      <PermissionModal
        isOpen={permissionType !== null}
        type={permissionType || "microphone"}
        onAllow={handlePermissionAllow}
        onDeny={() => setPermissionType(null)}
        locale={locale}
      />
    </>
  );
});
PromptInputBox.displayName = "PromptInputBox";

export default PromptInputBox;
