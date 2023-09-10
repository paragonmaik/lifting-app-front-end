import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BaseModal from './ui/BaseModal';
import { useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';

export default function AddProgramModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <MenuItem onClick={() => setShow(!show)}>Add Program</MenuItem>
      <BaseModal
        modalHeader="Add Program"
        show={show}
        setShow={setShow}
        children={
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Program Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Program description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
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
