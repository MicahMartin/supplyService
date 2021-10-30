import { Router } from 'express';
import { logRequest } from '../util/log';
import { doAnalytics } from '../util/analytics';
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/ProductController';

const ProductRouter = new Router();
const middleware = [logRequest, doAnalytics];

ProductRouter.post('/', async (req, res, next) => {
  const {
    name,
    sku,
    weight
  } = req.body;

  try {
    console.log('creating product');
    const result = await createProduct(name, sku, weight);
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

ProductRouter.get('/:productId', middleware, async (req, res, next) => {
  const {
    productId,
  } = req.params;
  try {
    res.json(await getProduct(productId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

ProductRouter.delete('/:productId', middleware, async (req, res, next) => {
  const {
    productId,
  } = req.params;
  try {
    const result = await deleteProduct(productId);
    res.json({
      status: 'OK, DELETED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

ProductRouter.put('/:productId', middleware, async (req, res, next) => {
  const {
    productId,
  } = req.params;

  try {
    const result = await updateProduct(productId, req.body.name, req.body.sku, req.body.weight);
    res.json({
      status: 'OK, UPDATED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default ProductRouter;
