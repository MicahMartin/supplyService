import {
  getTransactionQuery,
  createTransactionQuery,
  deleteTransactionQuery,
  updateTransactionQuery,
} from '../models/TransactionModel';
import { debugLogger } from '../util/log';

export const getTransaction = async (id) => {
  debugLogger.info(`grabbing data for transaction:${id}`);
  const res = await getTransactionQuery(id);

  if (!res) {
    throw new Error('get transaction query error');
  }
  return res;
};

export const createTransaction = async (transactionId, userId, productId, status, method, quantity) => {
  debugLogger.info(`creating transaction:${transactionId}`);
  // out of stock check? select from inventory where productId = transaction.productId and check the quantity
  const res = await createTransactionQuery(transactionId, userId, productId, status, method, quantity);
  // If that comes back then we're good to assume payment was processed
  // So we should update the quantity for this product in the inventory table for the store it was bought from
  // Also we want to make sure we keep track of the stores that Users are buying from. This would be a good time
  // To update the user table as well.

  if (!res && res.affectedRows == 1) {
    debugLogger.warn(`couldnt create transaction:${{transactionId, userId, productId, status, method}}`);
    throw new Error('create transaction query error');
  }
  const newCount = getInventoryItem(productId).count - quantity;
  const inventoryUpdateReq = updateInventoryItem(productId, name, supplierId, shopId, newCount, price);
  if (!inventoryUpdateReq  && inventoryUpdateReq.affectedRows == 1) {
    debugLogger.warn(`couldnt update inventory for this transaction`);
    throw new Error('inventory update error!!');
  }
  return res;
};

export const deleteTransaction = async (id) => {
  debugLogger.info(`deleting ID:${id}`);
  const res = await deleteTransactionQuery(id);
  const result = res && res.affectedRows == 1;

  if (!result) {
    // Delete all Shops & Inventories here?
    debugLogger.warn(`transaction:${id} not deleted`);
    throw new Error('delete transaction query error');
  }
  return result;
};

export const updateTransaction = async (transactionId, userId, productId, status, method) => {
  debugLogger.info(`updating transaction:${transactionId}`);
  const res = await updateTransactionQuery(transactionId, userId, productId, status, method);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`transaction:${id} not updated}`);
    throw new Error('update transaction query error');
  }
  return result;
};
