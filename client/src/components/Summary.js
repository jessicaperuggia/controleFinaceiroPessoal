import React from 'react';

import css from './summarymodule.css';
import { formatMoney } from '../helpers/formatters';

export default function Summary({ summary }) {
    const { countTransactions, totalEarnings, totalExpenses, balance } = summary;

    const balanceStyle = balance >= 0 ? earningStyle : expenseStyle;

    return (
        <div className={css.containerStyle}>
            <span>
                <strong>
                    Receitas:{' '}
                    <span className={css.earningStyle}>{formatMoney(totalEarnings)}</span>
                </strong>
            </span>

            <span>
                <strong>
                    Despesas:{' '}
                    <span className={css.expenseStyle}>{formatMoney(totalExpenses)}</span>
                </strong>
            </span>
        </div>
    );
}
