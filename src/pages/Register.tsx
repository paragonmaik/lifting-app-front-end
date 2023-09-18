import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      navigate('/login');
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
    <div>
      <div>
        <h4>Register</h4>
        <span>{errorMessage}</span>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              E-mail
              <input required type="email" id="email" />
            </label>
            <label>
              Password
              <input required type="password" id="password1" />
            </label>
            <label>
              Re-enter Password
              <input required type="password" id="password2" />
            </label>
          </div>
          <div>
            <button type="submit">Register</button>
            <button type="button" onClick={() => navigate('/login')}>
              I already have an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
