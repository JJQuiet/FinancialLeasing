import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { Tenant } from '../services/tenant';

export interface TenantTableProps extends TableProps<Tenant> {}

const TenantTable: React.FC<TenantTableProps> = (props) => {
  const columns = [
    {
      title: '承租人名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '股权结构',
      dataIndex: 'equityStructure',
      key: 'equityStructure',
    },
    {
      title: '历史沿革',
      dataIndex: 'history',
      key: 'history',
    },
    {
      title: '关联公司',
      dataIndex: 'relatedCompanies',
      key: 'relatedCompanies',
    },
  ];

  return <Table {...props} columns={columns} rowKey="id" />;
};

export default TenantTable;