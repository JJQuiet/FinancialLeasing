import { Request, Response } from 'express';
import type { TenantryField } from './data.d'; // 不能写成 "./data "
import { reqdoSQL } from '../../../api/dosql';

async function getTenantry(req: Request, res: Response) {
  let tenantrys: TenantryField[] = [];
  tenantrys = (await reqdoSQL({ sqlprocedure: 'b02_select_all_tenantry' })).rows;
  res.json({
    data: tenantrys,
    success: true,
  });
}
function editProduct(req: Request, res: Response) {}

export default {
  'GET /api/getTenantry': getTenantry,
  'DELETE /api/editProduct': editProduct,
};
