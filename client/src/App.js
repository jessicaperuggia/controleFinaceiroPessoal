import React, { useState } from 'react';
import MonthPeriod from './components/MonthPeriod';
import InputReadOnly from './components/InputReadOnly';



export default function App() {

  return (
    <div className='container'>
      <h1 className='center'>Controle Finaceito Pessoal</h1>
      <div className='row'>
        <MonthPeriod />
      </div>
      <div className='row'>
        <InputReadOnly lable='Lançmento:' />
        <InputReadOnly lable='Receita:' color='green' />
        <InputReadOnly lable='Despesa:' color='red' />
        <InputReadOnly lable='Saldo:' />
      </div>
    </div>
  );
}
