import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth/hooks/use-auth';

interface Milestone {
  id: string;
  savedAmount: number;
  goalAmount: number;
  duration: string;
  createdAt: string;
}

export function useGetMilestone() {
  const auth = useAuth();

  async function fetchMilestones(): Promise<Milestone[]> {
    const token = auth.getToken();
    
    const response = await fetch('http://192.168.137.1:8080/api/milestone', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch milestones');
    }

    return response.json();
  }

  return useQuery({
    queryKey: ['milestones'],
    queryFn: fetchMilestones,
  });
}