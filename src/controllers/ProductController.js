import {
  getProductQuery,
  createProductQuery,
  deleteProductQuery,
  updateProductQuery,
} from '../models/ProductModel';
import { debugLogger } from '../util/log';

export const getProduct = async (id) => {
  debugLogger.info(`grabbing obj for product:${id}`);
  const res = await getProductQuery(id);

  if (!res) {
    throw new Error('get product query error');
  }
  return res;
};

export const createProduct = async (name, sku, weight) => {
  debugLogger.info(`creating product:${name, sku, weight}`);
  const res = await createProductQuery(name, sku, weight);

  if (!res && res.affectedRows == 1) {
    debugLogger.warn(`couldnt create product:${name}`);
    throw new Error('create product query error');
  }
  return res;
};


export const updateProduct = async (id, name, sku, weight) => {
  debugLogger.info(`updating product:${id}`);
  const res = await updateProductQuery(id, name, sku, weight);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`product:${id} not updated}`);
    throw new Error('update product query error');
  }
  return result;
};


export const deleteProduct = async (id) => {
  debugLogger.info(`deleting ID:${id}`);
  const res = await deleteProductQuery(id);
  const result = res && res.affectedRows == 1;

  if (!result) {
    // Delete all Shops & Inventories here?
    debugLogger.warn(`product:${id} not deleted`);
    throw new Error('delete product query error');
  }
  return result;
};
