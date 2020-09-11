import React from 'react'
import { formatMoney } from '../helpers/formatters';
import Action from './Action';

export default function Transactions({ transactions, onDelete, onPersist }) {

    const handleActionClick = (id, type) => {

    }
    return (
        <div className='container'>
            {transactions.map(({ id, day, category, description, value, isDeleted }) => {
                return (
                    <div key={id}>
                        <ul>
                            <li>
                                {day} - {category} {description} {isDeleted ? '-' : formatMoney(value)}
                                {<Action onActionClick={handleActionClick} id={id} type={isDeleted ? 'add' : 'edit'} />}
                                {!isDeleted && <Action onActionClick={handleActionClick} id={id} type='delete' />}
                            </li>
                        </ul>
                    </div>
                );
            })}

        </div>
    );
}
