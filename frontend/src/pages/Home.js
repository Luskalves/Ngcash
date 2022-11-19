import backendApi from '../api/backendApi';
import appContext from '../context/context';
import React, { useEffect, useContext }  from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { balance, setBalance, setUsername } = useContext(appContext);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const { data } = await backendApi.post('/user', {
        token,
      });
      setBalance(data.balance);
      setUsername(data.username);
    } catch (err) {
      navigate('/');
    }
  }

  useEffect(() => {
    getUserInfo();
  })

  return (
    <div>
      <Header />
      <div>Saldo: {balance}</div>
    </div>
  )
}

export default Home;