"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-4 pt-2">
      {/* Input container */}
      <div
        className={`relative flex items-end bg-[#f4f4f4] rounded-2xl border transition-colors ${
          isFocused
            ? "border-gray-400 shadow-sm"
            : "border-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
        }`}
      >
        {/* Attach button */}
        <button className="p-3 pb-3 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 self-end">
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Message Strut..."
          rows={1}
          className="flex-1 bg-transparent text-[15px] text-gray-800 placeholder-gray-500 outline-none py-3.5 pr-2 resize-none max-h-[200px] leading-6"
          style={{ height: "24px" }}
        />

        {/* Send / Mic button */}
        <div className="flex-shrink-0 self-end p-2 pb-3">
          {canSend ? (
            <button
              onClick={onSend}
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </button>
          ) : (
            <button className="w-8 h-8 rounded-full text-gray-400 flex items-center justify-center hover:text-gray-600 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-400 mt-2">
        Strut can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
