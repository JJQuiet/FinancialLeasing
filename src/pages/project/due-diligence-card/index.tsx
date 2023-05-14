//
// 用于显示承租人的基本信息和尽职调查的结果
// 文件名：LesseeInfo.tsx
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { queryLesseeInfo, queryDueDiligence } from './service';

// 定义承租人信息的接口类型
export interface LesseeInfo {
  id: string; // 承租人编号
  name: string; // 承租人名称
  equitystructure: string; // 股权结构
  history: string; // 历史沿革
  relatedcompanies: string; // 关联公司
}

// 定义尽职调查结果的接口类型
export interface DueDiligence {
  id: string; // 尽职调查编号
  lesseeId: string; // 承租人编号
  income: number; // 收入
  asset: number; // 资产
  debt: number; // 负债
  cost: number; // 成本
  risk: string; // 外部风险信息
  guarantee: string; // 对外担保情况
  repayment: string; // 还款情况
  intention: string; // 还款意愿
  reason: string; // 拖欠债务的原因
  plan: string; // 债务重组计划和还款方案
  source: string; // 主要还款来源和其他资产变卖可能性
  help: string; // 母公司、主管单位或政府部门帮助解决债务的可能性和代偿能力
  staff: string; // 职工人数和拖欠职工工资、保险等费用情况
}

// 定义尽职调查结果表格的列配置
const columns: ProColumns<DueDiligence>[]  = [
// const columns = [
  {
    title: '收入',
    dataIndex: 'income',
    valueType: 'money',
    align: 'right',
    width: '10%'
  },
  {
    title: '资产',
    dataIndex: 'asset',
    valueType: 'money',
    align: 'right',
    width: '10%'
  },
  {
    title: '负债',
    dataIndex: 'debt',
    valueType: 'money',
    align: 'right',
  },
  {
    title: '成本',
    dataIndex: 'cost',
    valueType: 'money',
    align: 'right',
  },
  {
    title: '外部风险信息',
    dataIndex: 'risk',
    ellipsis: true,
  },
  {
    title: '对外担保情况',
    dataIndex: 'guarantee',
    ellipsis: true,
  },
  {
    title: '还款情况',
    dataIndex: 'repayment',
    ellipsis: true,
  },
  {
    title: '还款意愿',
    dataIndex: 'intention',
    ellipsis: true,
  },
  {
    title: '拖欠债务的原因',
    dataIndex: 'reason',
    ellipsis: true,
  },
  {
    title: '债务重组计划和还款方案',
    dataIndex: 'plan',
    ellipsis: true,
  },
  {
    title: '主要还款来源和其他资产变卖可能性',
    dataIndex: 'source',
    ellipsis: true,
  },
  {
    title: '母公司、主管单位或政府部门帮助解决债务的可能性和代偿能力',
    dataIndex: 'help',
    ellipsis: true,
  },
  {
    title: '职工人数和拖欠职工工资、保险等费用情况',
    dataIndex: 'staff',
    ellipsis: true,
  },
];

// 定义前端页面的组件
const LesseeInfo: React.FC = () => {
  // 定义承租人信息的状态变量
  const [lesseeInfo, setLesseeInfo] = useState<LesseeInfo | undefined>(undefined);
  // 定义尽职调查结果的状态变量
  const [dueDiligence, setDueDiligence] = useState<DueDiligence | undefined>(undefined);
  // 定义综合风险评估值的状态变量
  const [riskValue, setRiskValue] = useState<number | undefined>(undefined);

  // 定义查询承租人信息的函数
  const handleQueryLesseeInfo = async (values: any) => {
    try {
      // 调用后端接口，传入承租人编号，获取承租人信息
      const res = await queryLesseeInfo(values.id);
      console.log('[ res ]-127-「handleQueryLesseeInfo /src/pages/project/due-diligence-card/index」', res);
      // 如果成功，更新承租人信息的状态变量
      if (res.success) {
        setLesseeInfo(res.data[0]);
      } else {
        // 如果失败，显示错误信息
        message.error(res.message);
      }
    } catch (error) {
      // 如果出现异常，显示异常信息
      message.error(error.message);
    }
  };

  // 定义查询尽职调查结果的函数
  const handleQueryDueDiligence = async (id: string) => {
    try {
      // 调用后端接口，传入承租人编号，获取尽职调查结果
      const res = await queryDueDiligence(id);
      // 如果成功，更新尽职调查结果的状态变量
      if (res.success) {
        setDueDiligence(res.data[0]);
        // 计算综合风险评估值，这里只是一个简单的示例，你需要根据你的具体逻辑进行修改
        const value =
          res.data[0].debt / res.data[0].asset + res.data[0].cost / res.data[0].income + Math.random(); // 随机数表示其他因素的影响，你需要根据你的具体逻辑进行修改
        setRiskValue(value);
      } else {
        // 如果失败，显示错误信息
        message.error(res.message);
      }
    } catch (error) {
      // 如果出现异常，显示异常信息
      message.error(error.message);
    }
  };

  // 定义当承租人信息变化时触发的副作用函数
  useEffect(() => {
    // 如果承租人信息存在，查询尽职调查结果
    if (lesseeInfo) {
      handleQueryDueDiligence(lesseeInfo.id);
    }
  }, [lesseeInfo]);

  return (
    <PageContainer>
      <ProCard>
        <ProForm onFinish={handleQueryLesseeInfo}>
          <ProFormText name="id" label="承租人编号" required />
          <ProFormText name="name" label="承租人名称" required />
          <ProForm.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </ProForm.Item>
        </ProForm>
      </ProCard>
      {lesseeInfo && (
        <ProCard title="承租人信息" style={{ marginTop: 16 }}>
          <p>股权结构：{lesseeInfo.equitystructure}</p>
          <p>历史沿革：{lesseeInfo.history}</p>
          <p>关联公司：{lesseeInfo.relatedcompanies}</p>
        </ProCard>
      )}
      {/* // 继续写下去 */}
      {dueDiligence && (
        <ProCard title="尽职调查结果" style={{ marginTop: 16 }}>
          <ProTable<DueDiligence>
            columns={columns}
            dataSource={[dueDiligence]}
            // pagination={false}
            pagination={{ defaultPageSize: 10, pageSizeOptions: [5, 8, 10, 12, 15] }}
            search={false}
          />
        </ProCard>
      )}
      {riskValue && (
        <ProCard title="综合风险评估值" style={{ marginTop: 16 }}>
          <p>{riskValue.toFixed(2)}</p>
        </ProCard>
      )}
    </PageContainer>
  );
};

export default LesseeInfo;
