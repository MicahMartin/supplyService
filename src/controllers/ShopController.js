import {
  getShopQuery,
  createShopQuery,
  deleteShopQuery,
  updateShopQuery,
} from '../models/ShopModel';
import { debugLogger } from '../util/log';

export const getShop = async (id) => {
  debugLogger.info(`grabbing data for shop:${id}`);
  const res = await getShopQuery(id);

  if (!res) {
    throw new Error('get shop query error');
  }
  return res;
};

export const createShop = async (name, supplierId, inventoryId) => {
  debugLogger.info(`creating shop:${{
    name, supplierId, inventoryId,
  }}`);
  const res = await createShopQuery(name, supplierId, inventoryId);

  if (!res && res.affectedRows == 1) {
    debugLogger.warn(`couldnt create shop:${name}`);
    throw new Error('create shop query error');
  }
  return res;
};

export const updateShop = async (id, name, supplierId, inventoryId) => {
  debugLogger.info(`updating shop:${id}`);
  const res = await updateShopQuery(id, name, supplierId, inventoryId);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`shop:${id} not updated}`);
    throw new Error('update shop query error');
  }
  return result;
};

export const deleteShop = async (id) => {
  debugLogger.info(`deleting ID:${id}`);
  const res = await deleteShopQuery(id);
  const result = res && res.affectedRows == 1;

  if (!result) {
    // Delete shop inventory here?
    debugLogger.warn(`shop:${id} not deleted`);
    throw new Error('delete shop query error');
  }
  return result;
};
