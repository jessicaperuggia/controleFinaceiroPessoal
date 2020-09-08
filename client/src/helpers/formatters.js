const numberFormatter = Intl.NumberFormat('pt-BR');
const moneyFormatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', });

function formatNumber(value) {
    return numberFormatter.format(value);
}

function formatMoney(value) {
    return moneyFormatter.format(value);
}

function formatPercentage(value) {
    return `${value.toFixed(2).replace('.', ',')}%`;
}

function formatMoneyPositiveNegative(value) {
    const money = moneyFormatter.format(value);

    if (value >= 0) {
        return `+${money}`;
    }

    return money;
}

export { formatMoney, formatPercentage, formatNumber, formatMoneyPositiveNegative };