import { Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import { Context } from 'context/Context';
import BaseModal from './ui/BaseModal';

type DeleteModalProps = {
  shouldResetPos: boolean;
  modelType: string;
  modelName: string;
  url: string;
};

export default function DeleteModal({
  shouldResetPos,
  modelType,
  modelName,
  url,
}: DeleteModalProps) {
  const { setCurProgramPos } = useContext(Context);
  const [token, _setToken] = useLocalStorage('token', '');
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  function shouldResetCurProgramPos(shouldResetPos: boolean) {
    if (shouldResetPos) {
      setCurProgramPos(0);
      return;
    }
  }

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['programs']);
      shouldResetCurProgramPos(shouldResetPos);
      setShow(!show);
    },
  });

  function handleDelete() {
    mutate({
      method: 'delete',
      url,
      headers: {
        Authorization: token,
      },
    });
  }

  return (
    <>
      <Button className="mx-1" variant="danger" onClick={() => setShow(!show)}>
        {`Delete ${modelType}`}
      </Button>
      <BaseModal
        modalHeader={`Delete ${modelName}`}
        show={show}
        setShow={setShow}
        children={
          <>
            <span>Are you sure?</span>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => setShow(!show)}
                className="mx-1"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="mx-1"
                variant="primary"
                type="submit"
              >
                Confirm
              </Button>
            </div>
          </>
        }
      />
    </>
  );
}
