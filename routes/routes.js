const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService.js');

transactionRouter.post('/', transactionService.create);
transactionRouter.get('/', transactionService.findAll);
transactionRouter.get('/:period', transactionService.getPeriod);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.delete('/:id', transactionService.remove);


module.exports = transactionRouter;
