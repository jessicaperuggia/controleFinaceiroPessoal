import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import MonthPeriod from './components/MonthPeriod';
import InputReadOnly from './components/InputReadOnly';
import Transactions from './components/Transactions';
import ModalTransaction from './components/ModalTransaction';


export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectTransaction, setSelectTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      let currentPeriod = '2019-11'
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
      const deletedTransactionIndex = allTransactions.find(
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

  const handleModalClose = () => {
    setSelectTransaction(null);
    setIsModalOpen(false);
  };

  const handleModalSave = (newTransaction, mode) => {
    setIsModalOpen(false);

    if (mode === 'insert') {
      const postedTransaction = await api.updateTransaction(newTransaction);

      let newTransactions = [...]
    }
  }

  return (
    <div className='container'>
      <h1 className='center'>Controle Finaceiro Pessoal</h1>

      {allTransactions.length === 0 && <Spinner />}

      <div className='row'>
        <MonthPeriod />
      </div>
      <div className='row'>
        <InputReadOnly label='Lançamento:' />
        <InputReadOnly label='Receita:' color='green' />
        <InputReadOnly label='Despesa:' color='red' />
        <InputReadOnly label='Saldo:' />
      </div>
      {allTransactions.length > 0 && (<Transactions transactions={allTransactions} onDelete={handleDelete} onPersist={handlePersist} />)}

      {isModalOpen && <ModalTransaction isOpen={isModalOpen} onClose={handleModalClose} onSave={handleModalSave} selectTransaction={selectTransaction} />}
      <div>

      </div>
    </div>
  );
}
