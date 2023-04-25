import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Tabs } from 'antd';
import { Link } from 'umi';
import { queryTenantDetail, queryTenantDetailAsset, queryTenantDetailIncome } from './service';

const DetailPage: React.FC = () => {
  const [tabKey, setTabKey] = useState('income');

  const incomeColumns: ProColumns[] = [
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '收入（万元）',
      dataIndex: 'revenue',
      key: 'revenue',
    },
    {
      title: '利润率（%）',
      dataIndex: 'profitmargin',
      key: 'profitMargin',
    },
    {
      title: '评估值',
      dataIndex: 'evaluationvalue',
      key: 'evaluationValue',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => <Link to={`/due-diligence/edit/${record.id}`}>编辑</Link>,
    },
  ];

  // other columns omitted for brevity
  const assetColumns: ProColumns[] = [
    {
      title: '年份',
      dataIndex: 'year',
    },
    {
      title: '总资产',
      dataIndex: 'totalasset',
      // dataIndex: 'totalAsset',
    },
    {
      title: '流动资产',
      dataIndex: 'currentasset',
      // dataIndex: 'currentAsset',
    },
    {
      title: '固定资产',
      dataIndex: 'fixedasset',
      // dataIndex: 'fixedAsset',
    },
    {
      title: '评估值',
      dataIndex: 'evaluationvalue',
      // dataIndex: 'evaluationValue',
    }
  ];
  return (
    <PageContainer>
      <ProCard
        tabs={{
          activeKey: tabKey,
          onChange: (key) => setTabKey(key),
        }}
      >
        <ProCard.TabPane key="income" tab="收入">
          <ProTable
            headerTitle="收入数据"
            rowKey="id"
            request={queryTenantDetailIncome}
            // request={(params, sorter, filter) =>
            //   queryTenantDetail(id, tabKey, params, sorter, filter)
            // }
            columns={incomeColumns}
            pagination={{
              showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            toolBarRender={() => []}
          />
        </ProCard.TabPane>
        <ProCard.TabPane key="asset" tab="资产">
          <ProTable
            headerTitle="资产数据"
            rowKey="id"
            request={queryTenantDetailAsset}
            columns={assetColumns}
            // request={(params, sorter, filter) =>
            //   queryTenantDetail(id, tabKey, params, sorter, filter)
            // }
            // columns={assetColumns}
            pagination={{
              showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            toolBarRender={() => []}
          />
        </ProCard.TabPane>
        {/* other tabs omitted for brevity */}
      </ProCard>
    </PageContainer>
  );
};

export default DetailPage;
