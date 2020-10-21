import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useAuth } from '../contexts/auth';
import api from '../services/api';

import ApresentationSidebar from '../components/AuthSidebar';

import '../styles/pages/login.css';

const Login: React.FC = () => {
  const { loggedIn, login } = useAuth();
  const { goBack, push } = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log("loggedIn:", loggedIn);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    login(email, password);

    /*const data = {
      email,
      password
    }

    try {
      const response = await api.post('sessions', data);

      console.log(response)

      if (response.data.token === undefined) {
        alert(response.data.message);
      } else {
        //TODO: Use cookies instead https://dev.to/gkoniaris/how-to-securely-store-jwt-tokens-51cf
        localStorage.setItem('@Happy/id', response.data.representative.id.toString())
        localStorage.setItem('@Happy/name', response.data.representative.name)
        localStorage.setItem('@Happy/token', response.data.token)

        push('/app');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }*/


  }

  const token = localStorage.getItem('@Happy/token');

  if (token) {
    //push('/dashboard');
    push('/app');
  }

  return (
    <div className="login-page">
      <ApresentationSidebar />

      <main>
        <button
          className="back-button"
          type="button"
          onClick={goBack}
        >
          <FiArrowLeft size={24} color="#15C3D6" />
        </button>

        <form onSubmit={handleSubmit} className="login-form">
          <fieldset>
            <legend>Fazer login</legend>

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>

          </fieldset>

          <button
            className="confirm-button"
            type="submit"
            disabled={email && password ? false : true}
          >
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;