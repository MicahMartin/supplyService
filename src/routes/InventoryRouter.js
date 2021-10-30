import { Router } from 'express';
import { logRequest } from '../util/log';
import { doAnalytics } from '../util/analytics';
import {
  createInventoryItem,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/InventoryController';

const InventoryRouter = new Router();
const middleware = [logRequest, doAnalytics];

InventoryRouter.post('/', async (req, res, next) => {
  const {
    productId,
    name,
    supplierId,
    shopId,
    count,
    price,
  } = req.body;

  try {
    const result = await createInventoryItem(productId, name, supplierId, shopId, count, price);
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

InventoryRouter.get('/:inventoryItemId', middleware, async (req, res, next) => {
  const {
    inventoryItemId,
  } = req.params;
  try {
    res.json(await getInventoryItem(inventoryItemId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

InventoryRouter.delete('/:inventoryId', middleware, async (req, res, next) => {
  const {
    inventoryId,
  } = req.params;
  try {
    const result = await deleteInventoryItem(inventoryId);
    res.json({
      status: 'OK, DELETED',
      id: result.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

InventoryRouter.put('/:inventoryId', middleware, async (req, res, next) => {
  const {
    productId,
    name,
    supplierId,
    shopId,
    count,
    price,
  } = req.body;

  try {
    const result = await updateInventoryItem(req.params.inventoryId, productId, name, supplierId, shopId, count, price);
    res.json({
      status: 'OK, UPDATED',
      id: result.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default InventoryRouter;
