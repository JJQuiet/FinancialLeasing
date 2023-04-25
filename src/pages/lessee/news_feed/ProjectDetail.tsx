// 文件名：src/pages/LeaseCustomer/ProjectDetail.tsx
// 这是项目详情的页面，用于显示承租客户选择的融资租赁项目的详细信息，包括项目名称、类型、金额、状态、合同、还款计划等

import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Table } from 'antd';
import { useRequest } from 'umi';
import { Project, Contract, Repayment } from './data.d';

interface ProjectDetailProps {
  // 使用match属性来获取路由参数中的项目id
  match: {
    params: {
      id: string;
    };
  };
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ match }) => {
  // 定义四个状态变量，分别用于存储项目、合同、还款计划和当前还款期数的数据
  const [project, setProject] = useState<Project>();
  const [contract, setContract] = useState<Contract>();
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<number>(0);

  // 使用useRequest hook来发送请求，获取后端数据，传入项目id作为参数
  const { data: projectData } = useRequest(`/api/project/${match.params.id}`);
  const { data: contractData } = useRequest(`/api/contract/${match.params.id}`);
  const { data: repaymentData } = useRequest(`/api/repayment/${match.params.id}`);

  // 使用useEffect hook来更新状态变量，当请求数据变化时触发
  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  useEffect(() => {
    if (contractData) {
      setContract(contractData);
    }
  }, [contractData]);

  useEffect(() => {
    if (repaymentData) {
      setRepayments(repaymentData);
      // 计算当前还款期数，假设已经还款的期数的状态为已还清
      const current = repaymentData.findIndex(
        (item) => item.status !== '已还清',
      );
      setCurrentPeriod(current + 1);
    }
  }, [repaymentData]);

  // 定义一个表格的列配置数组，包含期数、应还日期、应还金额、实还金额、实还日期和状态等列
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '应还日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: '应还金额',
      dataIndex: 'dueAmount',
      key: 'dueAmount',
    },
    {
      title: '实还金额',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
    },
    {
      title: '实还日期',
      dataIndex: 'paidDate',
      key: 'paidDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // 返回一个PageContainer组件，包含两个Card组件，第一个Card组件中有一个Descriptions组件，用于显示项目和合同的基本信息，第二个Card组件中有一个Table组件，用于显示还款计划的表格
  return (
    <PageContainer>
      <Card>
        <Descriptions title="项目信息" bordered>
          <Descriptions.Item label="项目名称">
            {project?.name}
          </Descriptions.Item>
          <Descriptions.Item label="项目类型">
            {project?.type}
          </Descriptions.Item>
          <Descriptions.Item label="项目金额">
            {project?.amount}
          </Descriptions.Item>
          <Descriptions.Item label="项目状态">
            {project?.status}
          </Descriptions.Item>
          <Descriptions.Item label="合同编号">
            {contract?.id}
          </Descriptions.Item>
          <Descriptions.Item label="合同编号">
            {contract?.signDate}
          </Descriptions.Item>
          <Descriptions.Item label="合同编号">
            {contract?.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="合同编号">
            {contract?.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="合同编号">
            {contract?.number}
          </Descriptions.Item>
          <Descriptions.Item label="合同编号">
            {contract?.fileUrl}
          </Descriptions.Item>
          </Descriptions>
          </Card>
          <Card>

          </Card>
          </PageContainer>
  )
};
export default ProjectDetail;