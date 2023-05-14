import { request } from "umi";
import { DueDiligence,LesseeInfo } from ".";

export async function queryLesseeInfo(id:number) {
  console.log('[ id ]-5-「src/pages/project/due-diligence-card/service」', id);
  return request<{
    rows: LesseeInfo[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from tenants',
        // pagesize: params.pageSize,
        // pageno: params.current,
        // sortfield: 'id desc',
        filtersql: `id='`+ id+`'`
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
};
export async function queryDueDiligence(id:number) {
  return request<{
    rows: DueDiligence[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from duediligence',
        // pagesize: params.pageSize,
        // pageno: params.current,
        // sortfield: 'id desc',
        filtersql: `id=`+id,
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
}