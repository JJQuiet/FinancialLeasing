import { request } from 'umi';
import { Product } from './data';

export async function getProducts(params: { current?: number; pageSize?: number }) {
  return request<Product>('/api/products', { method: 'GET', params });
}

/** 删除规则 DELETE /api/rule */
export async function removeProduct(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/editProduct', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
