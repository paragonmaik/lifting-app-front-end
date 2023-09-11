import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from 'utils/axiosRequest';
import { Program } from 'types';
import { useLocalStorage } from './useLocalStorage';

export default function useProgram() {
  const [token, _setToken] = useLocalStorage('token', '');
  return useQuery({
    queryKey: ['programs'],
    retry: 0,
    queryFn: async (): Promise<Program[]> => {
      const res = await axiosRequest({
        method: 'get',
        url: '/api/programs',
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    },
  });
}
