import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { TenantryField } from './data';
import { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { SingleTenantryType, TenantryState, connect } from 'umi';
import { addRecord, deleteRecords, editRecord, handleRequest } from './service';
import UserModal from './components/userModal';

const handleRemove = async (selectedRows: TenantryField[]) => {
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
const Index = (tenantry: any) => {
  const [selectedRowsState, setSelectedRows] = useState<TenantryField[]>([]);
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModaOpen] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const onFinish = async (values: FormValues) => {
    // const onFinish = async (values: any) => {
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
  const columns = [
    { title: '公司名', dataIndex: 'name', key: 'name' },
    {
      title: '逾期率',
      dataIndex: 'overdue_rate',
      key: 'overdue_rate',
    },
    // {
    //   title: '未还清率',
  ];
  return (
    <PageContainer>
      <ProTable<TenantryField>
        headerTitle="客户列表"
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
          selectedRowsState.length === 1 ? (
            <Button type="primary" onClick={handleEdit}>
              修改
            </Button>
          ) : (
            ''
          ),
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

const mapStateToProps = ({ tenantry }: { tenantry: TenantryState }) => {
  return {
    tenantry,
  };
};

export default connect(mapStateToProps)(Index);
