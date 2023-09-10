import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import { useState } from 'react';
import { Goal } from 'types';

type ExerciseDTO = {
  id?: number;
  name: string;
  instructions: string;
  load: number;
  goal: Goal;
  restSeconds: number;
};

export default function EditExerciseModal({
  id,
  name,
  instructions,
  load,
  goal,
  restSeconds,
}: ExerciseDTO) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)}>
        Edit Exercise
      </Button>
      <BaseModal
        modalHeader="Edit Exercise"
        show={show}
        setShow={setShow}
        children={
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                defaultValue={name}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Exercise instructions</Form.Label>
              <Form.Control
                defaultValue={instructions}
                type="text"
                placeholder="Enter instructions"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Exercise Load</Form.Label>
              <Form.Control
                defaultValue={load}
                type="text"
                placeholder="Enter load (in kg)"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Exercise Goal</Form.Label>
              <Form.Control
                defaultValue={goal}
                type="text"
                placeholder="Enter goal"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Exercise Rest Period</Form.Label>
              <Form.Control
                defaultValue={restSeconds}
                type="number"
                placeholder="Enter rest period (in seconds)"
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
