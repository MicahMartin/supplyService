import { runDbQueryStatement, runDbInsert } from '../util/db';

const mapDBInventoryToObject = (a) => {
  let res = null;

  if (a) {
    res = {
      // primary key should be productId + storeId
      productId: a.PRODUCT_ID,
      name: a.NAME,
      supplierId: a.SUPPLIER_ID,
      shopId: a.SHOP_ID,
      count: a.count,
      price: a.price,
    };
  }
  return res;
};

export const getInventoryQuery = async (shopId) => {
  const queryString = 'SELECT * FROM INVENTORIES WHERE SHOP_ID=?;';
  const dbObj = await runDbQueryStatement(queryString, [Number(shopId)]);
  return dbObj.map((a) => mapDBInventoryToObject(a));
};

export const createInventoryQuery = (productId, name, supplierId, shopId, count, price) => {
  const queryString = `INSERT INTO INVENTORIES
                       (PRODUCT_ID, NAME, SUPPLIER_ID, SHOP_ID, COUNT, PRICE)
                       VALUES (?,?,?,?,?,?);`;
  return runDbInsert(queryString, [productId, name, supplierId, shopId, count, price]);
};

export const deleteInventoryQuery = (id) => {
  const queryString = 'DELETE FROM INVENTORIES WHERE INVENTORY_ID=?;';
  return runDbQueryStatement(queryString, [Number(id)]);
};

export const updateInventoryQuery = (id, productId, name, supplierId, shopId, count, price) => {
  const queryString = `UPDATE INVENTORIES SET PRODUCT_ID=?,
                       NAME=?, SUPPLIER_ID=?, SHOP_ID=?, COUNT=?,
                       PRICE=? WHERE INVENTORY_ID=?;`;
  return runDbQueryStatement(queryString, [productId, name, supplierId, shopId, count, price, Number(id)]);
};
