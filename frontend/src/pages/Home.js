import backendApi from '../api/backendApi';
import appContext from '../context/context';
import React, { useEffect, useContext }  from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import DoTransaction from '../components/DoTransaction';

let BG_COLOR = "bg-green-700";

function Home() {
  const {
    balance,
    setBalance,
    setUsername
  } = useContext(appContext);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const { data } = await backendApi.post('/user', {
        token,
      });
      if (data.balance <= 0) BG_COLOR = "bg-red-600"
      else BG_COLOR = "bg-green-700";
      setBalance(data.balance);
      setUsername(data.username);
    } catch (err) {
      navigate('/');
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  return (
    <div>
      <Header />
      <div className="w-screen h-screen flex flex-col items-center pt-20 space-y-5">
        <div>
          <span className={`${BG_COLOR} rounded text-white p-2`}>Seu saldo: R${balance}</span>
        </div>
        <DoTransaction />
      </div>
    </div>
  )
}

export default Home;