import { useMutation } from '@tanstack/react-query';

interface SignupData {
  phone: string;
  name: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    phone: string;
  };
}

const signupUser = async (userData: SignupData): Promise<SignupResponse> => {
  const response = await fetch('http://192.168.137.1:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return {
    success: true,
    message: 'Registration successful!',
    token: data.jwt,
  };
};

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: signupUser,
    onError: (error) => {
      console.error('Signup error:', error);
    }
  });

  return {
    signup: mutation.mutate,
    signupAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};