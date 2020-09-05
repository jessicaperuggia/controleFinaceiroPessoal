const express = require('express');
const transactionRouter = express.Router();

const {
    getPeriod,
    create,
    update,
    remove,
} = require('../services/transactionService');

transactionRouter
    .route('/')
    .get(getPeriod)
    .post(create)
    .put(update)
    .delete(remove);

module.exports = transactionRouter;
