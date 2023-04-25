
// 引入相关组件和类型
import React, { useRef } from 'react';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { signContract, verifyContract } from './signService'; // 电子签章服务

// 定义合同数据的类型
type Contract = {
  id: string;
  title: string;
  content: string;
  signature: string;
};

// 定义表格列的类型
type TableColumns = {
  title: string;
  dataIndex: string;
  render?: (text: any, record: Contract) => JSX.Element;
};

// 定义表格列
const columns: TableColumns[] = [
  {
    title: '合同编号',
    dataIndex: 'id',
  },
  {
    title: '合同标题',
    dataIndex: 'title',
  },
  {
    title: '合同内容',
    dataIndex: 'content',
    render: (text) => <ProFormTextArea disabled value={text} />,
  },
  {
    title: '操作',
    dataIndex: 'option',
    render: (_, record) => (
      <>
        <Button
          type="primary"
          onClick={() => {
            // 调用电子签章服务进行签署
            signContract(record.id).then((res) => {
              // 更新表格数据
              actionRef.current?.reload();
            });
          }}
        >
          签署
        </Button>
        <Button
          type="default"
          onClick={() => {
            // 调用电子签章服务进行验证
            verifyContract(record.id).then((res) => {
              // 显示验证结果
              alert(res.message);
            });
          }}
        >
          验证
        </Button>
      </>
    ),
  },
];

// 定义页面组件
const ContractPage: React.FC = () => {
  // 获取表格的引用，用于更新数据
  const actionRef = useRef<ActionType>();

  return (
    <div>
      <ProForm<Contract>
        onFinish={(values) => {
          // 提交表单数据，创建新的合同
          createContract(values).then((res) => {
            // 更新表格数据
            actionRef.current?.reload();
          });
        }}
      >
        <ProFormText name="title" label="合同标题" />
        <ProFormTextArea name="content" label="合同内容" />
      </ProForm>
      <ProTable<Contract>
        columns={columns}
        actionRef={actionRef}
        request={(params) => {
          // 请求后端接口，获取合同数据
          return getContracts(params);
        }}
      />
    </div>
  );
};

export default ContractPage;