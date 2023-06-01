import request from 'umi-request';
import { message } from 'antd';
export async function handleRequest(params: { current?: number; pageSize?: number }) {
  return request<{
    rows: any[];
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
export async function getProjects({
  current = 1,
  pageSize = 10,
}: {
  current?: number;
  pageSize?: number;
}) {
  // export async function getProjects({ current = 1, pageSize = 10 ,status }: { current?: number, pageSize?: number ,status: string}) {
  return request<{
    rows: API.Project[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from financing_approval',
        pagesize: pageSize,
        pageno: current,
        // filtersql: `status='`+status+`'`,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    console.log(res);
    // return { data: res.rows, success: true };
    return { data: res.rows, total: res.total, success: true };
  });
}
export async function updateProject(id: number, { status }: { status: string }) {
  return request<{
    rows: API.Project[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        sqlprocedure: 'b08_updateProject',
        id: id,
        status: status,
      },
    },
  }).then((res) => {
    return res.rows[0];
    return { data: res.rows, total: res.total, success: true };
  });
}
export const updateAssment = async (id, value) => {
  console.log(
    '[ id ]-61-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/pages/project/project-approve/service」',
    id,
  );
  console.log(
    '[ value ]-61-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/pages/project/project-approve/service」',
    value,
  );
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b09_update_project_assessment',
        id: id,
        assessment: value,
      }),
    },
  }).then((res) => {
    console.log('sssssu');
  });
};

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
