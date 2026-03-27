import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

const ALLOWED_TYPES = ['pdf', 'docx', 'txt'];

const DocumentUpload = ({ onUpload, uploadProgress, isUploading, notifyError }) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFiles = (files) => {
    const validFiles = [];

    files.forEach((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension && ALLOWED_TYPES.includes(extension)) {
        validFiles.push(file);
      } else {
        notifyError(`Unsupported file type: ${file.name}`);
      }
    });

    return validFiles;
  };

  const processFiles = (fileList) => {
    const files = Array.from(fileList || []);
    const validFiles = validateFiles(files);
    if (validFiles.length) {
      onUpload(validFiles);
    }
  };

  return (
    <section className="upload-section">
      <input
        ref={inputRef}
        type="file"
        className="hidden-input"
        multiple
        accept=".pdf,.docx,.txt"
        onChange={(event) => processFiles(event.target.files)}
      />
      <button
        type="button"
        className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          processFiles(event.dataTransfer.files);
        }}
      >
        <Upload size={18} />
        <div>
          <p>Drop files here or click to upload</p>
          <small>PDF, DOCX, TXT · multiple files supported</small>
        </div>
      </button>

      {Object.keys(uploadProgress).length > 0 && (
        <div className="upload-progress-list">
          {Object.entries(uploadProgress).map(([filename, progress]) => (
            <div key={filename} className="upload-progress-item">
              <div className="upload-progress-row">
                <span title={filename}>{filename}</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track">
                <span className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
      {isUploading && <p className="uploading-caption">Uploading and indexing…</p>}
    </section>
  );
};

export default DocumentUpload;
