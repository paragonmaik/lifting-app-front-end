import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthType = 'register' | 'login';

type BaseAuthFormProps = {
  authType: AuthType;
  navigateUrl: string;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function BaseAuthForm({
  authType,
  navigateUrl,
  handleSubmit,
}: BaseAuthFormProps) {
  const navigate = useNavigate();

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      {authType === 'register' ? (
        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type="password" />
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
    </Form>
  );
}
