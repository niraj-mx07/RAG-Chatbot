"use client";

import type { ChatMessage as ChatMessageType } from "@/types/strut";
import { ThumbsUp, ThumbsDown, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
  isLast: boolean;
  isTyping: boolean;
  onStopWriting: () => void;
}

export default function ChatMessage({
  message,
  isLast,
  isTyping,
  onStopWriting,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (message.responseText) {
      navigator.clipboard.writeText(message.responseText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  if (message.role === "user") {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-[#f7f7f8] rounded-2xl px-5 py-3.5">
            <div className="text-[15px] text-gray-800 leading-relaxed">
              {message.parts.map((part, idx) =>
                part.type === "link" ? (
                  <span
                    key={idx}
                    className="text-blue-600 underline cursor-pointer hover:text-blue-700 decoration-blue-300"
                  >
                    {part.content}
                  </span>
                ) : (
                  <span key={idx}>{part.content}</span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assistant message
  const lines = message.responseText
    ? message.responseText.split("\n")
    : [];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-3">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] text-gray-800 leading-7">
            {lines.map((line, idx) => {
              if (line.trim() === "") {
                return <div key={idx} className="h-2" />;
              }

              // Check if line starts with ** (markdown bold)
              const boldMatch = line.match(/^\*\*(.+)\*\*(.*)/);
              if (boldMatch) {
                return (
                  <p key={idx} className="font-semibold text-gray-900">
                    {boldMatch[1]}
                    {boldMatch[2]}
                  </p>
                );
              }

              return (
                <p key={idx} className="text-gray-800">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Typing stop button */}
          {isLast && isTyping && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <button
                onClick={onStopWriting}
                className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-gray-600 rounded-full" />
                </div>
                Stop generating
              </button>
            </div>
          )}

          {/* Action buttons */}
          {message.showActions && !isTyping && (
            <div className="flex items-center gap-1 mt-3">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
              {copied && (
                <span className="text-xs text-gray-500 ml-1">Copied!</span>
              )}
              <button
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Good response"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Bad response"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Regenerate"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
