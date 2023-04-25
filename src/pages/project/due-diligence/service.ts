import request from 'umi-request';

export interface Tenant {
  id: string;
  name: string;
  equityStructure: string;
  history: string;
  relatedCompanies: string;
}
type incomeData = {
  year: string;
  revenue: number;
  profitMargin: string;
  evaluationValue: string;
};
type assetData = {
  year: string;
  totalAsset: number;
  currentAsset: number;
  fixedAsset: number;
  evaluationValue: string;
};

export interface Detail {
  id: string;
  incomeData: any[];
  assetData: any[];
  // other data omitted for brevity
}

export async function queryTenants(params?: any, sorter?: any, filter?: any) {
  return request('/api/tenants', {
    params: {
      ...params,
      sorter,
      filter,
    },
  });
}
export async function handleRequest(params: { current?: number; pageSize?: number }) {
  return request<{
    rows: Tenant[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from tenants',
        pagesize: params.pageSize,
        pageno: params.current,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
}
export async function queryTenantDetailIncome(params: { current?: number; pageSize?: number }) {
  return request<{
    rows: incomeData[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from incomedata',
        pagesize: params.pageSize,
        pageno: params.current,
        // sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
}
export async function queryTenantDetailAsset(params: { current?: number; pageSize?: number }) {
  return request<{
    rows: assetData[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from assetdata',
        pagesize: params.pageSize,
        pageno: params.current,
        // sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
}
export async function queryTenantDetail(
  id: string,
  tabKey: string,
  params?: any,
  sorter?: any,
  filter?: any,
) {
  return request(`/api/tenants/${id}/${tabKey}`, {
    params: {
      ...params,
      sorter,
      filter,
    },
  });
}

export async function updateTenantDetail(id: string, values: any) {
  return request(`/api/tenants/${id}`, {
    method: 'PUT',
    data: values,
  });
}
