import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

type AuthType = 'register' | 'login';

type BaseAuthFormProps = {
  authType: AuthType;
  navigateUrl: string;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  errorMessage: string | undefined;
};

export default function BaseAuthForm({
  authType,
  navigateUrl,
  handleSubmit,
  errorMessage,
}: BaseAuthFormProps) {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center h-50">
      <h1>{authType === 'register' ? 'Create Account' : 'Sign in'}</h1>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Form.Control required type="email" placeholder="Email" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password1">
            <FloatingLabel
              controlId="password1"
              label="Password"
              className="mb-3"
            >
              <Form.Control required type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>
          {authType === 'register' ? (
            <Form.Group className="mb-3" controlId="password2">
              <FloatingLabel
                controlId="password2"
                label="Re-enter Password"
                className="mb-3"
              >
                <Form.Control
                  required
                  type="password"
                  placeholder="Re-enter Password"
                />
              </FloatingLabel>
            </Form.Group>
          ) : null}
          <br />
          <div className="d-flex justify-content-end">
            <Button className="mx-1" variant="primary" type="submit">
              {authType === 'register' ? 'Register' : 'Login'}
            </Button>
            <Button
              onClick={() => navigate(navigateUrl)}
              className="mx-1"
              variant="secondary"
              type="button"
            >
              {authType === 'register'
                ? 'I already have an account'
                : 'Register a new account'}
            </Button>
          </div>
          <div>
            {errorMessage ? (
              <Alert className="my-3" variant="danger">
                {errorMessage}
              </Alert>
            ) : null}
          </div>
        </Form>
      </div>
    </div>
  );
}
