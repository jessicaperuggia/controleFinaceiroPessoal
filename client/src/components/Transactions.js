import React from 'react'
//import Transaction from './Transaction';

export default function Transactions({ transactions }) {
    return (
        <div>
            {transactions.map((transaction) => {
                const { id, day, category, description, value, yearMonth } = transaction;
                let currentYearMonth = yearMonth[0];
                if (currentYearMonth === yearMonth) {

                }
                return (
                    <div key={id}>
                        <div>
                            {day} {category} {description} {value}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
