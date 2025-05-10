import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const AUTH_TOKEN_KEY = 'auth_token';

// Auth token functions
export const getAuthToken = (): string | undefined => {
  return storage.getString(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  storage.set(AUTH_TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  storage.delete(AUTH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};