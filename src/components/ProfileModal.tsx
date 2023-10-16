import BaseModal from './ui/BaseModal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useProfile from 'hooks/useProfile';
import { FormEvent, ReactNode, useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';

type ProfileModalProps = {
  profileBtn: string | ReactNode;
};

export default function ProfileModal({ profileBtn }: ProfileModalProps) {
  const { data: profile } = useProfile();
  const [token, _setToken] = useLocalStorage('token', '');
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      setShow(!show);
    },
  });

  const profileRequest = (data: {}) => {
    mutate({
      method: 'put',
      url: '/api/profile/edit',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  function handleProfileData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { height, weight } = e.target as typeof e.currentTarget;

    const data = {
      height: height.value,
      weight: weight.value,
    };

    profileRequest(data);
  }

  return (
    <>
      <MenuItem onClick={() => setShow(!show)}>{profileBtn}</MenuItem>
      <BaseModal
        modalHeader={'Update Profile'}
        show={show}
        setShow={setShow}
        children={
          <Form onSubmit={handleProfileData}>
            <Form.Group className="mb-3" controlId="height">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter height (in cm)"
                defaultValue={profile?.height}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight (in kg)"
                defaultValue={profile?.weight}
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
