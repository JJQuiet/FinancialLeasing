import request from 'umi-request';
import { message } from 'antd';
export const getRemoteList = async () => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(JSON.stringify({ sqlprocedure: 'b02_select_all_tenantry' })),
    {
      method: 'GET',
    },
  )
    .then(function (response) {
      return {data:response.rows,success:true};
    })
    .catch(function (error) {
    });
};
export const editRecord = async ({ values }) => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(
        JSON.stringify({
          sqlprocedure: 'b05_edit_tenantry_basicTable_changeCompanyName_baseEmail',
          company_name: values.company_name,
          email: values.email,
        }),
      ),
    {},
  )
    .then(function (response) {
      message.success('编辑成功！');
      return response;
    })
    .catch(function (error) {});
};
export const addRecord = async ({ values }) => {
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
    {},
  )
    .then(function (response) {
      message.success('添加成功！');
      return response;
    })
    .catch(function (error) {});
};
export const deleteRecord = async ({ record }) => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(
        JSON.stringify({ sqlprocedure: 'b04_delete_tenantry_basicTable', email: record.email }),
      ),
    {
      method: 'post',
    },
  )
    .then(function (response) {
      message.success('删除成功！');
      return response;
    })
    .catch(function (error) {});
};
