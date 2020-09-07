const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
    const transaction = new TransactionModel({
        description: req.body.name,
        value: req.body.value,
        category: req.body.category,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        yearMonth: req.body.yearMonth,
        yearMonthDay: req.body.yearMonthDay,
        type: req.body.type,
    });

    try {
        const data = await transaction.save();

        res.send(data);
    } catch (error) {
        res.status(500).send('Erro ao salvar a transação' + error);
    }
};

const findAll = async (req, res) => {
    try {
        const data = await TransactionModel.find();

        res.send(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar todos os dados' + error);
    }
};

const getPeriod = async (req, res) => {
    const period = req.params.period;

    if (!period) {
        return res.status(404).send({ error: 'É necessário informar o period no formato aaaa-mm', });
    }

    try {
        const params = { yearMonth: period };
        const transactions = await TransactionModel.find(params);

        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await TransactionModel.findByIdAndUpdate({ _id: id }, req.body, { new: true, });

        if (!data) {
            res.send('Não foi encontrada a transação id: ' + id);
        } else {
            res.send(data);
        }
    } catch (error) {
        res.status(500).send('Erro ao atualizar a tansação id ' + id + ' ' + error);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await TransactionModel.findByIdAndRemove({ _id: id });

        if (!data) {
            res.send('Não encontrada a transação id: ' + id)
        } else {
            res.send('Transação excluída com sucesso');
        }
    } catch (error) {
        res.status(500).send('Erro ao excluir transação id: ' + id + ' ' + error)
    }
};

module.exports = { create, findAll, getPeriod, update, remove };
