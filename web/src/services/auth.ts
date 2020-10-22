import api from './api';

interface Response {
  token: string;
  representative: {
    id: number;
    name: string;
    email: string;
  };
};

export async function login(email: string, password: string): Promise<Response> {
  const response = await api.post('/sessions', {
    email,
    password
  });

  const representative = response.data;
  return representative;
};
