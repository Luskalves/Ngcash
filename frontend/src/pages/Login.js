import backendApi from '../api/backendApi';
import appContext from '../context/context';
import React, { useContext, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import GenericHeader from '../components/GenericHeader';

function Login() {
  const { username, setUsername } = useContext(appContext);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");

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
      const { response: { data: { error } } } = err;
      setErrMsg(error);
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
      <GenericHeader />
      <div className="login-screen">
        <h2 className="login-title"> Faça seu login </h2>
        <div className="space-y-5 shadow-xl shadow-slate-250 p-1 text-center">
          <div className="login-input">
            <input
            className="login-input-style"
              type="submmit"
              placeholder="Nome de usuário"
              name="username"
              onChange={ (e) => handlerChange(e) }
            />

            <input
              className="login-input-style"
              type="password"
              placeholder="senha"
              name="password"
              onChange={ (e) => handlerChange(e) }
            />
          </div>

          <div className="space-x-5 flex px-10 justify-between">
            <button
              className="bg-slate-300 hover:bg-black hover:text-white p-1 rounded"
              onClick={ () => callApi() }
            >
              Fazer Login
            </button>
            <button
              className="bg-slate-300 hover:bg-black hover:text-white p-1 rounded"
              onClick={ () => navigate("/register") }
            >
              Registrar
            </button>
          </div>
          { errorMsg ? <span className="text-red-600">{errorMsg}</span> : "" }
        </div>
      </div>
    </div>
  )
}

export default Login;