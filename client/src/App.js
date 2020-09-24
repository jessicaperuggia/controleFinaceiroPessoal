import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import MonthPeriod from './components/MonthPeriod';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import ModalTransaction from './components/ModalTransaction';
import Actions from './components/Actions';

function sortTransactions(transactions) {
  return transactions.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}
function getCurrentPeriod(allPeriods) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
  const currentPeriod = allPeriods.find(({ id }) => id === yearMonth);

  return currentPeriod || Object.assign({}, allPeriods[0]);
}

export default function App() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAllPeriods = async () => {
      const data = await api.getAllPeriods();
      setAllPeriods(data);

      setCurrentPeriod(getCurrentPeriod(data));
    };

    getAllPeriods();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPeriod) {
        return;
      }

      setCurrentTransactions([]);
      const transactions = await api.getTransactionsFrom(currentPeriod);
      setCurrentTransactions(transactions);
    };

    fetchData();
  }, [currentPeriod]);

  useEffect(() => {
    if (filterText.trim() === '') {
      setFilteredTransactions([...currentTransactions]);
    } else {
      const lowerCaseFilter = filterText.toLowerCase();

      const newFilteredTransactions = currentTransactions.filter(
        (transaction) => {
          return transaction.descriptionLowerCase.includes(lowerCaseFilter);
        }
      );

      setFilteredTransactions(newFilteredTransactions);
    }
  }, [filterText, currentTransactions]);

  useEffect(() => {
    const summarizeData = () => {
      const countTransactions = filteredTransactions.length;

      const totalEarnings = filteredTransactions
        .filter((transaction) => transaction.type === '+')
        .reduce((totalEarnings, transaction) => {
          return totalEarnings + transaction.value;
        }, 0);

      const totalExpenses = filteredTransactions
        .filter((transaction) => transaction.type === '-')
        .reduce((totalExpenses, transaction) => {
          return totalExpenses + transaction.value;
        }, 0);

      const balance = totalEarnings - totalExpenses;

      setSummary({
        countTransactions,
        totalEarnings,
        totalExpenses,
        balance,
      });
    };

    summarizeData();
  }, [filteredTransactions]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleFilter = (filteredText) => {
    setFilterText(filteredText);
  };

  const handleDeleteTransaction = async (id) => {
    await api.deleteTransaction(id);

    const newTransactions = currentTransactions.filter((transaction) => transaction.id !== id);

    setCurrentTransactions(newTransactions);
    setFilteredTransactions(newTransactions);
  };

  const handleEditTransaction = (id) => {
    const newSelectedTransaction = currentTransactions.find((transaction) => transaction.id === id);

    setSelectedTransaction(newSelectedTransaction);
    setIsModalOpen(true);
  };

  const handleInsertTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleModalSave = async (newTransaction, mode) => {
    setIsModalOpen(false);

    if (mode === 'insert') {
      const postedTransaction = await api.postTransaction(newTransaction);

      let newTransactions = [...currentTransactions, postedTransaction];
      newTransactions = sortTransactions(newTransactions);
      setCurrentTransactions(newTransactions);
      setFilteredTransactions(newTransactions);
      setSelectedTransaction(null);

      return;
    }

    if (mode === 'edit') {
      const updatedTransaction = await api.updateTransaction(newTransaction);
      const newTransactions = [...currentTransactions];

      const index = newTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      newTransactions[index] = updatedTransaction;
      setCurrentTransactions(newTransactions);
      setFilteredTransactions(newTransactions);

      return;
    }
  };

  return (
    <div className='container'>
      <div className='center'>
        <h1>Controle Finaceiro Pessoal</h1>
      </div>

      {!isModalOpen && (
        <MonthPeriod allPeriods={allPeriods} selectedPeriod={currentPeriod} onChangePeriod={handlePeriodChange} />
      )}

      {currentTransactions.length === 0 && <Spinner />}

      {currentTransactions.length > 0 && (
        <>
          <Summary summary={summary} />
          {!isModalOpen && (
            <Actions filterText={filterText} onFilter={handleFilter} isModalOpen={isModalOpen} onNewTransaction={handleInsertTransaction} />
          )}
          <Transactions transactions={filteredTransactions} onDeleteTransaction={handleDeleteTransaction} onEditTransaction={handleEditTransaction} />
        </>
      )}

      {isModalOpen && <ModalTransaction isOpen={isModalOpen} onClose={handleModalClose} onSave={handleModalSave} selectTransaction={selectedTransaction} />}

    </div>
  );
}
