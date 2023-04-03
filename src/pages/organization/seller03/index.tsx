import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import type { Product } from './data';
import { getProducts } from './service';
import { Button, message } from 'antd';
import { reqdoSQL } from '../../../api/dosql';
import { useRef, useState } from 'react';

const handleRemove = async (selectedRows: Product[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const res = selectedRows.map((row) => row.key);
  const keys = res.toString();
  try {
    await reqdoSQL({
      sqlprocedure: 'afl_005_delete_product',
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

export default function Index() {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<Product[]>([]);
  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: '产品名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
  ];
  return (
    <PageContainer>
      <ProTable<Product>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        columns={columns}
        request={getProducts}
        pagination={{ pageSize: 10 }}
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
              <span>
                服务调用次数总计{' '}
                {selectedRowsState.reduce((pre, item) => pre + parseInt(item.key), 0)} 万
              </span>
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
}
