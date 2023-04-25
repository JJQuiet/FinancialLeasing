

import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Link } from 'umi';
import { queryTenants } from './service';
import { handleRequest } from './service';

const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: '承租人名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/due-diligence/detail/${record.id}`}>{text}</Link>,
    },
    {
      title: '股权结构',
      dataIndex: 'equitystructure',
      key: 'equityStructure',
    },
    {
      title: '历史沿革',
      dataIndex: 'history',
      key: 'history',
    },
    {
      title: '关联公司',
      dataIndex: 'relatedcompanies',
      key: 'relatedCompanies',
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="承租人信息"
        actionRef={actionRef}
        rowKey="id"
        // request={(params, sorter, filter) =>
        //   queryTenants({ ...params, sorter, filter })
        // }
        request={handleRequest}
        columns={columns}
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};

export default IndexPage;