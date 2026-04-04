export interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  group: "today" | "yesterday" | "previous7" | "previous30";
}

export interface ChatMessagePart {
  type: "text" | "link";
  content: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  parts: ChatMessagePart[];
  responseText?: string;
  showActions?: boolean;
}

export interface SuggestionChip {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}
