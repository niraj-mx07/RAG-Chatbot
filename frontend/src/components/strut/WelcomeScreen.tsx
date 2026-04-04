"use client";

import { Pencil, Mail, Share2, Sparkles } from "lucide-react";
import { SUGGESTIONS } from "@/data/strut";

interface WelcomeScreenProps {
  onSuggestionClick: (title: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Pencil: <Pencil className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export default function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-6">
        <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
      </div>

      {/* Greeting */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        How can I help you today?
      </h1>
      <p className="text-gray-500 text-sm mb-10 text-center max-w-md">
        I can help you write marketing copy, blog posts, social media content,
        emails, and more. Just ask!
      </p>

      {/* Suggestion chips grid */}
      <div className="grid grid-cols-2 gap-3 max-w-xl w-full">
        {SUGGESTIONS.map((sug) => (
          <button
            key={sug.id}
            onClick={() => onSuggestionClick(sug.title)}
            className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left group"
          >
            <div className="text-gray-400 group-hover:text-gray-600 mt-0.5 flex-shrink-0">
              {ICON_MAP[sug.icon] || <Sparkles className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800">{sug.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">
                {sug.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
