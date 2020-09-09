import React, { useState } from 'react';
import MonthPeriod from './components/MonthPeriod';
import { formatNumber, formatMoney } from './helpers/formatters';
import InputReadOnly from './components/InputReadOnly';


export default function App() {
  const [entry, setEntry] = useState(10);
  const [revenue, setRevenue] = useState(20);
  const [cost, setCost] = useState(30);
  const [balance, setBalance] = useState(40);
  return (
    <div className='container'>
      <h1 className='center'>Controle Finaceito Pessoal</h1>
      <div className='row'>
        <MonthPeriod />
      </div>
      <div className='row'>
        <InputReadOnly lable='Lançmento:' value={formatNumber(entry)} />
        <InputReadOnly lable='Receita:' value={formatMoney(revenue)} color='green' />
        <InputReadOnly lable='Despesa:' value={formatMoney(cost)} color='red' />
        <InputReadOnly lable='Saldo:' value={formatMoney(balance)} />
      </div>
    </div>
  );
}
