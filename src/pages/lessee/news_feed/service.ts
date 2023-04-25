import request from 'umi-request';
import { message } from 'antd';
import { Policy, Project, Training } from './data';
export async function getProjectData( ) {
  return request<{
    rows: Project[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from project',
        // pagesize: params.pageSize,
        // pageno: params.current,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
};
export async function getPolicyData() {
  return request<{
    rows: Policy[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from policy',
        // pagesize: params.pageSize,
        // pageno: params.current,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
};
export async function getTrainingData() {
  return request<{
    rows: Training[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from training',
        // pagesize: params.pageSize,
        // pageno: params.current,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
};