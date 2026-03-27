import { useEffect, useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import { useChat } from './hooks/useChat';
import { useDocuments } from './hooks/useDocuments';

const Toasts = ({ toasts, dismissToast }) => (
  <div className="toast-stack" aria-live="assertive">
    {toasts.map((toast) => (
      <div key={toast.id} className="toast toast-error">
        <span>{toast.message}</span>
        <button type="button" onClick={() => dismissToast(toast.id)} aria-label="Dismiss notification">
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

const App = () => {
  const [toasts, setToasts] = useState([]);

  const notifyError = (message) => {
    const id = `toast-${crypto.randomUUID()}`;
    setToasts((previous) => [...previous, { id, message }]);
    setTimeout(() => {
      setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => setToasts((previous) => previous.filter((toast) => toast.id !== id));

  const { messages, isLoading, sessionId, sendMessage, clearSession } = useChat(notifyError);
  const { documents, isUploading, uploadProgress, fetchDocuments, uploadDocuments, deleteDocument } = useDocuments(notifyError);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const sessionLabel = useMemo(() => sessionId.slice(0, 8), [sessionId]);

  return (
    <div className="app-shell">
      <Toasts toasts={toasts} dismissToast={dismissToast} />

      <aside className="sidebar-panel">
        <header className="brand-header">
          <h1>DOCMIND</h1>
          <span>Document Intelligence</span>
        </header>

        <DocumentUpload
          onUpload={uploadDocuments}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
          notifyError={notifyError}
        />

        <section className="documents-section">
          <div className="section-title">Indexed Documents</div>
          <DocumentList documents={documents} onDelete={deleteDocument} isBusy={isUploading || isLoading} />
        </section>

        <button type="button" className="new-chat-btn" onClick={clearSession} disabled={isLoading}>
          <Plus size={16} />
          New Chat
        </button>
      </aside>

      <main className="chat-panel">
        <header className="chat-header">
          <div>
            <h2>Research Session</h2>
            <p>Session #{sessionLabel}</p>
          </div>
          <div className="chat-header-meta">
            <span>{documents.length} docs</span>
            <span>{messages.length} msgs</span>
          </div>
        </header>

        <ChatInterface messages={messages} isLoading={isLoading} onSendMessage={sendMessage} />
      </main>
    </div>
  );
};

export default App;
