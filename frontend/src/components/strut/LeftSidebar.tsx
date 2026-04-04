"use client";

import { useState } from "react";
import {
  Plus,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Settings,
  ChevronDown,
} from "lucide-react";
import { CONVERSATIONS } from "@/data/strut";

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeConversation: string | null;
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
}

function ConversationGroup({
  label,
  conversations,
  activeId,
  onSelect,
}: {
  label: string;
  conversations: { id: string; title: string; timestamp: string }[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (conversations.length === 0) return null;

  return (
    <div className="mb-2">
      <h3 className="px-3 pt-4 pb-1 text-xs font-medium text-gray-500">
        {label}
      </h3>
      {conversations.map((conv) => {
        const isActive = activeId === conv.id;
        const isHovered = hoveredId === conv.id;
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            onMouseEnter={() => setHoveredId(conv.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${
              isActive
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-50" />
            <span className="truncate flex-1 text-left">{conv.title}</span>
            {(isHovered || isActive) && (
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  className="p-0.5 rounded hover:bg-white/10 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button
                  className="p-0.5 rounded hover:bg-white/10 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function LeftSidebar({
  isOpen,
  onToggle,
  activeConversation,
  onConversationSelect,
  onNewChat,
}: LeftSidebarProps) {
  const today = CONVERSATIONS.filter((c) => c.group === "today");
  const yesterday = CONVERSATIONS.filter((c) => c.group === "yesterday");
  const previous7 = CONVERSATIONS.filter((c) => c.group === "previous7");
  const previous30 = CONVERSATIONS.filter((c) => c.group === "previous30");

  if (!isOpen) return null;

  return (
    <aside className="flex flex-col h-full bg-[#171717] overflow-hidden">
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-3 py-3">
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
        <button
          onClick={onNewChat}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 mb-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
          <Search className="w-4 h-4" />
          Search chats
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 sidebar-scroll">
        <ConversationGroup
          label="Today"
          conversations={today}
          activeId={activeConversation}
          onSelect={onConversationSelect}
        />
        <ConversationGroup
          label="Yesterday"
          conversations={yesterday}
          activeId={activeConversation}
          onSelect={onConversationSelect}
        />
        <ConversationGroup
          label="Previous 7 Days"
          conversations={previous7}
          activeId={activeConversation}
          onSelect={onConversationSelect}
        />
        <ConversationGroup
          label="Previous 30 Days"
          conversations={previous30}
          activeId={activeConversation}
          onSelect={onConversationSelect}
        />
      </div>

      {/* Bottom user section */}
      <div className="border-t border-white/10 p-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            JS
          </div>
          <span className="flex-1 text-left truncate">John Smith</span>
          <Settings className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </aside>
  );
}
