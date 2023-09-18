import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import BaseAuthForm from 'components/ui/BaseAuthForm';
import Alert from 'react-bootstrap/Alert';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const navigateUrl = '/login';

  const validatePassword = (password1: string, password2: string): boolean => {
    if (password1.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return false;
    }
    if (password1 !== password2) {
      setErrorMessage('Passwords must match!');
      return false;
    }
    return true;
  };

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['programs']);
      navigate(navigateUrl);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      setErrorMessage(data.message);
    },
  });

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email, password1, password2 } = e.target as typeof e.currentTarget;
    const validatedPassword = validatePassword(
      password1.value,
      password2.value
    );

    if (!validatedPassword) {
      return;
    }

    mutate({
      method: 'post',
      url: '/api/auth/register',
      data: {
        login: email.value,
        password: password1.value,
        role: 0,
      },
    });
  }

  return (
    <div className="d-flex flex-column justify-content-center h-75">
      <h1>Create Account</h1>
      <div className="d-flex justify-content-center">
        <BaseAuthForm
          authType="register"
          handleSubmit={handleRegister}
          navigateUrl={navigateUrl}
        />
      </div>
      {errorMessage ? (
        <Alert className="my-3 mx-auto w-25" variant="danger">
          {errorMessage}
        </Alert>
      ) : null}
    </div>
  );
}
