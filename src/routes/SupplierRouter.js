import { Router } from 'express';
import { logRequest } from '../util/log';
import { doAnalytics } from '../util/analytics';
import {
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/SupplierController';
import ShopRouter from './ShopRouter';
import InventoryRouter from './InventoryRouter';

const SupplierRouter = new Router();
const middleware = [logRequest, doAnalytics];

SupplierRouter.post('/', async (req, res, next) => {
  const {
    name,
  } = req.body;

  try {
    console.log('creating supplier');
    const result = await createSupplier(name);
    res.json({
      status: 'OK, CREATED',
      id: result.id,
    });
  } catch (e) {
    if (e.code == 'ER_DUP_ENTRY') {
      return res.status(400).json({ eror: 'name already taken' });
    }
    return res.status(400).json({ error: e.message });
  }
});

SupplierRouter.get('/:supplierId', middleware, async (req, res, next) => {
  const {
    supplierId,
  } = req.params;
  try {
    res.json(await getSupplier(supplierId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

SupplierRouter.delete('/:supplierId', middleware, async (req, res, next) => {
  const {
    supplierId,
  } = req.params;
  try {
    const result = await deleteSupplier(supplierId);
    res.json({
      status: 'OK, DELETED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

SupplierRouter.put('/:supplierId', middleware, async (req, res, next) => {
  const {
    supplierId,
  } = req.params;

  try {
    const result = await updateSupplier(supplierId, req.body.name);
    res.json({
      status: 'OK, UPDATED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

SupplierRouter.use('/shops', ShopRouter);
SupplierRouter.use('/inventories', InventoryRouter);

export default SupplierRouter;
