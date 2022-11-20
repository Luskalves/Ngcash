import React, { useState } from 'react';
import backendApi from '../api/backendApi';
import Header from '../components/Header';

function Deposit() {
  const [deposit, setDeposit] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const doDeposit = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await backendApi.patch('/user/deposit', {
        token,
        value: Number(deposit),
      });
      setSuccess(true)
    } catch (err) {
      setSuccess(false);
      setErrMsg("Falha no deposito");
    }
  }

  return(
    <div>
      <Header />
      <div className="w-screen h-screen flex flex-col items-center pt-20 space-y-2">
        <label className="bg-black text-white underline p-2 rounded">Deposite um valor:</label>
        <div className="flex flex-col p-2 rounded bg-slate-300 space-y-4 shadow-xl shadow-slate-300">
          <input
            className="rounded p-1"
            type="number"
            min="0"
            placeholder="Digite um valor"
            onChange={ ({ target: { value } }) => setDeposit(value)}
          />
          <button
            className="p-1 rounded bg-white hover:bg-green-500"
            onClick={() => doDeposit()}
          >Depositar</button>
        { success ? 
          <span className="text-center text-green-500">Depositado com sucesso</span> 
            : <span className="text-center text-red-600">{errMsg}</span> }
        </div>
      </div>
    </div>
  )
}

export default Deposit;