// 引入相关组件
import React, { useEffect, useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { message } from 'antd';
import { request } from 'umi';
type EquipmentType = {
  id: number;
  type_name: string;
};

type EquipmentInfo = {
  id: number;
  model_number: string;
  type_id: number;
  manufacturer: string;
  specifications: string;
  supplier: string;
  production_year: string;
  notes: string;
  image_url: string;
};

// 定义步骤标题
const steps = [
  {
    title: '承租人基本信息',
  },
  {
    title: '租赁物件基本信息',
  },
  {
    title: '租赁合同主要条款',
  },
  {
    title: '承租人信用评级和担保措施',
  },
  {
    title: '承租人经营计划和收益预测',
  },
];

// 定义页面组件
const FinancingApplication = () => {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentInfo[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentInfo | null>(null);

  useEffect(() => {
    request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: 'select * from equipment_types',
          sortfield: 'id',
        },
      },
    })
      .then((data) => setEquipmentTypes(data.rows))
      .catch((error) => console.error(error));
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
      })
        .then((data) => setEquipmentInfo(data.rows))
        .catch((error) => console.error(error));
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
        <img style={{ width: '200px', height: '200px' }} src={selectedEquipment.image_url} alt={selectedEquipment.model_number} />
      </div>
    );
  // 定义表单提交成功后的回调函数
  const onFinish = async (values: any) => {
    // 模拟发送请求
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 显示成功提示
    message.success('提交成功');
    // 打印表单数据
  };
  return (
    // 使用StepsForm组件创建分步表单
    <StepsForm
      onFinish={onFinish}
      steps={steps}
      formProps={{
        validateMessages: {
          required: '${label}是必填项',
        },
      }}
    >
      {/* 第一步：承租人基本信息 */}
      <StepsForm.StepForm
        name="basic"
        title="承租人基本信息"
        initialValues={{
          name: '张三',
          id: '1234567890',
          address: '北京市海淀区',
          phone: '13800138000',
          email: 'zhangsan@example.com',
          representative: '张三',
          capital: '100万人民币',
          scope: '房地产开发；物业管理；建筑工程',
          finance: '稳健',
        }}
      >
        <ProFormText name="name" label="名称" width="md" rules={[{ required: true }]} />
        <ProFormText name="id" label="身份证号" width="md" rules={[{ required: true }]} />
        <ProFormText name="address" label="地址" width="md" rules={[{ required: true }]} />
        <ProFormText name="phone" label="手机号" rules={[{ required: true }]} />
        <ProFormText name="email" label="邮箱" rules={[{ required: true }]} />
        <ProFormText
          name="representative"
          label="法定代表人"
          width="md"
          rules={[{ required: true }]}
        />
        <ProFormText name="capital" label="注册资本" width="md" rules={[{ required: true }]} />
        <ProFormTextArea name="scope" label="经营范围" width="md" rules={[{ required: true }]} />
        <ProFormTextArea name="finance" label="财务状况" width="md" rules={[{ required: true }]} />
      </StepsForm.StepForm>
      {/* 第二步：租赁物件基本信息 */}
      <StepsForm.StepForm name="object" title="租赁物件基本信息">
        <ProFormSelect
          name="type_id"
          label="设备类型"
          options={equipmentTypes.map((type) => ({
            value: type.id,
            label: type.type_name,
          }))}
          fieldProps={{
            onChange: (value) => setSelectedTypeId(value),
          }}
        />
        <ProFormSelect
          name="equipment_info"
          label="设备规格"  
          // label="设备信息"
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

        <ProFormText name="name" label="名称" width="md" rules={[{ required: true }]} />
        <ProFormText name="specification" label="规格" width="md" rules={[{ required: true }]} />
        <ProFormText name="model" label="型号" width="md" rules={[{ required: true }]} />
        <ProFormText name="quantity" label="数量" width="md" rules={[{ required: true }]} />
        <ProFormText name="price" label="价格" width="md" rules={[{ required: true }]} />
        <ProFormText name="supplier" label="供货商" width="md" rules={[{ required: true }]} />
      </StepsForm.StepForm>
      {/* 第三步：租赁合同主要条款 */}
      <StepsForm.StepForm name="contract" title="租赁合同主要条款">
        <ProFormText name="rent" label="租金" width="md" rules={[{ required: true }]} />
        <ProFormText name="term" label="期限" width="md" rules={[{ required: true }]} />
        <ProFormRadio.Group
          name="repayment"
          label="还款方式"
          options={[
            {
              label: '等额本息',
              value: 'equal',
            },
            {
              label: '等额本金',
              value: 'principal',
            },
            {
              label: '先息后本',
              value: 'interest',
            },
          ]}
          rules={[{ required: true }]}
        />
        <ProFormText name="deposit" label="保证金" width="md" rules={[{ required: true }]} />
        <ProFormText name="residual" label="余值" width="md" rules={[{ required: true }]} />
      </StepsForm.StepForm>
      {/* 第四步：承租人信用评级和担保措施 */}
      <StepsForm.StepForm name="credit" title="承租人信用评级和担保措施">
        <ProFormUploadButton name="report" label="信用报告" max={1} rules={[{ required: true }]} />
        <ProFormUploadButton name="guarantee" label="担保函" max={1} rules={[{ required: true }]} />
        <ProFormUploadButton
          name="collateral"
          label="抵押物"
          max={1}
          rules={[{ required: true }]}
        />
      </StepsForm.StepForm>
      {/* 第五步：承租人经营计划和收益预测 */}
      <StepsForm.StepForm name="plan" title="承租人经营计划和收益预测">
        <ProFormTextArea
          name="background"
          label="项目背景"
          width="md"
          rules={[{ required: true }]}
        />
        <ProFormTextArea name="analysis" label="市场分析" width="md" rules={[{ required: true }]} />
        <ProFormTextArea
          name="profit"
          label="成本收益分析"
          width="md"
          rules={[{ required: true }]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default FinancingApplication;
