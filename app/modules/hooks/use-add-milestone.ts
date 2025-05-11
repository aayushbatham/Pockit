import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth/hooks/use-auth';

interface AddMilestonePayload {
  savedAmount: number;
  goalAmount: number;
  duration: string;
}

export function useAddMilestone() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  async function addMilestone(payload: AddMilestonePayload) {
    const token = auth.getToken();
    
    const response = await fetch('http://192.168.137.1:8080/api/milestone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to add milestone');
    }

    return response.json();
  }

  return useMutation({
    mutationFn: addMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });
}

// Usage example:
/*
const { mutate: addMilestone, isLoading, error } = useAddMilestone();

addMilestone({
  savedAmount: 5000,
  goalAmount: 10000,
  duration: "2 months"
});
*/