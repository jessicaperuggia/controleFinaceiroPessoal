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
        <InputReadOnly label='Lançmento:' />
        <InputReadOnly label='Receita:' color='green' />
        <InputReadOnly label='Despesa:' color='red' />
        <InputReadOnly label='Saldo:' />
      </div>
    </div>
  );
}
