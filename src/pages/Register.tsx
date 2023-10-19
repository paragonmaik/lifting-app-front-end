import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseAuthForm from 'components/ui/BaseAuthForm';
import BaseToast from 'components/ui/BaseToast';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const navigateLogin = '/login';

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
      setShow(true);
      setInterval(() => {
        navigate(navigateLogin);
      }, 3200);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      setErrorMessage(data.message);
    },
  });

  function handleRegister(e: FormEvent<HTMLFormElement>) {
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
    <>
      <BaseAuthForm
        authType="register"
        handleSubmit={handleRegister}
        navigateUrl={navigateLogin}
        errorMessage={errorMessage}
      />
      <BaseToast
        message="Registration was successful! You'll be redirected to the login page."
        setShow={setShow}
        show={show}
      />
    </>
  );
}
