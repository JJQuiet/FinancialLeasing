// 定义项目审批页面
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { getProjects, updateProject } from './service';

const ProjectApprove: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleApprove = async (id: number) => {
    // 审批通过操作
    try {
      const res = await updateProject(id, { status: 'approved' });
      if (res.status === 'approved') {
        message.success('审批通过');
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error('审批失败');
    }
  };

  const handleReject = async (id: number) => {
    // 审批拒绝操作
    try {
      const res = await updateProject(id, { status: 'rejected' });
      if (res.status === 'rejected') {
        message.success('审批拒绝');
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error('审批失败');
    }
  };

  const columns: ProColumns<API.Project>[] = [
    {
      title: '项目编号',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: '客户名称',
      dataIndex: 'customer',
      search: false,
    },
    {
      title: '租赁物名称',
      dataIndex: 'item',
      search: false,
    },
    {
      title: '租赁期限（月）',
      dataIndex: 'term',
      search: false,
    },
    {
      title: '租赁金额（元）',
      dataIndex: 'amount',
      search: false,
    },
    // 新增列：项目类型
    {
      title: '项目类型',
      dataIndex: 'type',
      search: false,
    },
    // 新增列：供应商名称
    {
      title: '供应商名称',
      dataIndex: 'supplier',
      search: false,
    },
    // 新增列：租赁方式
    {
      title: '租赁方式',
      dataIndex: 'mode',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm
          key="approve"
          title="确定审批通过吗？"
          onConfirm={() => handleApprove(record.id)}
        >
          <Button type="primary">通过</Button>
        </Popconfirm>,
        <Popconfirm key="reject" title="确定审批拒绝吗？" onConfirm={() => handleReject(record.id)}>
          <Button type="default">拒绝</Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Project>
        headerTitle="待审批项目列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params) => getProjects({ ...params, status: 'pending' })}
        columns={columns}
        pagination={{
          // showQuickJumper: true,
          pageSizeOptions:[5,8,10,15,20],
          defaultPageSize: 10
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
      />
    </PageContainer>
  );
};

export default ProjectApprove;
