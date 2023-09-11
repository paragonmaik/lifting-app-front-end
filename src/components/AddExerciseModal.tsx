import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddExerciseModal() {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const createExerciseMutation = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['programs']);

      setShow(!show);
    },
  });

  function handleAddExercise(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { exerciseName, instructions, load, goal, restPeriod } =
      e.target as typeof e.currentTarget;

    goal.value = 'STRENGTH';
    exerciseName.value;
    instructions.value;
    load.value;
    restPeriod.value;

    createExerciseMutation.mutate({
      method: 'post',
      url: '/api/exercises/1',
      headers: {
        Authorization: '',
      },
      data: {
        name: exerciseName.value,
        instructions: instructions.value,
        load: load.value,
        goal: goal.value,
        restPeriod: restPeriod.value,
      },
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
            <Form.Group className="mb-3" controlId="restPeriod">
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
