import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormEvent } from 'react';

type ProgramDTO = {
  id?: number;
  name: string;
  description: string;
  durationWeeks: number;
};

type ProgramFormType = {
  programDTO?: ProgramDTO;
  handleProgram: (e: FormEvent<HTMLFormElement>) => void;
  setShow: (show: boolean) => void;
  show: boolean;
};

export default function BaseProgramForm({
  handleProgram,
  setShow,
  show,
  programDTO,
}: ProgramFormType) {
  return (
    <Form onSubmit={handleProgram}>
      <Form.Group className="mb-3" controlId="programName">
        <Form.Label>Program Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          defaultValue={programDTO?.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Program description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          defaultValue={programDTO?.description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="durationWeeks">
        <Form.Label>Program duration</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter duration (in weeks)"
          defaultValue={programDTO?.durationWeeks}
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
  );
}
