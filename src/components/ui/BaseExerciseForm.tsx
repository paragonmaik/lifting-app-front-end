import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEvent } from 'react';
import { Goal } from 'types';

type ExerciseDTO = {
  id?: number;
  name: string;
  instructions: string;
  load: number;
  goal: Goal;
  restSeconds: number;
};

type ExerciseFormType = {
  exerciseDTO?: ExerciseDTO;
  handleExercise: (e: FormEvent<HTMLFormElement>) => void;
  setShow: (show: boolean) => void;
  show: boolean;
};

export default function BaseExerciseForm({
  handleExercise,
  setShow,
  show,
  exerciseDTO,
}: ExerciseFormType) {
  return (
    <Form onSubmit={handleExercise}>
      <Form.Group className="mb-3" controlId="exerciseName">
        <Form.Label>Exercise Name</Form.Label>
        <Form.Control
          defaultValue={exerciseDTO?.name}
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="instructions">
        <Form.Label>Exercise instructions</Form.Label>
        <Form.Control
          defaultValue={exerciseDTO?.instructions}
          type="text"
          placeholder="Enter instructions"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="load">
        <Form.Label>Exercise Load</Form.Label>
        <Form.Control
          defaultValue={exerciseDTO?.load}
          type="text"
          placeholder="Enter load (in kg)"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goal">
        <Form.Label>Exercise Goal</Form.Label>
        <Form.Control
          defaultValue={exerciseDTO?.goal}
          type="text"
          placeholder="Enter goal"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="restSeconds">
        <Form.Label>Exercise Rest Period</Form.Label>
        <Form.Control
          defaultValue={exerciseDTO?.restSeconds}
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
  );
}
