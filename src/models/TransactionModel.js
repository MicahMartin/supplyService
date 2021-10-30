import { runDbQueryStatement, runDbInsert } from '../util/db';

const mapDBTransactionToObject = (a) => {
  let res = null;

  if (a) {
    res = {
      id: a.TRANSACTION_ID,
      name: a.NAME,
    };
  }
  return res;
};

export const getTransactionQuery = async (id) => {
  const queryString = 'SELECT * FROM TRANSACTIONS WHERE TRANSACTION_ID=?;';
  const dbObj = await runDbQueryStatement(queryString, [Number(id)]);
  return dbObj.map((a) => mapDBTransactionToObject(a));
};

export const createTransactionQuery = (userId, productId, status, method) => {
  const queryString = `INSERT INTO TRANSACTIONS
                       (USER_ID, PRODUCT_ID, STATUS, METHOD)
                       VALUES (?,?,?,?);`;
  return runDbInsert(queryString, [userId, productId, status, method]);
};

export const deleteTransactionQuery = (id) => {
  const queryString = 'DELETE FROM TRANSACTIONS WHERE TRANSACTION_ID=?;';
  return runDbQueryStatement(queryString, [Number(id)]);
};

export const updateTransactionQuery = (transactionId, userId, productId, status, method) => {
  const queryString = `UPDATE TRANSACTIONS
                       SET USER_ID=?, PRODUCT_ID=?, STATUS=?, METHOD=? WHERE TRANSACTION_ID=?;`;
  return runDbQueryStatement(queryString, [userId, productId, status, method, Number(id)]);
};
