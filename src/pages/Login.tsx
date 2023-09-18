import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosRequest } from 'utils/axiosRequest';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [_token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();
  const navigateHome = '/home';

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: (response) => {
      setToken(response.data.token);
      navigate(navigateHome);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      setErrorMessage(data.message);
    },
  });

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = e.target as typeof e.currentTarget;

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    mutate({
      method: 'post',
      url: '/api/auth/login',
      data: {
        login: email.value,
        password: password.value,
        role: 0,
      },
    });
  }

  return (
    <>
      <div>
        <div>
          <h4>Sign in</h4>
          <span>{errorMessage}</span>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                E-mail
                <input required type="email" id="email" />
              </label>
              <label>
                Password
                <input required type="password" id="password" />
              </label>
            </div>
            <div>
              <>
                <button>Login</button>
                <button type="button" onClick={() => navigate('/register')}>
                  Register a new account
                </button>
              </>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </>
  );
}
