import { Router } from 'express';
import { logRequest } from '../util/log';
import { doAnalytics } from '../util/analytics';
import {
  createShop,
  getShop,
  updateShop,
  deleteShop,
} from '../controllers/ShopController';

const ShopRouter = new Router();
const middleware = [logRequest, doAnalytics];

ShopRouter.post('/', async (req, res, next) => {
  const {
    name,
    inventoryId,
  } = req.body;
  const supplierId = req.baseUrl;
  console.log(`tf the supplier id ${supplierId}`);

  try {
    const result = await createShop(name, supplierId, inventoryId);
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

ShopRouter.get('/:shopId', middleware, async (req, res, next) => {
  const {
    shopId,
  } = req.params;

  try {
    res.json(await getShop(shopId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

ShopRouter.delete('/:shopId', middleware, async (req, res, next) => {
  const {
    shopId,
  } = req.params;

  try {
    const result = await deleteShop(shopId);
    res.json({
      status: 'OK, DELETED',
      id: result.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

ShopRouter.put('/:shopId', middleware, async (req, res, next) => {
  const {
    shopId,
  } = req.params;

  try {
    const result = await updateShop(shopId, req.body.name, req.body.supplierId, req.body.inventoryId);
    res.json({
      status: 'OK, UPDATED',
      id: result.id,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default ShopRouter;
