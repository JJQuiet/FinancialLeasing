// 定义项目审批页面
import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { getProjectsApproved } from './service';
import { history } from 'umi';

const ProjectApprove: React.FC = () => {
  const actionRef = useRef<ActionType>();

  

  const columns: ProColumns<API.Project>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    
    {
      title: '项目名称',
      dataIndex: 'project_name',
    },
    {
      title: '企业客户名称',
      dataIndex: 'company_name',
    },
    {
      title: '租赁物',
      dataIndex: 'leased_item',
    },
    {
      title: '该项目的申请时间',
      dataIndex: 'application_time',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
          <Button type="primary">签署合同</Button>
        ,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.Project>
        headerTitle="待签署合同列表"
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        search={{
          labelWidth: 120,
        }}
        request={(params) => getProjectsApproved({ ...params})}
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
        onRow={(record) => ({
          onDoubleClick: () => {
            history.push(`/contract/contract-sign/detail/${record.id}`); // 在此处添加路径，假设详情页面的路由为'/project-detail/:id'
          },
        })}
      />
    </>
  );
};

export default ProjectApprove;