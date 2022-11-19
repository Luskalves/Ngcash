import React, { useContext } from 'react';
import appContext from '../context/context';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { username } = useContext(appContext);
  
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", JSON.stringify(""));
    navigate("/");
  }

  return (
    <div>
      <header>
        <h1>Ngcash</h1>
        <button
          onClick={ () => navigate('/home')}
        >
          Home
        </button>
        <button
          onClick={ () => navigate('/transactions')}
        >Suas Transações</button>

        <div>{ username }</div>
        <button
          onClick={ () => logOut() }
        >Logout</button>
      </header>
    </div>
  )
}

export default Header;