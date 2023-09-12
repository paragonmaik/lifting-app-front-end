import { useLocalStorage } from 'hooks/useLocalStorage';
import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import BaseWorkoutForm from './ui/BaseWorkoutForm';
import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';

type WorkoutDTO = {
  id?: number;
  name: string;
  description: string;
  durationMins: number;
};

export default function EditWorkoutModal(workoutDTO: WorkoutDTO) {
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

  function handleEditWorkout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { workoutName, description, durationMins } =
      e.target as typeof e.currentTarget;

    const data = {
      id: workoutDTO.id,
      name: workoutName.value,
      description: description.value,
      durationMins: durationMins.value,
    };

    mutate({
      method: 'put',
      url: '/api/workouts',
      headers: {
        Authorization: token,
      },
      data,
    });
  }

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
          <BaseWorkoutForm
            handleWorkout={handleEditWorkout}
            setShow={setShow}
            show={show}
            workoutDTO={workoutDTO}
          />
        }
      />
    </>
  );
}
