// 定义项目审批页面
import React, { useEffect, useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { AutoComplete, Button, Form, Input, Modal, Popconfirm, Select, message } from 'antd';
import { addRecord, getProjects, updateAssment, updateProject } from './service';
import { history, request } from 'umi';
import { EquipmentInfo, EquipmentType } from './typing';
import { ProFormSelect } from '@ant-design/pro-form';
// import { useHistory } from 'react-router';
const { Option } = Select;

const ProjectApprove: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = React.useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentInfo[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentInfo | null>(null);
  const formRef = useRef();
  const [options, setOptions] = useState([]);

  const handleApprove = async (id: number) => {
    // 审批通过操作
    try {
      // const res = await updateProject(id, { status: 'approved' });
      updateAssment(id, 19);
      // if (res.status === 'approved') {
      message.success('审批通过');
      actionRef.current?.reload();
      // }
    } catch (error) {
      message.error('审批失败');
    }
  };

  const handleReject = async (id: number) => {
    // 审批拒绝操作
    try {
      // const res = await updateProject(id, { status: 'approved' });
      updateAssment(id, 99);
      // if (res.status === 'approved') {
      message.success('审批拒绝');
      actionRef.current?.reload();
      // }
    } catch (error) {
      message.error('审批失败');
    }
  };

  const columns: ProColumns<API.Project>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '项目名称',
      dataIndex: 'project_name',
      // width: 120,
      align: 'center',
    },
    {
      title: '企业客户名称',
      dataIndex: 'company_name',
      // width: 80,
    },
    {
      title: '租赁物',
      dataIndex: 'leased_item',
      // width: 290,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
    },
    {
      title: '总体风险值',
      dataIndex: 'assessment',
      align: 'center',
    },
    {
      title: '项目描述',
      dataIndex: 'project_description',
      // width: 90,
    },
    {
      title: '项目金额',
      dataIndex: 'project_amount',
    },
    {
      title: '租赁合同期限',
      dataIndex: 'lease_term',
      // width: 50,
    },
    {
      title: '融资租赁利率',
      dataIndex: 'interest_rate',
      // width: 50,
    },
    {
      title: '该项目的申请时间',
      dataIndex: 'application_time',
    },
    {
      title: '审批人',
      dataIndex: 'approver',
    },
    {
      title: '审批时间',
      dataIndex: 'approval_time',
    },
    {
      title: '审核意见',
      dataIndex: 'approval_comments',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <Popconfirm
          key="approve"
          title="确定审批通过吗？"
          onConfirm={() => handleApprove(record.id)}
        >
          <Button type="primary">通过</Button>
        </Popconfirm>,
        <Popconfirm key="reject" title="确定审批拒绝吗？" onConfirm={() => handleReject(record.id)}>
          <Button type="default">拒绝</Button>
        </Popconfirm>,
      ],
    },
  ];
  const onCreate = async (values: any) => {
    const formInstance = formRef.current;
    const formValues = formInstance.getFieldsValue();

    const enterprise_customer_id = await request('/tianyan/services/open/ic/baseinfo/normal', {
      params: {
        keyword: formValues.company_name,
      },
      headers: {
        Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
      },
    }).then((data) => {
      return data.result.id;
    });
    let manufacturer;
    await request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: 'select * from equipment_info',
          filtersql: `id=${formValues.equipment_info}`,
          sortfield: 'id',
        },
      },
    }).then((data) => {
      manufacturer = data.rows[0].manufacturer;
    });
    const type_name = await request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: 'select * from equipment_types',
          filtersql: `id=${formValues.type_id}`,
          sortfield: 'id',
        },
      },
    }).then((data) => data.rows[0].type_name);
    request('/doSQL', {
      params: {
        paramvalues: {
          sqlprocedure: 'add_record_financing_approval',
          enterprise_customer_id: enterprise_customer_id,
          leased_item_id: formValues.equipment_info,
          project_name: formValues.company_name + ' - ' + manufacturer + type_name + '项目',
          company_name: formValues.company_name,
          leased_item: manufacturer + type_name,
          lease_term: formValues.lease_term,
          project_description: formValues.project_description,
          project_amount: formValues.project_amount,
          interest_rate: formValues.interest_rate,
        },
      },
    });
    setVisible(false);
    actionRef.current?.reload();
  };

  useEffect(() => {
    request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: 'select * from equipment_types',
          sortfield: 'id',
        },
      },
    }).then((data) => setEquipmentTypes(data.rows));
  }, []);

  useEffect(() => {
    if (selectedTypeId) {
      request('/doSQL', {
        params: {
          paramvalues: {
            selectsql: `select * from equipment_info where type_id=${selectedTypeId}`,
            sortfield: 'id',
          },
        },
      }).then((data) => setEquipmentInfo(data.rows));
    } else {
      setEquipmentInfo([]);
    }
  }, [selectedTypeId]);
  const renderEquipmentInfo = () =>
    selectedEquipment && (
      <div>
        <h3>选中设备的详细信息：</h3>
        <p>设备制造商名称：{selectedEquipment.manufacturer}</p>
        <p>设备供应商名称：{selectedEquipment.supplier}</p>
        <p>生产年份：{selectedEquipment.production_year}</p>
        <p>机械设备规格：{selectedEquipment.specifications}</p>
        <p>设备其他信息：{selectedEquipment.notes}</p>
        <img
          style={{ width: '200px', height: '200px' }}
          src={selectedEquipment.image_url}
          alt={selectedEquipment.model_number}
        />
      </div>
    );

  const handleSearch = async (value) => {
    const apiUrl = `/tianyan/services/open/search/2.0?word=${value}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
      },
    });
    const data = await response.json();
    let options = [];
    if (data.result) {
      options = data.result.items.map((item) => ({
        value: item.name,
      }));
    }
    setOptions(options);
  };
  return (
    <>
      <ProTable<API.Project>
        headerTitle="待审批项目列表"
        actionRef={actionRef}
        rowKey="id"
        // scroll={{ x: 3000 }}
        scroll={{ x: 'max-content' }}
        search={{
          labelWidth: 120,
        }}
        request={(params) => getProjects({ ...params })}
        // request={(params) => getProjects({ ...params, status: 'pending' })}
        columns={columns}
        pagination={{
          // showQuickJumper: true,
          pageSizeOptions: [5, 8, 10, 15, 20],
          defaultPageSize: 10,
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        onRow={(record) => ({
          onDoubleClick: () => {
            history.push(`/project_approve/detail/${record.id}`); // 在此处添加路径，假设详情页面的路由为'/project-detail/:id'
          },
        })}
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => setVisible(true)}>
            新增申请
          </Button>,
        ]}
      />
      <Modal
        open={visible}
        title="新增记录"
        okText="确认"
        onCancel={() => setVisible(false)}
        onOk={onCreate}
      >
        <Form ref={formRef} layout="vertical">
          <Form.Item
            label="企业客户名称"
            name="company_name"
            rules={[{ required: true, message: '请输入企业客户名称' }]}
          >
            <AutoComplete options={options} onSearch={handleSearch}>
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item>
            <ProFormSelect
              name="type_id"
              label="租赁设备类型"
              options={equipmentTypes.map((type) => ({
                value: type.id,
                label: type.type_name,
              }))}
              fieldProps={{
                onChange: (value) => setSelectedTypeId(value),
              }}
            />
          </Form.Item>
          <Form.Item name="equipment_info" label="设备规格">
            <ProFormSelect
              options={equipmentInfo?.map((info) => ({
                value: info.id,
                label: info.model_number,
              }))}
              fieldProps={{
                onChange: (value: any) => {
                  const selected = equipmentInfo.find((info) => info.id === value);
                  setSelectedEquipment(selected ?? null);
                },
              }}
              extra={renderEquipmentInfo()}
            />
          </Form.Item>
          <Form.Item
            label="项目描述"
            name="project_description"
            rules={[{ required: true, message: '请输入项目描述' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="项目金额"
            name="project_amount"
            rules={[{ required: true, message: '请输入项目金额' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="租赁合同期限( /月 )"
            name="lease_term"
            rules={[{ required: true, message: '请输入租赁合同期限' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="融资租赁的利率"
            name="interest_rate"
            rules={[{ required: true, message: '请输入融资租赁的利率' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectApprove;
