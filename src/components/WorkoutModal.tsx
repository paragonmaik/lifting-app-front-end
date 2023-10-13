import BaseModal from './ui/BaseModal';
import BaseWorkoutForm from './ui/BaseWorkoutForm';
import editIcon from '../../public/edit-3-svgrepo-com.svg';
import addIcon from '../../public/add-circle-svgrepo-com.svg';
import InnerButton from './ui/InnerButton';
import Button from 'react-bootstrap/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { FormEvent, useState } from 'react';
import { axiosRequest } from 'utils/axiosRequest';

type WorkoutDTO = {
  id?: number;
  name: string;
  description: string;
  durationMins: number;
};

type WorkoutModalProps = {
  programId?: number;
  workoutDTO?: WorkoutDTO;
  isAdd: boolean;
};

export default function WorkoutModal({
  programId,
  isAdd,
  workoutDTO,
}: WorkoutModalProps) {
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

  const workoutRequest = (data: {}) => {
    mutate({
      method: isAdd ? 'post' : 'put',
      url: isAdd ? `/api/workouts/${programId}` : '/api/workouts',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  function handleWorkout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { workoutName, description, durationMins } =
      e.target as typeof e.currentTarget;

    const data = {
      id: workoutDTO?.id,
      name: workoutName.value,
      description: description.value,
      durationMins: durationMins.value,
    };

    workoutRequest(data);
  }

  return (
    <>
      {
        <Button variant="primary" onClick={() => setShow(!show)}>
          {isAdd ? (
            <InnerButton icon={addIcon} text="Add Workout" />
          ) : (
            <InnerButton icon={editIcon} text="Edit Workout" />
          )}
        </Button>
      }
      <BaseModal
        modalHeader={`${isAdd ? 'Add' : 'Edit'} Workout`}
        show={show}
        setShow={setShow}
        children={
          <BaseWorkoutForm
            handleWorkout={handleWorkout}
            setShow={setShow}
            show={show}
            workoutDTO={isAdd ? undefined : workoutDTO}
          />
        }
      />
    </>
  );
}
