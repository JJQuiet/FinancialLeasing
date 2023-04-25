import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { useRef, useState } from 'react';
import { Button, message } from 'antd';
// import { SingleTenantryType,  } from 'umi';
import { addRecord, deleteRecords, editRecord, handleRequest } from './service';
import UserModal from './components/userModal';

const handleRemove = async (selectedRows: API.CurrentUser[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  const res = selectedRows.map((row) => row.phone);
  const keys = res.toString();
  const len = res.length;
  try {
    await deleteRecords({ keys, len });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const Index = () => {
  const [selectedRowsState, setSelectedRows] = useState<API.CurrentUser[]>([]);
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModaOpen] = useState(false);
  const [record, setRecord] = useState<API.CurrentUser | undefined>(undefined);
  const onFinish = async (values: any) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    let serviceFun;
    if (id) {
      serviceFun = editRecord;
    } else {
      serviceFun = addRecord;
    }
    const result = await serviceFun({ id, values });
    if (result) {
      setIsModaOpen(false);
      message.success(`${id === 0 ? 'Add' : 'Edit'} Successfully.`);
      actionRef.current?.reloadAndRest?.();
      // resetHandler();
    } else {
      message.error(`${id === 0 ? 'Add' : 'Edit'} Failed.`);
    }
  };
  const addHandler = () => {
    setIsModaOpen(true);
    setRecord(undefined);
  };
  const handleEdit = () => {
    const record = selectedRowsState[0];
    setRecord(record);
    setIsModaOpen(true);
  };
  const handleClose = () => {
    setIsModaOpen(false);
  };
  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: '抵押品名称',
      dataIndex: 'mortgage_name',
      ellipsis: true,
    },
    {
      title: '财产类型',
      dataIndex: 'property_type',
      ellipsis: true,
    },
    {
      title: '有效期限',
      dataIndex: 'validity_period',
      ellipsis: true,
    },
    {
      title: '抵押物债权金额',
      dataIndex: 'mortgage_rights_amount',
      ellipsis: true,
    },
    {
      title: '处置方式',
      dataIndex: 'disposal_method',
    },
    {
      title: '保存状态',
      dataIndex: 'storage_status',
      ellipsis: true,
    },
    {
      title: '评估金额',
      dataIndex: 'assessed_amount',
      ellipsis: true,
    },
    {
      title: '抵押权受让方',
      dataIndex: 'mortgage_rights_party',
      ellipsis: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.CurrentUser>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="sysrowno"
        columns={columns}
        request={handleRequest}
        pagination={{ defaultPageSize: 10, pageSizeOptions: [5, 8, 10, 12, 15] }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          selectedRowsState.length===1?<Button type="primary" onClick={handleEdit}>
            修改
          </Button>:'',
          <Button type="primary" onClick={addHandler}>
            新增
          </Button>,
        ]}
      />

      <UserModal
        open={isModalOpen}
        close={handleClose}
        record={record}
        onFinish={onFinish}
      ></UserModal>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
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


export default Index;
