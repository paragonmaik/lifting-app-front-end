import { FormEvent, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import BaseWorkoutForm from './ui/BaseWorkoutForm';
import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';

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
          <BaseWorkoutForm
            handleWorkout={handleAddWorkout}
            setShow={setShow}
            show={show}
          />
        }
      />
    </>
  );
}
