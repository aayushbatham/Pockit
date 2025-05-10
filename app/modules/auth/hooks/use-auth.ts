import { getAuthToken, setAuthToken, removeAuthToken, isAuthenticated } from '@/utils/storage';

export const useAuth = () => {
  const getToken = () => {
    try {
      const token = getAuthToken();
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  return {
    getToken,
    setToken: setAuthToken,
    removeToken: removeAuthToken,
    isAuthenticated,
  };
};