import { Router } from 'express';
import { logRequest } from '../util/log';
import { doAnalytics } from '../util/analytics';
import {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/TransactionController';

const TransactionRouter = new Router();
const middleware = [logRequest, doAnalytics];

TransactionRouter.post('/', async (req, res, next) => {
  const {
    userId,
    productId,
    storeId,
    status,
    method,
    quantity,
  } = req.body;

  try {
    console.log('creating transaction');
    const result = await createTransaction(userId, productId, storeId, status, method, quantity);
    res.json({
      status: 'OK, CREATED',
      id: result.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

TransactionRouter.get('/:transactionId', middleware, async (req, res, next) => {
  const {
    transactionId,
  } = req.params;
  try {
    res.json(await getTransaction(transactionId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});


TransactionRouter.put('/:transactionId', middleware, async (req, res, next) => {
  const {
    transactionId,
  } = req.params;
  const {
    userId,
    productId,
    storeId,
    status,
    method
  } = req.body;

  try {
    const result = await updateTransaction(transactionId, userId, productId, storeId, status, method, quantity);
    res.json({
      status: 'OK, UPDATED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default TransactionRouter;
