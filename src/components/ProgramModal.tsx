import { FormEvent, useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import BaseModal from './ui/BaseModal';
import BaseProgramForm from './ui/BaseProgramForm';
import Button from 'react-bootstrap/esm/Button';

type ProgramDTO = {
  id: number;
  name: string;
  description: string;
  durationWeeks: number;
};

type ProgramModalProps = {
  programDTO?: ProgramDTO;
  isAdd: boolean;
};

export default function ProgramModal({ isAdd, programDTO }: ProgramModalProps) {
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

  const programRequest = (data: {}) => {
    mutate({
      method: isAdd ? 'post' : 'put',
      url: '/api/programs',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  function handleProgramData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { programName, description, durationWeeks } =
      e.target as typeof e.currentTarget;

    const data = {
      id: programDTO?.id,
      name: programName.value,
      description: description.value,
      durationWeeks: durationWeeks.value,
    };

    programRequest(data);
  }

  return (
    <>
      {isAdd ? (
        <MenuItem onClick={() => setShow(!show)}>Add Program</MenuItem>
      ) : (
        <Button variant="primary" onClick={() => setShow(!show)}>
          Edit Program
        </Button>
      )}
      <BaseModal
        modalHeader={`${isAdd ? 'Add' : 'Edit'} Program`}
        show={show}
        setShow={setShow}
        children={
          <BaseProgramForm
            handleProgram={handleProgramData}
            setShow={setShow}
            show={show}
            programDTO={isAdd ? undefined : programDTO}
          />
        }
      />
    </>
  );
}
