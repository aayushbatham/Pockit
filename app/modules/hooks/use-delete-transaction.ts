import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth/hooks/use-auth';

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  async function deleteTransaction(id: string) {
    const token = auth.getToken();
    
    const response = await fetch(`http://192.168.137.1:8080/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }

    return response.json();
  }

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}