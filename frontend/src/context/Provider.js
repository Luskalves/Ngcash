import appContext from './context';
import React, { useState } from 'react';

function Provider({ children }) {

  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const values = {
    username,
    setUsername,
    balance,
    setBalance,
    deposit,
    setDeposit
  };

  return (
    <appContext.Provider value={ values }>
      { children }
    </appContext.Provider>  
  );
}

export default Provider;