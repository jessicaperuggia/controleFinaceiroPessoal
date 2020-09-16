import React from 'react';
import css from './actions.module.css';

export default function Actions({ filterText, onFilter, onNewTransaction }) {
    const handleChangeFilterText = (event) => {
        const userText = event.target.value;
        onFilter(userText);
    };

    const handleButtonClick = () => {
        onNewTransaction();
    };

    return (
        <div className={css.containerStyle}>
            <button className='waves-effect waves-light btn' disabled={filterText.trim() !== ''} onClick={handleButtonClick}>
                + Novo lançamento
                </button>
            <div className={css.inputStyle} className='input-field'>
                <input placeholder='Filtro' type='text' value={filterText} onChange={handleChangeFilterText} />
            </div>
        </div>
    );
}
