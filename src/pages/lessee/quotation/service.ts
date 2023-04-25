import request from 'umi-request';
import { message } from 'antd';
import { QuotationField } from './typing';
export async function handleRequest(params: { current?: number; pageSize?: number }) {
  return request<{
    rows: QuotationField[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from quotation_info',
        pagesize: params.pageSize,
        pageno: params.current,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
}
export const editRecord = async ({ id, values }: any) => {
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b05_edit_tenantry',
        id: id,
        email: values.email,
        name: values.name,
        phone: values.phone,
        company_name: values.company_name,
        legal_representative: values.legal_representative,
        registered_capital: values.registered_capital,
        unified_social_credit_code: values.unified_social_credit_code,
        official_site: values.official_site,
        address: values.address,
        phone_company: values.phone_company,
        company_name_english: values.company_name_english,
        avatar: values.avatar,
      }),
    },
  })
    .then(function (response) {
      message.success('编辑成功！');
      return response;
    })
    .catch(function (error) {});
};
export const addRecord = async ({ values }: any) => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(
        JSON.stringify({
          sqlprocedure: 'b06_add_tenantry_basicTable_no_foreignkey',
          email: values.email,
          name: values.name,
          phone: values.phone,
          company_name: values.company_name,
          legal_representative: values.legal_representative,
          registered_capital: values.registered_capital,
          unified_social_credit_code: values.unified_social_credit_code,
          official_site: values.official_site,
          address: values.address,
          phone_company: values.phone_company,
          company_name_english: values.company_name_english,
          avatar: values.avatar,
        }),
      ),
  )
    .then(function (response) {
      message.success('添加成功！');
      return response;
    })
    .catch(function (error) {});
};
export const deleteRecord = async ({ record }) => {
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b04_delete_tenantry_basicTable',
        email: record.email,
      }),
    },
  })
    .then((res) => {
      message.success('删除成功！');
      return res;
    })
    .catch(function (error) {});
};
export const deleteRecords = async (params: any) => {
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b07_delete_tenantry',
        ...params,
      }),
    },
  })
    .then((res) => {
      message.success('删除成功！');
      return res;
    })
    .catch(function (error) {});
};
