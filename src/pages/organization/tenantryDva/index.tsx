import { Button, message, Popconfirm } from 'antd';
import { Dispatch, connect, Loading, UserState } from 'umi';
import UserModal from './components/userModal';
import { useState, FC } from 'react';
import { SingleUserType, FormValues } from './data.d';
import { editRecord, addRecord } from './service';
import ProTable, { ProColumns } from '@ant-design/pro-table';
// const getTenantryFields = async (selectedRows: TenantryField[]) => {

// }
// 仿照aspirantzhang写的，数据也是用他的
interface UserPageProps {
  // users: {},
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const UserListPage: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {
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
      resetHandler();
    } else {
      message.error(`${id === 0 ? 'Add' : 'Edit'} Failed.`);
    }
  };
  const addHandler = () => {
    setIsModaOpen(true);
    setRecord(undefined);
  };
  const handleEdit = (record: SingleUserType) => {
    setRecord(record);
    setIsModaOpen(true);
  };
  const deleteHandler = (id: number) => {
    dispatch({
      type: 'users/delete',
      payload: {
        id,
      },
    });
  };
  const handleClose = () => {
    setIsModaOpen(false);
  };
  // const requestHandler = async ({pageSize,current}:{ pageSize:number, current:number }) => {
  //   const users = await getRemoteList ({
  //     page: current,
  //     per_page: pageSize,
  //   });
  //   return {
  //     data: users.data,
  //     success: true,
  //     total: users.meta.total,
  //   };
  // };
  
  const resetHandler = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: users.meta.page,
        per_page: users.meta.per_page,
      },
    });
  };
  const columns: ProColumns<SingleUserType>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      valueType: 'option',
      render: (text: string, record: SingleUserType) => [
        <a
          onClick={() => {
            handleEdit(record);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          title="Are you sure delete this user?"
          onConfirm={() => {
            deleteHandler(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <ProTable
        dataSource={users.data}
        // request={getRemoteList}
        // request={requestHandler}
        columns={columns}
        rowKey="id"
        // loading={false}
        loading={userListLoading}
        options={{
          // density: true,
          fullScreen: true,
          reload: () => {
            resetHandler();
          },
          // setting: true,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={addHandler}>
            Add
          </Button>,
          <Button onClick={resetHandler}>Reload</Button>,
        ]}
      />
      <UserModal
        open={isModalOpen}
        close={handleClose}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};
const mapStateToProps = ({ users, loading }: { users: UserState; loading: Loading }) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};
export default connect(mapStateToProps)(UserListPage);
