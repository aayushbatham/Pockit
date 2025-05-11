import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const AUTH_TOKEN_KEY = 'auth_token';
const USERNAME_KEY = 'username';
const PHONE_NUMBER_KEY = 'phone_number';

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

export const setUsername = (username: string): void => {
  storage.set(USERNAME_KEY, username);
};

export const getUsername = (): string | undefined => {
  return storage.getString(USERNAME_KEY);
};

export const setPhoneNumber = (phoneNumber: string): void => {
  storage.set(PHONE_NUMBER_KEY, phoneNumber);
};

export const getPhoneNumber = (): string | undefined => {
  return storage.getString(PHONE_NUMBER_KEY);
};