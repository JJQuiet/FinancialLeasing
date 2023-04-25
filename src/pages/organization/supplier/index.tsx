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
