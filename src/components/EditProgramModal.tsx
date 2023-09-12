import Button from 'react-bootstrap/Button';
import BaseModal from './ui/BaseModal';
import { FormEvent, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import BaseProgramForm from './ui/BaseProgramForm';

type ProgramDTO = {
  id: number;
  name: string;
  description: string;
  durationWeeks: number;
};

export default function EditProgramModal(programDTO: ProgramDTO) {
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

  function handleEditProgram(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { programName, description, durationWeeks } =
      e.target as typeof e.currentTarget;

    const data = {
      id: programDTO.id,
      name: programName.value,
      description: description.value,
      durationWeeks: durationWeeks.value,
    };

    mutate({
      method: 'put',
      url: '/api/programs',
      headers: {
        Authorization: token,
      },
      data,
    });
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)}>
        Edit Program
      </Button>
      <BaseModal
        modalHeader="Edit Program"
        show={show}
        setShow={setShow}
        children={
          <BaseProgramForm
            handleProgram={handleEditProgram}
            setShow={setShow}
            show={show}
            programDTO={programDTO}
          />
        }
      />
    </>
  );
}
