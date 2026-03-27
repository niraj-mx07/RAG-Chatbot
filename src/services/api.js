import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 60000,
});

export const sendChatMessage = async (sessionId, message) => {
  const { data } = await api.post('/api/chat/message', {
    session_id: sessionId,
    message,
  });
  return data;
};

export const fetchDocuments = async () => {
  const { data } = await api.get('/api/documents/list');
  return data;
};

export const uploadDocuments = async (formData, onUploadProgress) => {
  const { data } = await api.post('/api/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return data;
};

export const deleteDocument = async (filename) => {
  const { data } = await api.delete(`/api/documents/${encodeURIComponent(filename)}`);
  return data;
};

export const clearSession = async (sessionId) => {
  const { data } = await api.delete(`/api/chat/session/${encodeURIComponent(sessionId)}`);
  return data;
};
