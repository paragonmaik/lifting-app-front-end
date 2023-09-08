import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export type RequestBody = {
  url: string;
  method: 'get' | 'post' | 'patch' | 'put' | 'delete';
  data?: object;
  headers?: object;
};

export const axiosRequest = async (params: RequestBody) => {
  const response = await axios(params);

  return response;
};
