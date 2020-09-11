import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import MonthPeriod from './components/MonthPeriod';
import InputReadOnly from './components/InputReadOnly';
import Transactions from './components/Transactions';


export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectTransaction, setSelectTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      let currentPeriod = '2020-09'
      let transactions = await api.getAllPeriod(currentPeriod);
      setTimeout(() => {
        setAllTransactions(transactions);
      }, 2000);

    };
    getTransactions();
  }, []);
  const handleDelete = async (transactionDelete) => {
    const isDeleted = await api.deleteTransaction(transactionDelete);

    if (isDeleted) {
      const deletedTransactionIndex = allTransactions.findIndex(
        (transaction) => transaction.id === transactionDelete.id
      );
      const newTransactions = Object.assign([], allTransactions);
      newTransactions[deletedTransactionIndex].isDeleted = true;

      setAllTransactions(newTransactions);
    }
  };
  const handlePersist = (transaction) => {
    setSelectTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className='container'>
      <h1 className='center'>Controle Finaceiro Pessoal</h1>

      {allTransactions.length === 0 && <Spinner />}
      {allTransactions.length > 0 && (<Transactions transactions={allTransactions} onDelete={handleDelete} onPersist={handlePersist} />)}

      <div className='row'>
        <MonthPeriod />
      </div>
      <div className='row'>
        <InputReadOnly label='Lançamento:' />
        <InputReadOnly label='Receita:' color='green' />
        <InputReadOnly label='Despesa:' color='red' />
        <InputReadOnly label='Saldo:' />
      </div>
      <div>

      </div>
    </div>
  );
}
