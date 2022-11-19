import backendApi from '../api/backendApi';
import appContext from '../context/context';
import React, { useContext, useState }  from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { username, setUsername } = useContext(appContext);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const callApi = async () => {
    try {
      const response = await backendApi.post('/login', {
        username,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("token", JSON.stringify(token));
      
      navigate('/home')
    } catch (err) {
      console.error(err);
    }
  }

  const handlerChange = ({ target: { name ,value }}) => {
    if (name === "username") {
      setUsername(value)
    }
    if (name === "password") {
      setPassword(value)
    }
  }
  return (
    <div>
      <h2> Faça seu login </h2>
      <div>
        <label>Nome de usuário: 
            <input
              type="submmit"
              placeholder="Nome de usuário"
              name="username"
              onChange={ (e) => handlerChange(e) }
            />
          </label>

          <label> Senha:
            <input
              type="password"
              placeholder="senha"
              name="password"
              onChange={ (e) => handlerChange(e) }
            />
          </label>

          <button
            onClick={ () => callApi() }
          >
            clique aqui para ser feliz
          </button>
          <button
            onClick={ () => navigate("/register") }
          >
            registrar
          </button>
      </div>
    </div>
  )
}

export default Login;