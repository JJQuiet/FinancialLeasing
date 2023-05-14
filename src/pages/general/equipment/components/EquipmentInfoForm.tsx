import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface EquipmentInfoFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  equipmentType: number | null;
}

const EquipmentInfoForm: React.FC<EquipmentInfoFormProps> = ({
  visible,
  onCancel,
  onFinish,
  equipmentType,
}) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onFinish(values);
    });
  };

  return (
    <Modal visible={visible} title="添加设备信息" onCancel={onCancel} onOk={handleFinish}>
      <Form form={form}>
        <Form.Item name="type_id" initialValue={equipmentType} hidden>
          <Input />
        </Form.Item>
        <Form.Item name="model_name" label="设备型号" rules={[{ required: true }]}>
          <Input placeholder="请输入设备型号" />
        </Form.Item>
        <Form.Item name="manufacturer" label="设备制造商名称" rules={[{ required: true }]}>
          <Input placeholder="请输入设备制造商名称" />
        </Form.Item>
        <Form.Item name="supplier" label="设备供应商名称" rules={[{ required: true }]}>
          <Input placeholder="请输入设备供应商名称" />
        </Form.Item>
        <Form.Item
          name="production_year"
          label="生产年份"
          rules={[{ required: true, message: '请输入生产年份' }]}
        >
          <Input placeholder="请输入生产年份" />
        </Form.Item>
        <Form.Item
          name="specifications"
          label="机械设备规格"
          rules={[{ required: true, message: '请输入机械设备规格' }]}
        >
          <Input.TextArea placeholder="请输入机械设备规格" />
        </Form.Item>
        <Form.Item
          name="notes"
          label="设备其他信息"
        >
          <Input.TextArea placeholder="请输入设备其他信息" />
        </Form.Item>

        <Form.Item
          name="image_url"
          label="机械设备型号图片"
          rules={[{ required: true, message: '请输入机械设备型号图片地址' }]}
        >
          <Input placeholder="请输入机械设备型号图片地址" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EquipmentInfoForm;
