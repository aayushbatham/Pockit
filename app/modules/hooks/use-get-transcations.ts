import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/hooks/use-auth';

interface Transaction {
  id: string;
  phoneNumber: string;
  amount: number;
  spentCategory: string;
  methodeOfPayment: string;
  receiver: string;
  createdAt: string;
}

async function fetchTransactions(): Promise<Transaction[]> {
  const auth = useAuth();
  const token = await auth.getToken();

  const response = await fetch('http://localhost:8080/api/transactions', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
}

export function useGetTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
    refetchOnWindowFocus: true,
  });
}

// Usage example:
/*
const { data: transactions, isLoading, error } = useGetTransactions();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;

return (
  <View>
    {transactions.map(transaction => (
      <TransactionItem key={transaction.id} transaction={transaction} />
    ))}
  </View>
);
*/