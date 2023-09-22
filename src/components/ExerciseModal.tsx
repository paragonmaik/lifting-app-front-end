import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { FormEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ExerciseDTO } from 'types';
import { axiosRequest } from 'utils/axiosRequest';
import BaseModal from './ui/BaseModal';
import BaseExerciseForm from './ui/BaseExerciseForm';

type ExerciseModalProps = {
  workoutId?: number;
  exerciseDTO?: ExerciseDTO;
  isAdd: boolean;
};

export default function ExerciseModal({
  workoutId,
  isAdd,
  exerciseDTO,
}: ExerciseModalProps) {
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

  const exerciseRequest = (data: {}) => {
    mutate({
      method: isAdd ? 'post' : 'put',
      url: isAdd ? `/api/exercises/${workoutId}` : '/api/exercises',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  function handleExercise(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { exerciseName, instructions, load, goal, restSeconds, sets, reps } =
      e.target as typeof e.currentTarget;

    const data = {
      id: exerciseDTO?.id,
      goal: goal.value,
      name: exerciseName.value,
      instructions: instructions.value,
      load: load.value,
      restSeconds: restSeconds.value,
      sets: sets.value,
      reps: reps.value,
    };

    exerciseRequest(data);
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)}>
        {`${isAdd ? 'Add' : 'Edit'} Exercise`}
      </Button>
      <BaseModal
        modalHeader={`${isAdd ? 'Add' : 'Edit'} Exercise`}
        show={show}
        setShow={setShow}
        children={
          <BaseExerciseForm
            handleExercise={handleExercise}
            setShow={setShow}
            show={show}
            exerciseDTO={isAdd ? undefined : exerciseDTO}
          />
        }
      />
    </>
  );
}
