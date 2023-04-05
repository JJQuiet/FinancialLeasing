import { request } from 'umi';
import { TenantryField } from './data';

export async function getTenantry(params: { current?: number; pageSize?: number }) {
  return request<TenantryField>('/api/getTenantry', { method: 'GET', params });
}
