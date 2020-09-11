import React from 'react'
import { formatMoney } from '../helpers/formatters';

export default function Transactions({ transactions }) {

    return (
        <div className='container'>
            {transactions.map(({ id, day, category, description, value }) => {
                return (
                    <div>
                        <ul key={id}>
                            <li >{day} - {category} {description} {formatMoney(value)}</li>
                        </ul>
                    </div>
                )
            })}

        </div>
    );
}
