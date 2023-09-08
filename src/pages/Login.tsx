import { AxiosError, HttpStatusCode } from 'axios';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { axiosRequest } from 'utils/axiosRequest';

async function handleLogin(
  e: FormEvent<HTMLFormElement>,
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
  setToken: Function,
  navigate: NavigateFunction
) {
  e.preventDefault();
  const { email, password } = e.target as typeof e.currentTarget;

  if (password.length < 8) {
    setErrorMessage('Password must be at least 8 characters long');
    return;
  }

  try {
    const { status, data } = await axiosRequest({
      method: 'post',
      url: '/api/auth/login',
      data: {
        login: email.value,
        password: password.value,
      },
    });

    if (status === HttpStatusCode.Ok) {
      console.log(data.token);
      setToken(data.token);
      navigate('/home');
    }
  } catch (error) {
    const res = error as AxiosError;
    const data: any = res.response?.data;
    if (!data) return;

    setErrorMessage(data.message);
  }
}

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [_token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div>
          <h4>Sign in</h4>
          <span>{errorMessage}</span>
          <form
            onSubmit={(e) =>
              handleLogin(e, setErrorMessage, setToken, navigate)
            }
          >
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
