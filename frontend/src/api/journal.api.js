import apiClient from './apiClient';

export const getJournals = async () => {
  const response = await apiClient.get('/journals');
  return response.data;
};

export const getJournalById = async (id) => {
  const response = await apiClient.get(`/journals/${id}`);
  return response.data;
};

export const createJournal = async ({ title, content, mood }) => {
  const response = await apiClient.post('/journals', {
    title,
    content,
    mood,
  });
  return response.data;
};

export const updateJournal = async (id, { title, content, mood }) => {
  const response = await apiClient.patch(`/journals/${id}`, {
    title,
    content,
    mood,
  });
  return response.data;
};

export const deleteJournal = async (id) => {
  const response = await apiClient.delete(`/journals/${id}`);
  return response.data;
};
