import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';
import { useState } from 'react';

export default function AddWorkoutModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)}>
        Add Workout
      </Button>
      <BaseModal
        modalHeader="Add Workout"
        show={show}
        setShow={setShow}
        children={
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Workout description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Workout duration</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter duration (in minutes)"
              />
            </Form.Group>
            <br />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => setShow(!show)}
                className="mx-1"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button className="mx-1" variant="primary" type="submit">
                Confirm
              </Button>
            </div>
          </Form>
        }
      />
    </>
  );
}
