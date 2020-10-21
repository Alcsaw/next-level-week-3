import api from './api';

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

export async function login(email: string, password: string): Promise<Response> {
  console.log('consulting API');

  const response = await api.post('/sessions', {
    email,
    password
  });
  console.log(response.data);

  const user = response.data;
  return user;
};
