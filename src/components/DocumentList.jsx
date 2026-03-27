import { FileText, Trash2 } from 'lucide-react';

const relativeTime = (isoDate) => {
  const timestamp = new Date(isoDate).getTime();
  if (Number.isNaN(timestamp)) {
    return 'just now';
  }

  const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hr ago`;
  return `${Math.floor(diffSeconds / 86400)} day ago`;
};

const fileTypeLabel = (filename) => filename.split('.').pop()?.toUpperCase() || 'DOC';

const DocumentList = ({ documents, onDelete, isBusy }) => {
  if (!documents.length) {
    return <div className="documents-empty">No documents indexed yet. Upload to begin.</div>;
  }

  return (
    <div className="document-list" role="list" aria-label="Indexed documents">
      {documents.map((doc) => (
        <div key={doc.filename} className={`document-item ${doc.status === 'indexing' ? 'indexing' : ''}`} role="listitem">
          <div className="document-main">
            <div className="document-icon-wrap">
              <FileText size={16} />
              <span className="doc-type-tag">{fileTypeLabel(doc.filename)}</span>
            </div>
            <div className="document-meta">
              <p className="document-filename" title={doc.filename}>
                {doc.filename}
              </p>
              <div className="document-subline">
                <span className="chunk-badge">{doc.chunks} chunks</span>
                <span className="uploaded-time">{relativeTime(doc.uploadedAt)}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="delete-doc-btn"
            onClick={() => onDelete(doc.filename)}
            disabled={isBusy}
            aria-label={`Delete ${doc.filename}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
