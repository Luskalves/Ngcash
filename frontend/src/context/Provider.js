import appContext from './context';
import React, { useState } from 'react';

function Provider({ children }) {

  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);

  const values = {
    username,
    setUsername,
    balance,
    setBalance
  };

  return (
    <appContext.Provider value={ values }>
      { children }
    </appContext.Provider>  
  );
}

export default Provider;