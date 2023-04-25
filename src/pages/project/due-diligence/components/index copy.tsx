// 尽职调查.tsx
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import { queryDueDiligenceList } from '@/services/api';
import DueDiligenceDetail from './DueDiligenceDetail';

export type DueDiligenceItem = {
  id: number;
  customerName: string;
  supplierName: string;
  leaseItem: string;
  status: string;
  // 添加更多的字段
  customerType: string; // 客户类型
  customerIndustry: string; // 客户行业
  customerAddress: string; // 客户地址
  supplierType: string; // 供应商类型
  supplierIndustry: string; // 供应商行业
  supplierAddress: string; // 供应商地址
  leaseAmount: number; // 租赁金额
  leaseTerm: number; // 租赁期限
};

const DueDiligence: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<DueDiligenceItem | null>(null);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<DueDiligenceItem>[] = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
    },
    {
      title: '供应商名称',
      dataIndex: 'supplier',
    },
    {
      title: '租赁物',
      dataIndex: 'leaseItem',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        pending: { text: '待审批', status: 'Default' },
        approved: { text: '已审批', status: 'Success' },
        rejected: { text: '已驳回', status: 'Error' },
      },
    },
    // 添加更多的列
    {
      title: '客户类型',
      dataIndex: 'customerType',
    },
    {
      title: '客户行业',
      dataIndex: 'customerIndustry',
    },
    {
      title: '客户地址',
      dataIndex: 'customerAddress',
    },
    {
      title: '供应商类型',
      dataIndex: 'supplierType',
    },
    {
      title: '供应商行业',
      dataIndex: 'supplierIndustry',
    },
    {
      title: '供应商地址',
      dataIndex: 'supplierAddress',
    },
    {
      title: '租赁金额',
      dataIndex: 'leaseAmount',
      valueType: 'money',
    },
    {
      title: '租赁期限',
      dataIndex: 'leaseTerm',
      valueType: 'digit',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setCurrentItem(record);
            setVisible(true);
          }}
        >
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<DueDiligenceItem>
        headerTitle="尽职调查列表"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryDueDiligenceList(params)}
        columns={columns}
        rowSelection={{}}
        toolBarRender={() => [<Button type="primary">新增</Button>, <Button>导出</Button>]}
      />
      <Modal
        title="尽职调查详情"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        {currentItem && <DueDiligenceDetail item={currentItem} />}
      </Modal>
    </PageHeaderWrapper>
  );
};

export default DueDiligence;
