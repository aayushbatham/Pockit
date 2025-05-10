import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth/hooks/use-auth';

interface AddTransactionPayload {
  phoneNumber: string;
  amount: number;
  spentCategory: string;
  methodeOfPayment: string;
  receiver: string;
}

export function useAddTransaction() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  async function addTransaction(payload: AddTransactionPayload) {
    const token = auth.getToken();
    
    const response = await fetch('http://192.168.137.1:8080/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to add transaction');
    }

    return response.json();
  }

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

// Usage example:
/*
const { mutate: addTransaction, isLoading, error } = useAddTransaction();

addTransaction({
  phoneNumber: "+1234567890",
  amount: 50.00,
  spentCategory: "Food",
  methodeOfPayment: "Credit Card",
  receiver: "Walmart"
});
*/