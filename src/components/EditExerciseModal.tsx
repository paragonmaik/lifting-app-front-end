import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import BaseExerciseForm from './ui/BaseExerciseForm';
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

export default function EditExerciseModal(exerciseDTO: ExerciseDTO) {
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
      id: exerciseDTO.id,
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
          <BaseExerciseForm
            handleExercise={handleEditExercise}
            setShow={setShow}
            show={show}
            exerciseDTO={exerciseDTO}
          />
        }
      />
    </>
  );
}
