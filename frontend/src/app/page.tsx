"use client";

import { useState, useRef, useEffect } from "react";
import LeftSidebar from "@/components/strut/LeftSidebar";
import WelcomeScreen from "@/components/strut/WelcomeScreen";
import ChatMessage from "@/components/strut/ChatMessage";
import ChatInput from "@/components/strut/ChatInput";
import { ACTIVE_CHAT_MESSAGES } from "@/data/strut";
import type { ChatMessage as ChatMessageType } from "@/types/strut";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    "conv-1"
  );
  const [messages, setMessages] = useState<ChatMessageType[]>(
    ACTIVE_CHAT_MESSAGES
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversation(null);
    setInputMessage("");
    setIsTyping(false);
  };

  const handleConversationSelect = (id: string) => {
    setActiveConversation(id);
    if (id === "conv-1") {
      setMessages(ACTIVE_CHAT_MESSAGES);
      setIsTyping(false);
    } else {
      setMessages([]);
    }
    setInputMessage("");
  };

  const handleSuggestionClick = (title: string) => {
    const newMessage: ChatMessageType = {
      id: `msg-new-${Date.now()}`,
      role: "user",
      parts: [{ type: "text", content: title }],
    };
    setMessages([newMessage]);
    setIsTyping(true);
    setActiveConversation(null);
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: "user",
      parts: [{ type: "text", content: inputMessage }],
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response after a short delay
    setIsTyping(true);

    setTimeout(() => {
      const response: ChatMessageType = {
        id: `msg-resp-${Date.now()}`,
        role: "assistant",
        parts: [],
        showActions: true,
        responseText:
          "I'd be happy to help with that! Let me craft something for you based on your request.\n\nHere's a draft to get started:\n\n**Your content will appear here**\n\nFeel free to refine the direction or let me know if you'd like me to adjust the tone, length, or focus.",
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleStopWriting = () => {
    setIsTyping(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Left Sidebar */}
      <div
        className={`flex-shrink-0 transition-all duration-200 ${
          sidebarOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <LeftSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(false)}
          activeConversation={activeConversation}
          onConversationSelect={handleConversationSelect}
          onNewChat={handleNewChat}
        />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-center px-4 py-2.5 flex-shrink-0">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-4 top-2.5 p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
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
          )}

          {/* Model selector */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Strut 4o
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </header>

        {/* Messages or Welcome */}
        {hasMessages ? (
          <div className="flex-1 overflow-y-auto chat-scroll">
            <div className="pb-4">
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isLast={idx === messages.length - 1}
                  isTyping={isTyping}
                  onStopWriting={handleStopWriting}
                />
              ))}

              {/* Typing indicator (standalone) */}
              {isTyping && messages[messages.length - 1]?.role === "user" && (
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-3">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <button
                        onClick={handleStopWriting}
                        className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                          <div className="w-1.5 h-0.5 bg-gray-600 rounded-full" />
                        </div>
                        Stop generating
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        )}

        {/* Input area */}
        <ChatInput
          value={inputMessage}
          onChange={setInputMessage}
          onSend={handleSend}
          disabled={isTyping}
        />
      </main>
    </div>
  );
}
