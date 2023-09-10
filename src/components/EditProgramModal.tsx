import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';

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
  const [show, setShow] = useState(false);

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
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Program Name</Form.Label>
              <Form.Control
                defaultValue={name}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aa">
              <Form.Label>Program description</Form.Label>
              <Form.Control
                defaultValue={description}
                type="text"
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
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
