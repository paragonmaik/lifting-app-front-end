import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

type BaseToastProps = {
  message: string;
  setShow: (show: boolean) => void;
  show: boolean;
  delay: number;
};

export default function BaseToast({
  message,
  setShow,
  show,
  delay,
}: BaseToastProps) {
  return (
    <ToastContainer position="middle-center">
      <Toast onClose={() => setShow(false)} show={show} delay={delay} autohide>
        <Toast.Header>
          <strong className="me-auto">Registration</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
