import React from 'react';
import css from './actions.module.css';

export default function Action({ id, type, onActionClick }) {
    const handleIconClick = () => {
        onActionClick(id, type);
    }
    return (
        <span className={css.actionStyle} className='material-icons' onClick={handleIconClick}>
            {type}
        </span>
    );
}
