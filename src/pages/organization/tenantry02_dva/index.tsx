import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { TenantryField } from './data';
import { useRef, useState } from 'react';
import { reqdoSQL } from '@/api/dosql';
import { Button, message } from 'antd';
import { getRemoteList } from '../tenantry02_dva/service';
import { SingleTenantryType, TenantryState, connect } from 'umi';
// const getTenantryFields = async (selectedRows: TenantryField[]) => {

// }
const handleRequest = async ({ pageSize, current }: { pageSize: number; current: number }) => {
  const data = await getRemoteList({ pageSize, current });
  return data;
};
const handleRemove = async (selectedRows: TenantryField[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const res = selectedRows.map((row) => row.phone);
  const keys = res.toString();
  try {
    await reqdoSQL({
      sqlprocedure: 'b07_delete_tenantry',
      keys: keys,
      len: res.length,
    });

    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const Index = (tenantry02_dva: any) => {
  const [selectedRowsState, setSelectedRows] = useState<TenantryField[]>([]);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<SingleTenantryType>[] = [
    {
      title: '法人代表',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      ellipsis: true,
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '公司名称',
      dataIndex: 'company_name',
    },
    {
      title: '法定代表人',
      dataIndex: 'legal_representative',
      ellipsis: true,
    },
    {
      title: '注册资本',
      dataIndex: 'registered_capital',
      ellipsis: true,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'unified_social_credit_code',
      ellipsis: true,
    },
    {
      title: '公司官网',
      dataIndex: 'official_site',
      ellipsis: true,
    },
    {
      title: '公司地址',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: '公司电话',
      dataIndex: 'phone_company',
      ellipsis: true,
    },
    {
      title: '公司英文名',
      dataIndex: 'company_name_english',
      ellipsis: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable<TenantryField>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="sysrowno"
        columns={columns}
        request={handleRequest}
        // pagination={{ current:2,pageSize: 12 }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
              {/* <span>
                服务调用次数总计{' '}
                {selectedRowsState.reduce((pre, item) => pre + parseInt(item.key), 0)} 万
              </span> */}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

const mapStateToProps = ({ tenantry02_dva }: { tenantry02_dva: TenantryState }) => {
  return {
    tenantry02_dva,
  };
};

export default connect(mapStateToProps)(Index);
