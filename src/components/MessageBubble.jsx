import ReactMarkdown from 'react-markdown';
import SourceCitation from './SourceCitation';

const MessageBubble = ({ role, content, sources = [], timestamp }) => {
  const isUser = role === 'user';

  return (
    <article className={`message-row ${isUser ? 'message-row-user' : 'message-row-assistant'}`}>
      <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}>
        <div className="markdown-wrap">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <span className="message-timestamp">{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      {!isUser && sources.length > 0 && <SourceCitation sources={sources} />}
    </article>
  );
};

export default MessageBubble;
