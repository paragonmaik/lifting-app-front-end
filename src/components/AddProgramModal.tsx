import { FormEvent, useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import BaseModal from './ui/BaseModal';
import BaseProgramForm from './ui/BaseProgramForm';

export default function AddProgramModal() {
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

  function handleAddProgram(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { programName, description, durationWeeks } =
      e.target as typeof e.currentTarget;

    const data = {
      name: programName.value,
      description: description.value,
      durationWeeks: durationWeeks.value,
    };

    mutate({
      method: 'post',
      url: '/api/programs',
      headers: {
        Authorization: token,
      },
      data,
    });
  }

  return (
    <>
      <MenuItem onClick={() => setShow(!show)}>Add Program</MenuItem>
      <BaseModal
        modalHeader="Add Program"
        show={show}
        setShow={setShow}
        children={
          <BaseProgramForm
            handleProgram={handleAddProgram}
            setShow={setShow}
            show={show}
          />
        }
      />
    </>
  );
}
