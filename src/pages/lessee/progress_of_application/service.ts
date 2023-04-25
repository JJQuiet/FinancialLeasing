import { request } from "umi";
interface FinancingLeasing {
  id: number; // the id of the financing leasing transaction
  application_name: string;
  progress: string; // the progress of the financing leasing transaction, such as '申请中', '审批中', '执行中', etc.
  status: string; // the status of the financing leasing transaction, such as '待审核', '已通过', '正常', '逾期', etc.
  contract: string; // the contract file of the financing leasing transaction
  bill: string; // the bill file of the financing leasing transaction
}
// 定义请求函数，从后端获取数据
export async function handleRequest(params: { current?: number; pageSize?: number }) {
  // 这里可以调用您的后端接口，传递分页参数和其他参数
  // 返回数据格式应该符合 { data: FinancingLeasingProject[]; success?: boolean; total?: number; } 的要求
  // 这里只是模拟一个简单的返回结果
  return request<{
    rows: FinancingLeasing[];
    total?: number;
    success?: boolean;
  }>('/doSQL', {
    params: {
      paramvalues: {
        selectsql: 'select * from progress_of_application',
        pagesize: params.pageSize,
        pageno: params.current,
        sortfield: 'id desc',
      },
    },
  }).then((res) => {
    return { data: res.rows, total: res.total, success: true };
  });
}