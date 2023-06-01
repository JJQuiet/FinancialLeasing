import React from 'react';
import { Modal, Form, Input } from 'antd';

interface EquipmentTypeFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const EquipmentTypeForm: React.FC<EquipmentTypeFormProps> = ({ visible, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onFinish(values);
    });
  };

  return (
    <Modal open={visible} title="添加设备类型" onCancel={onCancel} onOk={handleFinish}>
      <Form form={form}>
        <Form.Item name="type_name" label="设备类型名称" rules={[{ required: true }]}>
          <Input placeholder="请输入设备类型名称" />
        </Form.Item>
        <Form.Item name="description" label="设备类型描述" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入设备类型描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EquipmentTypeForm;
