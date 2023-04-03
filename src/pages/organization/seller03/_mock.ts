import { Request, Response } from 'express';
import type { Product } from './data.d'; // 不能写成 "./data "
import { reqdoSQL } from '../../../api/dosql';

async function getProducts(req: Request, res: Response) {
  let products: Product[] = [];
  products = (await reqdoSQL({ sqlprocedure: 'afl_004_products_test' })).rows;
  res.json({
    data: products,
    success: true,
    // total: products.length,
    // current: 2,
    // pageSize: 10
  });
}

function editProduct(req: Request, res: Response) {}

export default {
  'GET /api/products': getProducts,
  'DELETE /api/editProduct': editProduct,
};
