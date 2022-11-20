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
      <header class="flex justify-between px-5 py-5 bg-black text-white">
        <div className="">
          <h1 class="underline text-3xl italic">Ngcash</h1>
        </div>
        <div className="flex space-x-2">
          <button
            className="rounded p-1 hover:underline hover:bg-white hover:text-black"
            onClick={ () => navigate('/home')}
          >
            Home
          </button>
          <button
            className="rounded p-1 hover:underline hover:bg-white hover:text-black"
            onClick={ () => navigate('/deposit')}
          >
            Depositar
          </button>
          <button
            className="rounded p-1 hover:underline hover:bg-white hover:text-black"
            onClick={ () => navigate('/transactions')}
          >
            Suas Transações
          </button>
        </div>

        <div className="space-x-2">
          <span className="p-1"> { username } </span>
          <button
            className="p-1 rounded hover:underline hover:bg-white hover:text-black"
            onClick={ () => logOut() }
          >Logout</button>
        </div>
      </header>
    </div>
  )
}

export default Header;