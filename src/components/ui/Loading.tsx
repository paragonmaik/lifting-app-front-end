import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [isDelayed, setIsDelayed] = useState(false);
  const delayTimeInMs = 2000;
  function setDelayMessage() {
    setTimeout(() => {
      setIsDelayed(true);
    }, delayTimeInMs);
  }

  useEffect(() => {
    setDelayMessage();
  }, []);

  return (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {isDelayed ? (
        <div>Your request is taking unusually long. Please wait...</div>
      ) : null}
    </>
  );
}
