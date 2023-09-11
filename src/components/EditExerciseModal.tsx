import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import { FormEvent, useState } from 'react';
import { Goal } from 'types';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';

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

  function handleEditExercise(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { exerciseName, instructions, load, goal, restSeconds } =
      e.target as typeof e.currentTarget;

    const data = {
      id,
      goal: goal.value,
      name: exerciseName.value,
      instructinos: instructions.value,
      load: load.value,
      restSeconds: restSeconds.value,
    };

    mutate({
      method: 'put',
      url: '/api/exercises',
      headers: {
        Authorization: token,
      },
      data,
    });
  }

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
          <Form onSubmit={handleEditExercise}>
            <Form.Group className="mb-3" controlId="exerciseName">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                defaultValue={name}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="instructions">
              <Form.Label>Exercise instructions</Form.Label>
              <Form.Control
                defaultValue={instructions}
                type="text"
                placeholder="Enter instructions"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="load">
              <Form.Label>Exercise Load</Form.Label>
              <Form.Control
                defaultValue={load}
                type="text"
                placeholder="Enter load (in kg)"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="goal">
              <Form.Label>Exercise Goal</Form.Label>
              <Form.Control
                defaultValue={goal}
                type="text"
                placeholder="Enter goal"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="restSeconds">
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
