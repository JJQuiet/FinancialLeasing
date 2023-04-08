import { Button, Table, message, Modal, Popconfirm } from 'antd';
import { connect } from 'umi';
import UserModal from './components/userModal';
import { useState } from 'react';
// const getTenantryFields = async (selectedRows: TenantryField[]) => {

// }

const Index = ({ tenantry03_dva_basicTable, dispatch }) => {
  const [isModalOpen, setIsModaOpen] = useState(false);
  const [record, setRecord] = useState(undefined);
  const onFinish = (values: any) => {
    setIsModaOpen(false);
    if (record) {
      dispatch({
        type: 'tenantry03_dva_basicTable/edit',
        payload: {
          values,
        },
      });
    } else {
      dispatch({
        type: 'tenantry03_dva_basicTable/add',
        payload: {
          values,
        },
      });
    }
    setRecord(undefined);
  };
  const handleEdit = (record) => {
    setRecord(record);
    setIsModaOpen(true);
  };
  const handleClose = () => {
    setRecord(undefined);
    setIsModaOpen(false);
  };
  const handleDelete = (record) => {
    setRecord(record);
  };
  const handleAdd = () => {
    // setRecord(undefined);
    setIsModaOpen(true);
  };
  const confirm = () => {
    dispatch({
      type: 'tenantry03_dva_basicTable/deleteRow',
      payload: {
        record,
      },
    });
  };
  const columns = [
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
      ellipsis: true,
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
    {
      title: 'avatar',
      dataIndex: 'avatar',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: '110px',
      render: (text, record) => (
        // <span><a onClick={handleEdit(record)}>edit</a> //只能接收一个函数的名字，不能传入参数；
        <span>
          <a
            onClick={() => {
              handleEdit(record);
            }}
          >
            edit
          </a>
          &nbsp;&nbsp;
          <Popconfirm
            title="是否确定删除?"
            onConfirm={confirm}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a
              onClick={() => {
                handleDelete(record);
              }}
            >
              Delete
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        新建
      </Button>
      <Table dataSource={tenantry03_dva_basicTable.data} columns={columns} rowKey="sysrowno" />
      <UserModal
        open={isModalOpen}
        close={handleClose}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};
const mapStateToProps = ({ tenantry03_dva_basicTable }) => {
  return {
    tenantry03_dva_basicTable,
  };
};
export default connect(mapStateToProps)(Index);
