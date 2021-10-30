import { runDbQueryStatement, runDbInsert } from '../util/db';

const mapDBSupplierToObject = (a) => {
  let res = null;

  if (a) {
    res = {
      id: a.SUPPLIER_ID,
      name: a.NAME,
    };
  }
  return res;
};

export const getSupplierQuery = async (id) => {
  const queryString = 'SELECT * FROM SUPPLIERS WHERE SUPPLIER_ID=?;';
  const dbObj = await runDbQueryStatement(queryString, [Number(id)]);
  return dbObj.map((a) => mapDBSupplierToObject(a));
};

export const createSupplierQuery = (name) => {
  const queryString = 'INSERT INTO SUPPLIERS (NAME) VALUES (?);';
  return runDbInsert(queryString, [name]);
};

export const deleteSupplierQuery = (id) => {
  const queryString = 'DELETE FROM SUPPLIERS WHERE SUPPLIER_ID=?;';
  return runDbQueryStatement(queryString, [Number(id)]);
};

export const updateSupplierQuery = (id, name) => {
  const queryString = 'UPDATE SUPPLIERS SET NAME=? WHERE SUPPLIER_ID=?;';
  return runDbQueryStatement(queryString, [name, Number(id)]);
};
