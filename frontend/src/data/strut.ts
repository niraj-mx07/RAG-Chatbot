import type { Conversation, ChatMessage, SuggestionChip } from "@/types/strut";

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Marketing announcement copy",
    timestamp: "2:34 PM",
    group: "today",
  },
  {
    id: "conv-2",
    title: "Write product launch email",
    timestamp: "11:20 AM",
    group: "today",
  },
  {
    id: "conv-3",
    title: "Social media content calendar",
    timestamp: "9:15 AM",
    group: "today",
  },
  {
    id: "conv-4",
    title: "Brand voice guidelines review",
    timestamp: "Yesterday",
    group: "yesterday",
  },
  {
    id: "conv-5",
    title: "SEO blog post outline",
    timestamp: "Yesterday",
    group: "yesterday",
  },
  {
    id: "conv-6",
    title: "Newsletter subject line ideas",
    timestamp: "3 days ago",
    group: "previous7",
  },
  {
    id: "conv-7",
    title: "Landing page hero copy",
    timestamp: "5 days ago",
    group: "previous7",
  },
  {
    id: "conv-8",
    title: "Customer testimonial rewrite",
    timestamp: "6 days ago",
    group: "previous7",
  },
  {
    id: "conv-9",
    title: "Press release draft",
    timestamp: "2 weeks ago",
    group: "previous30",
  },
  {
    id: "conv-10",
    title: "About us page copy",
    timestamp: "3 weeks ago",
    group: "previous30",
  },
];

export const ACTIVE_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    parts: [
      { type: "text", content: "Write an announcement using " },
      { type: "link", content: "Offer Special Promotions or Discounts" },
      {
        type: "text",
        content:
          ". The audience is UI/UX Designer, the goal is Lead to subscription and write the tone in the same style as ",
      },
      { type: "link", content: "Promo" },
      { type: "text", content: "." },
    ],
  },
  {
    id: "msg-2",
    role: "assistant",
    parts: [],
    showActions: true,
    responseText:
      "**Unlock Your Design Potential: Exclusive Offer for UI/UX Designers!**\n\nHey Creative Minds! ✨✨\n\nAre you ready to elevate your design game to stellar heights? We've got something special just for you! For a limited time only, we're rolling out an exclusive offer that's too good to pass up. Dive into a world where your design skills can truly shine with our premium features and subscription plans — now within easier reach than ever before.",
  },
];

export const SUGGESTIONS: SuggestionChip[] = [
  {
    id: "sug-1",
    title: "Write a blog post",
    subtitle: "about our latest feature release",
    icon: "Pencil",
  },
  {
    id: "sug-2",
    title: "Generate email copy",
    subtitle: "for a product launch campaign",
    icon: "Mail",
  },
  {
    id: "sug-3",
    title: "Create social content",
    subtitle: "for Instagram and LinkedIn",
    icon: "Share2",
  },
  {
    id: "sug-4",
    title: "Improve my headline",
    subtitle: "make it more compelling",
    icon: "Sparkles",
  },
];
