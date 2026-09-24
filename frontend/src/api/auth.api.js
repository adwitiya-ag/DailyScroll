import apiClient from './apiClient';

export const registerUser = async ({ fullName, email, username, password }) => {
  const response = await apiClient.post('/users/register', {
    fullName,
    email,
    username,
    password,
  });
  return response.data;
};

export const loginUser = async ({ username, email, password }) => {
  const response = await apiClient.post('/users/login', {
    username: username || undefined,
    email: email || undefined,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/users/logout');
  return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await apiClient.post('/users/refresh-token', {
    refreshToken,
  });
  return response.data;
};
