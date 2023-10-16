import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import { useLocalStorage } from './useLocalStorage';
import { ProfileDTO } from 'types';

export default function useProfile() {
  const [token, _setToken] = useLocalStorage('token', '');
  return useQuery({
    queryKey: ['profile'],
    retry: 0,
    queryFn: async (): Promise<ProfileDTO> => {
      const res = await axiosRequest({
        method: 'get',
        url: '/api/profile',
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    },
  });
}
