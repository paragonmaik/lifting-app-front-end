import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';
import { FormEvent, useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';

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
      durationMins: durationWeeks.value,
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
          <Form onSubmit={handleAddProgram}>
            <Form.Group className="mb-3" controlId="programName">
              <Form.Label>Program Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Program description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="durationWeeks">
              <Form.Label>Program duration</Form.Label>
              <Form.Control
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
