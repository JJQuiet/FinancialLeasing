import React, { useRef } from 'react';
import ProForm, { ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import { UploadOutlined } from '@ant-design/icons';

interface EquipmentTypeFormProps {
  initialValues?: EquipmentType;
  onFinish: (values: EquipmentType) => Promise<void>;
}

const EquipmentTypeForm: React.FC<EquipmentTypeFormProps> = ({ initialValues, onFinish }) => {
  const formRef = useRef();

  return (
    <ProForm<EquipmentType>
      initialValues={initialValues}
      formRef={formRef}
      onFinish={onFinish}
    >
      <ProFormText name="type_name" label="机械设备类型名称" rules={[{ required: true }]} />
      <ProFormTextArea name="description" label="机械设备类型描述" />
      <ProFormUploadButton
        name="image_url"
        label="机械设备类型图片"
        action="/upload"
        max={1}
        listType="picture"
        buttonText={<UploadOutlined />}
      />
    </ProForm>
  );
};

interface EquipmentInfoFormProps {
  typeOptions: { value: number; label: string }[];
  initialValues?: EquipmentInfo;
  onFinish: (values: EquipmentInfo) => Promise<void>;
}

const EquipmentInfoForm: React.FC<EquipmentInfoFormProps> = ({ typeOptions, initialValues, onFinish }) => {
  const formRef = useRef();

  return (
    <ProForm<EquipmentInfo>
      initialValues={initialValues}
      formRef={formRef}
      onFinish={onFinish}
    >
      <ProForm.Select
        name="type_id"
        label="机械设备类型"
        options={typeOptions}
        rules={[{ required: true }]}
      />
      <ProFormText name="model_number" label="机械设备型号" rules={[{ required: true }]} />
      <ProFormText name="manufacturer" label="设备制造商名称" />
      <ProFormText name="supplier" label="设备供应商名称" />
      <ProFormText name="production_year" label="生产年份" />
      <ProFormTextArea name="specifications" label="机械设备规格" />
      <ProFormTextArea name="notes" label="其他设备信息" />
      <ProFormUploadButton
        name="image_url"
        label="机械设备型号图片"
        action="/upload"
        max={1}
        listType="picture"
        buttonText={<UploadOutlined />}
      />
    </ProForm>
  );
};

export { EquipmentTypeForm, EquipmentInfoForm };
