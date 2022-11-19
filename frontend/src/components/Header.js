import appContext from '../context/context';
import React, { useContext } from 'react';

function Header() {
  const { username } = useContext(appContext);

  return (
    <div>
      <header>
        <h1>Ngcash</h1>
        <div>{ username }</div>
      </header>
    </div>
  )
}

export default Header;