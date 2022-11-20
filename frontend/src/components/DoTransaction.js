import backendApi from '../api/backendApi';
import appContext from '../context/context';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';



function DoTransaction() {
  const { deposit, setDeposit } = useContext(appContext);
  const [userDest, setUserDest] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  const doTransaction = async () => {
    try {
      await backendApi.patch('/transactions', {
        token,
        userDest,
        value: deposit,
      });
      navigate(0);
    } catch(err) {
      setErrMsg("Falha na transferência");
    }
  }

  const handlerChange = ({ target: { name ,value }}) => {
    if (name === "userDest") {
      setUserDest(value);
    }
    console.log(userDest)
    if (name === "depositValue") {
      setDeposit(value);
      console.log(deposit);
    }
  }

  return (
    <div className="login-input p-2 space-y-4 bg-slate-300 rounded shadow-xl shadow-slate-250 items-center space">
      <input
          className="rounded p-1"
          type="submmit"
          name="userDest"
          placeholder="Nome Do Usuário"
          onChange={ (e) => handlerChange(e) }
        />
      <input
          className="rounded p-1"
          type="number"
          name="depositValue"
          min="0"
          placeholder="Valor para transferir"
          onChange={ (e) => handlerChange(e) }
        />
      <button
        className="rounded p-1 bg-black hover:underline text-white hover:underline hover:bg-white hover:text-black"
        onClick={() => doTransaction()}
      >Transferir</button>

      { errorMsg ? <span className="text-red-600">{errorMsg}</span> : "" }
    </div>
  );
}

export default DoTransaction;