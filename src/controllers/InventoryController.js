import {
  getInventoryQuery,
  createInventoryQuery,
  deleteInventoryQuery,
  updateInventoryQuery,
} from '../models/InventoryModel';
import { debugLogger } from '../util/log';

export const getInventoryItem = async (id) => {
  debugLogger.info(`grabbing data for inventory:${id}`);
  const res = await getInventoryQuery(id);

  if (!res) {
    throw new Error('get inventory query error');
  }
  return res;
};

export const createInventoryItem = async (productId, name, supplierId, shopId, count, price) => {
  debugLogger.info(`creating inventory item:${{
    productId, name, supplierId, shopId, count, price,
  }}`);
  const res = await createInventoryQuery(productId, name, supplierId, shopId, count, price);

  if (!res && res.affectedRows == 1) {
    debugLogger.warn(`couldnt create inventory:${name}`);
    throw new Error('create inventory query error');
  }
  return res;
};

export const updateInventoryItem = async (productId, name, supplierId, shopId, count, price) => {
  debugLogger.info(`updating inventory for product:${productId}`);
  const res = await updateInventoryQuery(productId, name, supplierId, shopId, count, price);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`inventory:${id} not updated}`);
    throw new Error('update inventory query error');
  }
  return result;
};

export const deleteInventoryItem = async (id) => {
  debugLogger.info(`deleting ID:${id}`);
  const res = await deleteInventoryQuery(id);
  const result = res && res.affectedRows == 1;

  if (!result) {
    // Delete inventory inventory here?
    debugLogger.warn(`inventory:${id} not deleted`);
    throw new Error('delete inventory query error');
  }
  return result;
};
