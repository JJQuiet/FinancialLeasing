import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Collapse, Menu, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
} from './service';
import { ColumnProps } from 'antd/lib/table';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const { Panel } = Collapse;

const Equipment: React.FC = () => {
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentInfo[]>([]);
  const [selectedType, setSelectedType] = useState<Number | null>(1);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentInfo | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [typeFormVisible, setTypeFormVisible] = useState(false);
  const [infoFormVisible, setInfoFormVisible] = useState(false);

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
      title: '设备制造商名称',
      dataIndex: 'manufacturer',
    },
    {
      title: '设备供应商名称',
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

  return (
    // <PageContainer>
    <div>
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* <div style={{ overflow: 'auto', flex: 1 }}> */}
        <div style={{ overflow: 'auto', width: 'auto' }}>
          <Menu
            mode="inline"
            selectedKeys={selectedType ? [selectedType.toString()] : []}
            // style={{ width: 256 }}
            onClick={({ key }) => {
              setSelectedType(parseInt(key));
              // setSelectedType(key);
              console.log(selectedType);
            }}
          >
            {equipmentTypes.map((type) => (
              <Menu.Item key={type.id}>{type.type_name}</Menu.Item>
            ))}
          </Menu>
        </div>
        {/* 表格数据展示区域 */}
        <div style={{ overflow: 'auto', flex: 1 }}>
          <ProTable
            rowKey="id"
            // dataSource={equipmentInfo}
            dataSource={equipmentInfo.filter((info) => Number(info.type_id) === selectedType)}
            columns={columns}
            rowSelection={
              selectedRowKeys.length > 0
                ? {
                    selectedRowKeys,
                    onChange: (selectedRowKeys: string[]) => {
                      setSelectedRowKeys(selectedRowKeys);
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
              <Button type="primary" onClick={() => setTypeFormVisible(true)}>
                添加设备类型
              </Button>,
              <Button
                type="primary"
                // disabled={selectedRowKeys.length !== 1}
                onClick={() => setInfoFormVisible(true)}
              >
                添加设备信息
              </Button>,
            ]}
          />
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
          });
          setInfoFormVisible(false);
        }}
        equipmentType={selectedType}
        initialValues={selectedEquipment}
      />
    </div>
    // </PageContainer>
  );
};

export default Equipment;
