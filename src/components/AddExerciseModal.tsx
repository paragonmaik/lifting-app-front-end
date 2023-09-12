import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import BaseExerciseForm from './ui/BaseExerciseForm';
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
          <BaseExerciseForm
            handleExercise={handleAddExercise}
            setShow={setShow}
            show={show}
          />
        }
      />
    </>
  );
}
