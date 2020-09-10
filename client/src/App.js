import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import MonthPeriod from './components/MonthPeriod';
import InputReadOnly from './components/InputReadOnly';
import Transactions from './components/Transactions';


export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions();
      setTimeout(() => {
        setAllTransactions(transactions);
      }, 2000);
    };
    getTransactions();
  }, []);

  return (
    <div className='container'>
      <h1 className='center'>Controle Finaceito Pessoal</h1>

      {allTransactions.length === 0 && <Spinner />}

      <div className='row'>
        <MonthPeriod />
      </div>
      <div className='row'>
        <InputReadOnly label='Lançmento:' />
        <InputReadOnly label='Receita:' color='green' />
        <InputReadOnly label='Despesa:' color='red' />
        <InputReadOnly label='Saldo:' />
      </div>
      <div>
        <Transactions transactions={allTransactions} />
      </div>
    </div>
  );
}
