import Modal from 'react-bootstrap/Modal';

type ModalProps = {
  modalHeader: string;
  setShow: (show: boolean) => void;
  show: boolean;
  children?: JSX.Element[] | JSX.Element;
};

export default function BaseModal({
  modalHeader,
  show,
  setShow,
  children,
}: ModalProps) {
  return (
    <>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
