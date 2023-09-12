import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';
import { FormEvent, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';

export default function AddWorkoutModal({ programId }: { programId: number }) {
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

  function handleAddWorkout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { workoutName, description, durationMins } =
      e.target as typeof e.currentTarget;

    const data = {
      name: workoutName.value,
      description: description.value,
      durationMins: durationMins.value,
    };

    mutate({
      method: 'post',
      url: `/api/workouts/${programId}`,
      headers: {
        Authorization: token,
      },
      data,
    });
  }
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
          <Form onSubmit={handleAddWorkout}>
            <Form.Group className="mb-3" controlId="workoutName">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Workout description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="durationMins">
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
