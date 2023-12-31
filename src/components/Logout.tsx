import { useLocalStorage } from 'hooks/useLocalStorage';
import { ReactNode } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

type LogoutProps = {
  logoutBtn: string | ReactNode;
};

export default function Logout({ logoutBtn }: LogoutProps) {
  const [_token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();
  const navigateLogin = '/login';

  function handleLogout() {
    setToken('');
    navigate(navigateLogin);
  }

  return (
    <>
      <MenuItem onClick={handleLogout}>{logoutBtn}</MenuItem>
    </>
  );
}
