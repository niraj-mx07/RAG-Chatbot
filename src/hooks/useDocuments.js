import { useCallback, useMemo, useState } from 'react';
import {
  deleteDocument as deleteDocumentApi,
  fetchDocuments as fetchDocumentsApi,
  uploadDocuments as uploadDocumentsApi,
} from '../services/api';

const normalizeDocument = (document) => ({
  filename: document.filename,
  chunks: document.chunks ?? document.chunks_added ?? 0,
  uploadedAt: document.uploadedAt ?? new Date().toISOString(),
  status: document.status ?? 'indexed',
});

export const useDocuments = (notifyError) => {
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const fetchDocuments = useCallback(async () => {
    try {
      const documentList = await fetchDocumentsApi();
      setDocuments(Array.isArray(documentList) ? documentList.map(normalizeDocument) : []);
    } catch (error) {
      notifyError?.(error?.response?.data?.detail || 'Failed to load documents.');
    }
  }, [notifyError]);

  const uploadDocuments = useCallback(
    async (files) => {
      if (!files?.length) {
        return;
      }

      setIsUploading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append('files', file);

        try {
          const uploadResponse = await uploadDocumentsApi(formData, (progressEvent) => {
            const total = progressEvent.total || file.size || 1;
            const percent = Math.round((progressEvent.loaded / total) * 100);
            setUploadProgress((previous) => ({ ...previous, [file.name]: percent }));
          });

          const uploadedDoc = normalizeDocument({
            filename: uploadResponse?.filename || file.name,
            chunks: uploadResponse?.chunks_added ?? 0,
            uploadedAt: new Date().toISOString(),
            status: 'indexing',
          });

          setDocuments((previous) => [uploadedDoc, ...previous.filter((doc) => doc.filename !== uploadedDoc.filename)]);

          setTimeout(() => {
            setDocuments((previous) =>
              previous.map((doc) => (doc.filename === uploadedDoc.filename ? { ...doc, status: 'indexed' } : doc)),
            );
          }, 2000);
        } catch (error) {
          notifyError?.(`Failed to upload ${file.name}.`);
        } finally {
          setUploadProgress((previous) => ({ ...previous, [file.name]: 100 }));
          setTimeout(() => {
            setUploadProgress((previous) => {
              const next = { ...previous };
              delete next[file.name];
              return next;
            });
          }, 500);
        }
      }

      setIsUploading(false);
    },
    [notifyError],
  );

  const deleteDocument = useCallback(
    async (filename) => {
      try {
        await deleteDocumentApi(filename);
        setDocuments((previous) => previous.filter((doc) => doc.filename !== filename));
      } catch {
        notifyError?.(`Failed to delete ${filename}.`);
      }
    },
    [notifyError],
  );

  return useMemo(
    () => ({
      documents,
      isUploading,
      uploadProgress,
      fetchDocuments,
      uploadDocuments,
      deleteDocument,
      setDocuments,
    }),
    [deleteDocument, documents, fetchDocuments, isUploading, uploadDocuments, uploadProgress],
  );
};
