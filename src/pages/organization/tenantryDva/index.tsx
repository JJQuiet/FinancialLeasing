import { Button, Table, message, Modal } from 'antd';
import { connect } from 'umi';
import UserModal from './components/userModal';
import { useState } from 'react';
// const getTenantryFields = async (selectedRows: TenantryField[]) => {

// }

const Index = ({ index,dispatch }) => {
  const [isModalOpen, setIsModaOpen] = useState(false);
  const [record, setRecord] = useState(undefined);
  const onFinish = (values: any,record: any) => {
    const id = record.id;
    dispatch({
      type: 'index/edit',
      payload: {
        id,
        values
      },
    })
  };
  const handleEdit = (record:any) => {
    setRecord(record);
    setIsModaOpen(true);
  };
  const handleClose = () => {
    setIsModaOpen(false);
  };
  const columns = [
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
      render: (text:any, record:any) => (
        // <span><a onClick={handleEdit(record)}>edit</a> //只能接收一个函数的名字，不能传入参数；
        <span>
          <a
            onClick={() => {
              handleEdit(record);
            }}
          >
            edit
          </a>
          &nbsp;&nbsp;&nbsp;
          <a>delete</a>
        </span>
      ),
    },
  ];

  return (
    <div className="jjq list-table">
      <Table dataSource={index.data} columns={columns} rowKey="id" />
      <UserModal
        open={isModalOpen}
        close={handleClose}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};
const mapStateToProps = ({ index }) => {
  return {
    index,
  };
};
export default connect(mapStateToProps)(Index);
// export default Index;
