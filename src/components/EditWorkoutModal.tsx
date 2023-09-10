import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';

type WorkoutDTO = {
  id?: number;
  name: string;
  description: string;
  durationMins: number;
};

export default function EditWorkoutModal({
  id,
  name,
  description,
  durationMins,
}: WorkoutDTO) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)}>
        Edit Workout
      </Button>
      <BaseModal
        modalHeader="Edit Workout"
        show={show}
        setShow={setShow}
        children={
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                defaultValue={name}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aa">
              <Form.Label>Workout description</Form.Label>
              <Form.Control
                defaultValue={description}
                type="text"
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Workout duration</Form.Label>
              <Form.Control
                defaultValue={durationMins}
                type="number"
                placeholder="Enter duration (in Mins)"
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
