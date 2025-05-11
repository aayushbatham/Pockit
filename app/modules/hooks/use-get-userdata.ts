import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth/hooks/use-auth';

interface UserData {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}

async function fetchUserData(): Promise<UserData> {
  const auth = useAuth();
  const token = await auth.getToken();

  const response = await fetch('http://192.168.137.1:8080/api/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}

export function useGetUserData() {
  return useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });
}