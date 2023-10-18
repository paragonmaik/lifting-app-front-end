import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosRequest } from 'utils/axiosRequest';
import BaseAuthForm from 'components/ui/BaseAuthForm';
import { Button } from 'react-bootstrap';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [_token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();
  const navigateHome = '/home';
  const navigateRegister = '/register';

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: (response) => {
      setToken(response.data.token);
      navigate(navigateHome);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      setErrorMessage(data.message);
      console.log(error);
    },
  });

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password1 } = e.target as typeof e.currentTarget;

    if (password1.value.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    mutate({
      method: 'post',
      url: '/api/auth/login',
      data: {
        login: email.value,
        password: password1.value,
        role: 0,
      },
    });
  }

  function handleDemoLogin() {
    mutate({
      method: 'post',
      url: '/api/auth/login',
      data: {
        login: import.meta.env.VITE_DEMO_USER,
        password: import.meta.env.VITE_DEMO_PASSWORD,
        role: 0,
      },
    });
  }

  return (
    <>
      <BaseAuthForm
        authType="login"
        handleSubmit={handleLogin}
        navigateUrl={navigateRegister}
        errorMessage={errorMessage}
      />
      <div className="mx-auto d-flex w-25">
        <hr className="w-50" />
        <h4>OR</h4>
        <hr className="w-50" />
      </div>
      <div className="my-4">
        <h3>Demo the App</h3>
        <Button onClick={handleDemoLogin}>Demo</Button>
      </div>
    </>
  );
}
