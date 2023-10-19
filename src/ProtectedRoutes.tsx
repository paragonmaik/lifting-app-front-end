import { useLocalStorage } from 'hooks/useLocalStorage';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoutes() {
  const [token, _setToken] = useLocalStorage('token', '');

  return token ? <Outlet /> : <Navigate to={'/login'} />;
}
