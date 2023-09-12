import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';

type ProgramDTO = {
  id?: number;
  name: string;
  description: string;
  durationWeeks: number;
};

export default function EditProgramModal({
  id,
  name,
  description,
  durationWeeks,
}: ProgramDTO) {
  const [token, _setToken] = useLocalStorage('token', '');
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  console.log(id);
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
      id,
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
          <Form onSubmit={handleEditProgram}>
            <Form.Group className="mb-3" controlId="programName">
              <Form.Label>Program Name</Form.Label>
              <Form.Control
                defaultValue={name}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Program description</Form.Label>
              <Form.Control
                defaultValue={description}
                type="text"
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="durationWeeks">
              <Form.Label>Program duration</Form.Label>
              <Form.Control
                defaultValue={durationWeeks}
                type="number"
                placeholder="Enter duration (in weeks)"
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
