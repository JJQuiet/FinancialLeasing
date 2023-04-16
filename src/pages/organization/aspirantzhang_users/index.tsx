import React, { useState, useRef, FC } from 'react';
import {
  Table,
  Tag,
  Modal,
  Button,
  Popconfirm,
  Pagination,
  message,
} from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { connect, Dispatch, Loading, UserState, useSelector } from 'umi';
import UserModal from './components/UserModal';
import { addRecord, editRecord } from './service';
import { SingleUserType, FormValues } from './data.d';

interface UserPageProps {
  aspirantzhang_users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const UserListPage: FC<UserPageProps> = ({
  aspirantzhang_users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const login_state = useSelector((state:any) => state.login);

  const columns: ProColumns<SingleUserType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleUserType) => [
        <a
          onClick={() => {
            editHandler(record);
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

  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  };

  const deleteHandler = (id: number) => {
    dispatch({
      type: 'aspirantzhang_users/delete',
      payload: {
        id,
      },
    });
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = async (values: FormValues) => {
    setConfirmLoading(true);
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
      setModalVisible(false);
      message.success(`${id === 0 ? 'Add' : 'Edit'} Successfully.`);
      resetHandler();
      setConfirmLoading(false);
    } else {
      setConfirmLoading(false);
      message.error(`${id === 0 ? 'Add' : 'Edit'} Failed.`);
    }
  };

  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };

  const resetHandler = () => {
    dispatch({
      type: 'aspirantzhang_users/getRemote',
      payload: {
        page: aspirantzhang_users.meta.page,
        per_page: aspirantzhang_users.meta.per_page,
      },
    });
  };

  const paginationHandler = (page: number, pageSize?: number) => {
    dispatch({
      type: 'aspirantzhang_users/getRemote',
      payload: {
        page,
        per_page: pageSize ? pageSize : aspirantzhang_users.meta.per_page,
      },
    });
  };

  const pageSizeHandler = (current: number, size: number) => {
    dispatch({
      type: 'aspirantzhang_users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };

  return (
    <div className="list-table">
      <div>{JSON.stringify(login_state)}</div>
      <ProTable
        columns={columns}
        dataSource={aspirantzhang_users.data}
        rowKey="id"
        loading={userListLoading}
        search={false}
        pagination={false}
        options={{
          density: true,
          fullScreen: true,
          reload: () => {
            resetHandler();
          },
          setting: true,
        }}
        headerTitle="User List"
        toolBarRender={() => [
          <Button type="primary" onClick={addHandler}>
            Add
          </Button>,
          <Button onClick={resetHandler}>Reload</Button>,
        ]}
      />
      <Pagination
        className="list-page"
        total={aspirantzhang_users.meta.total}
        onChange={paginationHandler}
        onShowSizeChange={pageSizeHandler}
        current={aspirantzhang_users.meta.page}
        pageSize={aspirantzhang_users.meta.per_page}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      ></UserModal>
    </div>
  );
};

const mapStateToProps = ({
  aspirantzhang_users,
  loading,
}: {
  aspirantzhang_users: UserState;
  loading: Loading;
}) => {
  return {
    aspirantzhang_users,
    userListLoading: loading.models.aspirantzhang_users,
  };
};

export default connect(mapStateToProps)(UserListPage);
