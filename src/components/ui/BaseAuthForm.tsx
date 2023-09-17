import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEvent } from 'react';

export default function BaseAuthForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exerciseName">
        <Form.Label>Exercise Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="instructions">
        <Form.Label>Exercise instructions</Form.Label>
        <Form.Control type="text" placeholder="Enter instructions" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="load">
        <Form.Label>Exercise Load</Form.Label>
        <Form.Control type="text" placeholder="Enter load (in kg)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goal">
        <Form.Label>Exercise Goal</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="restSeconds">
        <Form.Label>Exercise Rest Period</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter rest period (in seconds)"
        />
      </Form.Group>
      <br />
      <div className="d-flex justify-content-end">
        <Button className="mx-1" variant="secondary">
          Cancel
        </Button>
        <Button className="mx-1" variant="primary" type="submit">
          Confirm
        </Button>
      </div>
    </Form>
  );
}
