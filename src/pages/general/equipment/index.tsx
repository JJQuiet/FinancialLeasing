import { useState, useEffect, useRef } from 'react';
import { Button, Menu, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { EquipmentType, EquipmentInfo } from './data.d';
import EquipmentTypeForm from './components/EquipmentTypeForm';
import EquipmentInfoForm from './components/EquipmentInfoForm';
import {
  getEquipmentTypes,
  getEquipmentInfos,
  addEquipmentType,
  addEquipmentInfo,
  deleteEquipmentType,
  deleteEquipmentInfo,
  editEquipmentInfo,
  deleteRecords,
} from './service';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { request } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';

const Equipment: React.FC = () => {
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentInfo[]>([]);
  const [selectedType, setSelectedType] = useState<Number | null>(1);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentInfo | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [typeFormVisible, setTypeFormVisible] = useState(false);
  const [infoFormVisible, setInfoFormVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState([]);

  useEffect(() => {
    getEquipmentTypes().then((res) => setEquipmentTypes(res.rows));
    getEquipmentInfos().then((res) => setEquipmentInfo(res.rows));
  }, []);

  const handleRowDoubleClick = (record: EquipmentInfo) => {
    setSelectedEquipment(record);
  };

  const handleDelete = (ids: string[]) => {
    if (ids.length === 0) return;
    const isTypeDelete = ids[0].indexOf('-') === -1;
    if (isTypeDelete) {
      deleteEquipmentType(ids).then(() => {
        setSelectedType(null);
        getEquipmentTypes().then((res) => setEquipmentTypes(res.rows));
      });
    } else {
      deleteEquipmentInfo(ids).then(() => {
        setSelectedEquipment(null);
        getEquipmentInfos().then((res) => setEquipmentInfo(res.rows));
      });
    }
  };

  const columns: ProColumns<EquipmentInfo>[] = [
    {
      title: '设备型号',
      dataIndex: 'model_number',

      // width: 150,
      render: (text: string, record: EquipmentInfo) => (
        <div
          style={{
            fontWeight: selectedEquipment?.id === record.id ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedEquipment(record)}
        >
          {text}
        </div>
      ),
    },
    {
      title: '设备制造商',
      dataIndex: 'manufacturer',
    },
    {
      title: '设备供应商',
      dataIndex: 'supplier',
      width: 150,
    },
    {
      title: '生产年份',
      dataIndex: 'production_year',
      width: 100,
    },
    {
      title: '机械设备规格',
      dataIndex: 'specifications',
      ellipsis: true,
      // width: 150,
    },
    {
      title: '设备其他信息',
      dataIndex: 'notes',
      ellipsis: true,
    },

    {
      title: '机械设备型号图片',
      dataIndex: 'image_url',
      render: (text: string, record: EquipmentInfo) => {
        return <img src={text} alt={record.model_number} style={{ width: 100, height: 100 }} />;
      },
    },
  ];
  const handleDeleteType = (typeId) => {
    // 发送 DELETE 请求删除设备类型，并更新设备类型列表
    deleteEquipmentType(typeId).then(() => {
      message.success('删除成功');
      getEquipmentTypes().then((res) => setEquipmentTypes(res.rows));
      setSelectedType(null);
    });
  };
  const deleteType = (type_id, type_name) => {
    Modal.confirm({
      title: (
        <div>
          确认删除 <strong>{type_name}</strong> ?
        </div>
      ),
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        // 执行删除操作
        request('/doSQL', {
          params: {
            paramvalues: {
              sqlprocedure: `delete_equipment_type`,
              id: type_id,
            },
          },
        }).then(() => {
          getEquipmentTypes().then((res) => setEquipmentTypes(res.rows));
        });
      },
    });
  };
  const handleRemove = async (selectedRowKeys) => {
    const hide = message.loading('正在删除');
    if (!selectedRowKeys) return true;
    // const res = selectedRows.map((row) => row.phone);
    const keys = selectedRowKeys.toString();
    // const keys = res.toString();
    const len = selectedRowKeys.length;
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

  return (
    <div>
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <div style={{ overflow: 'auto', width: 'auto' }}>
          <Menu
            mode="inline"
            selectedKeys={selectedType ? [selectedType.toString()] : []}
            onClick={({ key }) => {
              setSelectedType(parseInt(key));
            }}
            // onContextMenu={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            //   showContextMenu(e);
            // }}
          >
            {equipmentTypes.map((type) => (
              <Menu.Item
                key={type.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  deleteType(type.id, type.type_name);
                }}
              >
                {type.type_name}
              </Menu.Item>
            ))}
            <Menu.Item
              key="add"
              // icon={<PlusOutlined />}
              style={{ marginTop: 10 }}
              onClick={() => {
                setTypeFormVisible(true);
              }}
            >
              {<PlusOutlined />}
            </Menu.Item>
          </Menu>
        </div>
        {/* 表格数据展示区域 */}
        <div style={{ overflow: 'auto', flex: 1 }}>
          <ProTable
            rowKey="id"
            actionRef={actionRef}
            // dataSource={equipmentInfo}
            dataSource={equipmentInfo.filter((info) => Number(info.type_id) === selectedType)}
            columns={columns}
            rowSelection={
              selectedRowKeys.length > 0
                ? {
                    selectedRowKeys,
                    onChange: (_, selectedRow) => {
                      setSelectedRowKeys(selectedRow.map((row) => row.id));
                      // setSelectedRowKeys(selectedRowKeys);
                    },
                  }
                : undefined
            }
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
              onDoubleClick: () => {
                const selected = selectedRowKeys.includes(record.id);
                if (selected) {
                  const newSelectedRowKeys = selectedRowKeys.filter((key) => key !== record.id);
                  setSelectedRowKeys(newSelectedRowKeys);
                } else {
                  const newSelectedRowKeys = [...selectedRowKeys, record.id];
                  setSelectedRowKeys(newSelectedRowKeys);
                }
              },
            })}
            options={{
              density: ['small', 'middle', 'large'],
              fullScreen: true,
              reload: () => getEquipmentInfos().then((res) => setEquipmentInfo(res.rows)),
              setting: true,
            }}
            toolBarRender={() => [
              //表格上方的工具栏
              selectedRowKeys.length === 1 ? (
                <Button
                  type="primary"
                  danger
                  onClick={() => editEquipmentInfo(selectedRowKeys[0], selectedEquipment)}
                >
                  修改
                </Button>
              ) : (
                ''
              ),
              selectedRowKeys.length > 0 ? (
                <Button type="primary" danger onClick={() => handleDelete(selectedRowKeys)}>
                  删除
                </Button>
              ) : (
                ''
              ),
              // <Button type="primary" onClick={() => setTypeFormVisible(true)}>
              //   添加设备类型
              // </Button>,
              <Button
                type="primary"
                // disabled={selectedRowKeys.length !== 1}
                onClick={() => setInfoFormVisible(true)}
              >
                添加设备信息
              </Button>,
            ]}
          />
          {selectedRowKeys?.length > 0 && (
            <FooterToolbar
              extra={
                <div>
                  已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项 &nbsp;&nbsp;
                </div>
              }
            >
              <Button
                onClick={async () => {
                  await handleRemove(selectedRowKeys);
                  setSelectedRows([]);
                  getEquipmentInfos().then((res) => setEquipmentInfo(res.rows));
                  actionRef.current?.reloadAndRest?.();
                }}
              >
                批量删除
              </Button>
            </FooterToolbar>
          )}
        </div>
      </div>
      <EquipmentTypeForm
        visible={typeFormVisible}
        onCancel={() => setTypeFormVisible(false)}
        onFinish={(values) => {
          addEquipmentType(values).then(() => {
            setSelectedType(null);
            getEquipmentTypes().then((res) => setEquipmentTypes(res.rows));
          });
          setTypeFormVisible(false);
        }}
      />
      <EquipmentInfoForm
        visible={infoFormVisible}
        onCancel={() => setInfoFormVisible(false)}
        onFinish={(values) => {
          addEquipmentInfo({ ...values, type_id: selectedType }).then(() => {
            setSelectedEquipment(null);
            getEquipmentInfos().then((res) => setEquipmentInfo(res.rows));
            actionRef.current?.reloadAndRest?.();
          });
          setInfoFormVisible(false);
        }}
        equipmentType={selectedType}
        initialValues={selectedEquipment}
      />
    </div>
  );
};

export default Equipment;
