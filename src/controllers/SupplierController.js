import {
  getSupplierQuery,
  createSupplierQuery,
  deleteSupplierQuery,
  updateSupplierQuery,
} from '../models/SupplierModel';
import { debugLogger } from '../util/log';

export const getSupplier = async (id) => {
  debugLogger.info(`grabbing data for supplier:${id}`);
  const res = await getSupplierQuery(id);

  if (!res) {
    throw new Error('get supplier query error');
  }
  return res;
};

export const createSupplier = async (name) => {
  debugLogger.info(`creating supplier:${name}`);
  const res = await createSupplierQuery(name);

  if (!res && res.affectedRows == 1) {
    debugLogger.warn(`couldnt create supplier:${name}`);
    throw new Error('create supplier query error');
  }
  return res;
};

export const deleteSupplier = async (id) => {
  debugLogger.info(`deleting ID:${id}`);
  const res = await deleteSupplierQuery(id);
  const result = res && res.affectedRows == 1;

  if (!result) {
    // Delete all Shops & Inventories here?
    debugLogger.warn(`supplier:${id} not deleted`);
    throw new Error('delete supplier query error');
  }
  return result;
};

export const updateSupplier = async (id, name) => {
  debugLogger.info(`updating supplier:${id}`);
  const res = await updateSupplierQuery(id, name);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`supplier:${id} not updated}`);
    throw new Error('update supplier query error');
  }
  return result;
};
