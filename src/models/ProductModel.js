import { runDbQueryStatement, runDbInsert } from '../util/db';

const mapDBProductToObject = (a) => {
  let res = null;

  if (a) {
    res = {
      id: a.PRODUCT_ID,
      name: a.NAME,
      sku: a.SKU,
      weight: a.WEIGHT,
    };
  }
  return res;
};

export const getProductQuery = async (id) => {
  const queryString = 'SELECT * FROM PRODUCTS WHERE PRODUCT_ID=?;';
  const dbObj = await runDbQueryStatement(queryString, [Number(id)]);
  return dbObj.map((a) => mapDBProductToObject(a));
};

export const createProductQuery = (name, sku, weight) => {
  const queryString = 'INSERT INTO PRODUCTS (NAME, SKU, WEIGHT) VALUES (?,?,?);';
  return runDbInsert(queryString, [name, sku, weight]);
};

export const deleteProductQuery = (id) => {
  const queryString = 'DELETE FROM PRODUCTS WHERE PRODUCT_ID=?;';
  return runDbQueryStatement(queryString, [Number(id)]);
};

export const updateProductQuery = (id, name, sku, weight) => {
  const queryString = 'UPDATE PRODUCTS SET NAME=?, SKU=?, WEIGHT=? WHERE PRODUCT_ID=?;';
  return runDbQueryStatement(queryString, [name, sku, weight, Number(id)]);
};
