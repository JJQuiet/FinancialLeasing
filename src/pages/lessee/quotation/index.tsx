import React, { useRef } from 'react';
import { Button } from 'antd';
import ProTable, { ActionType, EditableProTable, ProColumns } from '@ant-design/pro-table';
import { handleRequest } from './service';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

type QuotationData = {
  id?: number;
  equipment_id?: number;
  tenantry_name?: string;
  tenantry_phone?: string;
  equipment_name?: string;
  equipment_price?: number;
  equipment_amount?: number;
  lease_period?: number;
  lease_rate?: number;
  total_amount?: number;
  monthly_payment?: number;
  status?: string;
  create_time?: Date;
  update_time?: Date;
};

const columns: ProColumns<QuotationData>[] = [
  {
    title: '设备ID',
    dataIndex: 'equipment_id',
    editable: false,
    width: '6%',
  },
  {
    title: '设备名称',
    dataIndex: 'equipment_name',
    editable: false,
    width: '30%',
    ellipsis: true,
  },
  {
    title: '设备价格（元）',
    dataIndex: 'equipment_price',
    editable: false,
    width: '8%',
  },
  {
    title: '设备数量',
    dataIndex: 'equipment_amount',
    width: '7%',
  },
  {
    title: '租赁期限（月）',
    dataIndex: 'lease_period',
    width: '6%',
  },
  {
    title: '租赁利率（%）',
    dataIndex: 'lease_rate',
    editable: false,
    width: '6%',
  },
  {
    title: '租赁总金额（元）',
    // dataIndex: 'total_amount',
    editable: false,
    width: '8%',
    render: (_, record) => {
      // 根据数量、时间和单价计算金额
      const { equipment_amount = 0, lease_period = 0, equipment_price = 0 } = record;
      const amount = equipment_amount * lease_period * equipment_price;
      // return amount.toFixed(2);

      const { newTotalAmount } = calculateNewPrice(record);
      return newTotalAmount.toFixed(2);
    },
  },
  {
    title: '月供金额（元）',
    // dataIndex: 'monthly_payment',
    editable: false,
    width: '8%',
    render: (_, record) => {
      const { newMonthlyPayment } = calculateNewPrice(record);
      return newMonthlyPayment.toFixed(2);
    },
  },
];
// You can define a function to calculate the new price based on the edited values
const calculateNewPrice = (record) => {
  // Your logic here
  // For example:
  const newTotalAmount =
    record.equipment_price *
    record.equipment_amount *
    (1 + record.lease_rate * record.lease_period);
  //  const newTotalAmount = record.equipment_price * record.equipment_amount * (1 + record.lease_rate /100 * record.lease_period);
  const newMonthlyPayment = newTotalAmount / record.lease_period;
  return { newTotalAmount, newMonthlyPayment };
};
const QuotationTable = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // You can use a ref to get the action object
  const actionRef = useRef<ActionType>();

  // You can define a function to calculate the new price based on the edited values
  const calculateNewPrice = (record) => {
    // Your logic here
    // For example:
    const newTotalAmount =
      record.equipment_price *
      record.equipment_amount *
      (1 + record.lease_rate * record.lease_period);
    //  const newTotalAmount = record.equipment_price * record.equipment_amount * (1 + record.lease_rate /100 * record.lease_period);
    const newMonthlyPayment = newTotalAmount / record.lease_period;
    return { newTotalAmount, newMonthlyPayment };
  };

  // You can define a function to handle the click event of the button
  const handleClick = (record) => {
    // You can use actionRef to update the row data
    actionRef?.current?.updateRecord({
      ...record,
      ...calculateNewPrice(record),
    });
  };

  // You can add a column for the button
  columns.push({
    title: '操作',
    key: 'action',
    valueType: 'option',
    render: (text, record) => [
      <Button
        type="primary"
        key="editable"
        onClick={() => {
          actionRef?.current?.startEditable?.(record.id);
        }}
      >
        配置
      </Button>,
      <Button type="primary" onClick={() => handleClick(record)}>
        确定计算新价格
      </Button>,
    ],
  });

  return (
    <EditableProTable<QuotationData>
      columns={columns}
      request={handleRequest}
      rowKey="id"
      actionRef={actionRef}
      recordCreatorProps={false}
      pagination={{ defaultPageSize: 10, pageSizeOptions: [5, 8, 10, 12, 15] }}
      editable={{
        // Use this property to customize the editing behavior
        type: 'multiple', // Edit one cell at a time (default is 'cell')
        onSave: async (key, row) => {
          // Handle the save event
          console.log('[ currentUser ]-100-「src/pages/lessee/quotation/index」', currentUser);
        },
      }}
      toolBarRender={() => [
        <Button key="add" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  );
};

export default QuotationTable;
