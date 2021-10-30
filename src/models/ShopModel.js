import { runDbQueryStatement, runDbInsert } from '../util/db';

const mapDBShopToObject = (a) => {
  let res = null;

  if (a) {
    res = {
      id: a.SHOP_ID,
      name: a.NAME,
      supplierId: a.SUPPLIER_ID,
    };
  }
  return res;
};

export const getShopQuery = async (id) => {
  const queryString = 'SELECT * FROM SHOPS WHERE SHOP_ID=?;';
  const dbObj = await runDbQueryStatement(queryString, [Number(id)]);
  return dbObj.map((a) => mapDBShopToObject(a));
};

export const createShopQuery = (name, supplierId) => {
  const queryString = 'INSERT INTO SHOPS (NAME, SUPPLIER_ID) VALUES (?,?,?);';
  return runDbInsert(queryString, [name, supplierId]);
};

export const deleteShopQuery = (id) => {
  const queryString = 'DELETE FROM SHOPS WHERE SHOP_ID=?;';
  return runDbQueryStatement(queryString, [Number(id)]);
};

export const updateShopQuery = (name, supplierId, id) => {
  const queryString = 'UPDATE SHOPS SET NAME=?, SUPPLIER_ID=?, WHERE SHOP_ID=?;';
  return runDbQueryStatement(queryString, [name, supplierId, Number(id)]);
};
