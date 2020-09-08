import React from 'react';
import MonthPeriod from './components/MonthPeriod';

export default function App() {
  return (
    <div className='container'>
      <h1 className='center'>Controle Finaceito Pessoal</h1>
      <div className='row'>
        <MonthPeriod />
      </div>
    </div>
  );
}
