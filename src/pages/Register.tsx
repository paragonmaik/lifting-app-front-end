import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseAuthForm from 'components/ui/BaseAuthForm';
import BaseToast from 'components/ui/BaseToast';
import Loading from 'components/ui/Loading';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(false);
      setInterval(() => {
        navigate(navigateLogin);
      }, 1500);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      setIsLoading(false);
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

    setIsLoading(true);
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
        delay={1300}
      />
      {isLoading ? <Loading /> : null}
    </>
  );
}
