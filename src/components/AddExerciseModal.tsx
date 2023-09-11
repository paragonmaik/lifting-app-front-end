import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from 'hooks/useLocalStorage';

export default function AddExerciseModal({ workoutId }: { workoutId: number }) {
  const [token, _setToken] = useLocalStorage('token', '');
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['programs']);
      setShow(!show);
    },
  });

  function handleAddExercise(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { exerciseName, instructions, load, goal, restSeconds } =
      e.target as typeof e.currentTarget;

    const data = {
      goal: (goal.value = 'STRENGTH'),
      name: exerciseName.value,
      instructinos: instructions.value,
      load: load.value,
      restSeconds: restSeconds.value,
    };

    mutate({
      method: 'post',
      url: `/api/exercises/${workoutId}`,
      headers: {
        Authorization: token,
      },
      data,
    });
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)}>
        Add Exercise
      </Button>
      <BaseModal
        modalHeader="Add Exercise"
        show={show}
        setShow={setShow}
        children={
          <Form onSubmit={handleAddExercise}>
            <Form.Group className="mb-3" controlId="exerciseName">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="instructions">
              <Form.Label>Exercise Instructions</Form.Label>
              <Form.Control type="text" placeholder="Enter instructions" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="load">
              <Form.Label>Exercise Load</Form.Label>
              <Form.Control type="number" placeholder="Enter load (in kg)" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="goal">
              {/* mudar tipo de input */}
              <Form.Label>Exercise Goal</Form.Label>
              <Form.Control type="text" placeholder="Enter goal" />
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
