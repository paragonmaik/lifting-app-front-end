import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormEvent } from 'react';

type WorkoutDTO = {
  id?: number;
  name: string;
  description: string;
  durationMins: number;
};

type WorkoutFormType = {
  workoutDTO?: WorkoutDTO;
  handleWorkout: (e: FormEvent<HTMLFormElement>) => void;
  setShow: (show: boolean) => void;
  show: boolean;
};

export default function BaseWorkoutForm({
  handleWorkout,
  setShow,
  show,
  workoutDTO,
}: WorkoutFormType) {
  return (
    <Form onSubmit={handleWorkout}>
      <Form.Group className="mb-3" controlId="workoutName">
        <Form.Label>Workout Name</Form.Label>
        <Form.Control
          defaultValue={workoutDTO?.name}
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Workout description</Form.Label>
        <Form.Control
          defaultValue={workoutDTO?.description}
          type="text"
          placeholder="Enter description"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="durationMins">
        <Form.Label>Workout duration</Form.Label>
        <Form.Control
          defaultValue={workoutDTO?.durationMins}
          type="number"
          placeholder="Enter estimated duration (in Mins)"
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
