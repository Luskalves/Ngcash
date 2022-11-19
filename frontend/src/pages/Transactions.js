import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import backendApi from '../api/backendApi';
import { useNavigate } from 'react-router-dom';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [date, setDate] = useState("");
  const [debited, setDebited] = useState(false);
  const [credited, setCredited] = useState(false);
  const [filterOp, setFilterOp] = useState("");

  
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate()

  const getAllTransactions = async () => {
    try {
      const { data } = await backendApi.post('/transactions', {
        token,
      });
      console.log(data);
      setTransactions(data);
    } catch (err) {
      setErrMsg(err.msg);
    }
  }

  const renderTransac = () => {
    const result = transactions.map((item, idx) => (
      <table key={idx}>
        <tr>
        <tb>conta que transferiu: {item.creditedAccountId} </tb>
        <tb>conta que recebeu: {item.debitedAccountId} </tb>
        <tb>Valor da Transferência: {item.value} </tb>
        <tb>Data da transferência: {String(item.createdAt).split('T')[0]} </tb>
        </tr>
      </table>
    ));
    return result
  }

  const changeDate = ({ target: { value } }) => {
    const newDate = value.toString().split("/").reverse().join("-");
    setDate(newDate);
  }

  const isChecked = ({ target: { name } }) => {
    if (name === "credited") {
      setCredited(!credited);
      setDebited(false);
      setFilterOp("creditedAccountId")
    }
    if (name === "debited") {
      setDebited(!debited);
      setCredited(false);
      setFilterOp("debitedAccountId")
    }
  }

  const filterTransac = async () => {
    const { data } = await backendApi.post('/transactions/filtered', {
      token,
      date,
      filterOp
    });
    setTransactions(data);
  }
  
  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <label>
          Escolher a data:
          <input
            type="date"
            name="date"
            onChange={ (e) => changeDate(e) }
          />
        </label>

        <label> Suas Transferências
          <input
            type="checkbox"
            onClick={ (e) => isChecked(e) }
            name="credited"
            checked={ credited }
          />
        </label>

        <label> Transferencias recebidas
          <input
            type="checkbox"
            onClick={ (e) => isChecked(e) }
            name="debited"
            checked={ debited }
          />
        </label>

        <button
          type="button"
          onClick={ () => filterTransac() }
        >
          Filtrar
        </button>
        <button
          type="button"
          name="clean"
          onClick={ () => getAllTransactions() }
        >
          Limpar Filtro
        </button>
      </div>
      { transactions ? renderTransac() : getAllTransactions() }
    </div>
  )
}

export default Transactions;
