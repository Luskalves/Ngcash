import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import backendApi from '../api/backendApi';

function Transactions() {  
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [debited, setDebited] = useState(false);
  const [credited, setCredited] = useState(false);
  const [filterOp, setFilterOp] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  const getAllTransactions = async () => {
    try {
      const { data } = await backendApi.post('/transactions', {
        token,
      });
      setTransactions(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  const renderTransac = () => {
    const result = transactions.map((item, idx) => (
      <table key={idx} className="border-collapse border border-slate-400">
        <thead>
          <tr className="bg-black text-white">
            <th className="border border-slate-300 px-2">conta da transferência</th>
            <th className="border border-slate-300 px-2">conta depositada</th>
            <th className="border border-slate-300 px-2">valor</th>
            <th className="border border-slate-300 px-2">data</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-slate-300 px-2">{item.creditedAccountId} </td>
            <td className="border border-slate-300 px-2">{item.debitedAccountId} </td>
            <td className="border border-slate-300 px-2">{item.value} </td>
            <td className="border border-slate-300 px-2">{String(item.createdAt).split('T')[0]} </td>
          </tr>
        </tbody>
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
      <div className="flex flex-col items-center space-y-5 p-5">
        <div className="space-x-4 py-2 bg-slate-200 p-2 rounded">
          <label for="date"> Escolher a data: </label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={ (e) => changeDate(e) }
          />

          <label for="credited" className=""> Suas Transferências </label>
          <input
            type="checkbox"
            onClick={ (e) => isChecked(e) }
            name="credited"
            id="credited"
            checked={ credited }
          />

          <label for="debited"> Transferencias recebidas </label>
          <input
            type="checkbox"
            onClick={ (e) => isChecked(e) }
            name="debited"
            id="debited"
            checked={ debited }
          />

          <button
            className="bg-white hover:bg-black hover:text-white p-1 rounded"
            type="button"
            onClick={ () => filterTransac() }
          >
            Filtrar
          </button>
          <button
            className="bg-white hover:bg-black hover:text-white p-1 rounded"
            type="button"
            name="clean"
            onClick={ () => getAllTransactions() }
          >
            Limpar Filtro
          </button>
        </div>
        { transactions ? renderTransac() : getAllTransactions() }
      </div>
    </div>
  )
}

export default Transactions;
