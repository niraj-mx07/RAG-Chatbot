import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatInterface = ({ messages, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const maxHeight = 24 * 4;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [input]);

  const submit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    onSendMessage(text);
    setInput('');
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <section className="chat-layout">
      <div className="messages-scroller">
        {messages.length === 0 && !isLoading ? (
          <div className="chat-empty-state">
            <div className="empty-illustration">⌁</div>
            <h2>Upload a document and start asking questions</h2>
            <p>Your answers will include evidence cards with citations from indexed chunks.</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} {...message} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
        <div ref={endRef} />
      </div>

      <div className="chat-input-bar">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything about your documents…"
          disabled={isLoading}
        />
        <button type="button" onClick={submit} disabled={isLoading || input.trim().length === 0} aria-label="Send message">
          {isLoading ? <span className="btn-spinner" /> : <Send size={16} />}
        </button>
      </div>
    </section>
  );
};

export default ChatInterface;
