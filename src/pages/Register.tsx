import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { NavigateFunction, useNavigate } from 'react-router';
import { AxiosError, HttpStatusCode } from 'axios';

const validatePassword = (
  password1: string,
  password2: string
): string | void => {
  if (password1.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (password1 !== password2) {
    return 'Passwords must match!';
  }
};

async function handleRegister(
  e: FormEvent<HTMLFormElement>,
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
  navigate: NavigateFunction
) {
  e.preventDefault();
  const { email, password1, password2 } = e.target as typeof e.currentTarget;
  const validatedPassword = validatePassword(password1.value, password2.value);

  if (validatedPassword) {
    setErrorMessage(validatedPassword);
    return;
  }

  try {
    const { status } = await axiosRequest({
      method: 'post',
      url: '/api/auth/register',
      data: {
        login: email.value,
        password: password1.value,
        role: 0,
      },
    });

    if (status === HttpStatusCode.Ok) {
      navigate('/login');
    }
  } catch (error) {
    const res = error as AxiosError;
    const data: any = res.response?.data;
    if (!data) return;

    setErrorMessage(data.message);
  }
}

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div>
          <h4>Register</h4>
          <span>{errorMessage}</span>
          <form onSubmit={(e) => handleRegister(e, setErrorMessage, navigate)}>
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
              <>
                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/login')}>
                  I already have an account
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
