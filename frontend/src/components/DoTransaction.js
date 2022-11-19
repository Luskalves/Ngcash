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
      const response = await backendApi.patch('/transactions', {
        token,
        userDest,
        value: deposit,
      });
      console.log(response);
      navigate(0);
    } catch(err) {
      setErrMsg("Falha no deposito");
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
    <div>
      <label> Transferir para:
        <input
          type="submmit"
          name="userDest"
          placeholder="Nome Do Usuário"
          onChange={ (e) => handlerChange(e) }
        />
      </label>
      <label> Valor:
        <input
          type="number"
          name="depositValue"
          placeholder="Valor para transferir"
          onChange={ (e) => handlerChange(e) }
        />
      </label>
      <button
        onClick={() => doTransaction()}
      >Transferir</button>

      { errorMsg ?<span>{errorMsg}</span> : "" }
    </div>
  );
}

export default DoTransaction;