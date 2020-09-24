const TransactionModel = require('../models/TransactionModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/

function extractCleanTransactionFrom(mongoDbTransaction) {
    const {
        _id,
        description,
        value,
        category,
        year,
        month,
        day,
        yearMonth,
        yearMonthDay,
        type,
    } = mongoDbTransaction;

    const returnedTransaction = {
        _id,
        description,
        value,
        category,
        year,
        month,
        day,
        yearMonth,
        yearMonthDay,
        type,
    };

    return returnedTransaction;
}

async function getTransactionsFrom(period) {
    const transactions = await TransactionModel.find({ yearMonth: period });
    return transactions;
}

async function postTransaction(transaction) {
    const newTransactionMongoDB = await TransactionModel.create(transaction);

    const newTransaction = extractCleanTransactionFrom(newTransactionMongoDB);
    return newTransaction;
}

async function updateTransaction(_id, transaction) {
    await TransactionModel.updateOne({ _id: ObjectId(_id) }, transaction);
    return { _id, ...transaction };
}

async function deleteTransaction(_id) {
    await TransactionModel.deleteOne({ _id: ObjectId(_id) });
    return true;
}

module.exports = {
    getTransactionsFrom,
    postTransaction,
    deleteTransaction,
    updateTransaction,
};
