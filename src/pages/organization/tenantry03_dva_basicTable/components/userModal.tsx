import { Modal, Form, Input, Button, Checkbox } from 'antd';
import { useEffect } from 'react';

const UserModal = (props: { record: any; open: any; close: any; onFinish: any }) => {
  const [form] = Form.useForm();
  const { record, open, close, onFinish } = props;

  useEffect(() => {
    if(record === undefined){
      form.resetFields()
    }else{
      form.setFieldsValue(record);
    }
  }, [open]);
  
  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
  };
  return (
    <>
      <Modal title="Basic Modal" open={open} onOk={onOk} onCancel={close} forceRender>
        <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="company_name" name="company_name">
            <Input />
          </Form.Item>
          <Form.Item label="legal_representative" name="legal_representative">
            <Input />
          </Form.Item>
          <Form.Item label="registered_capital" name="registered_capital">
            <Input />
          </Form.Item>
          <Form.Item label="unified_social_credit_code" name="unified_social_credit_code">
            <Input />
          </Form.Item>
          <Form.Item label="official_site" name="official_site">
            <Input />
          </Form.Item>
          <Form.Item label="address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="phone_company" name="phone_company">
            <Input />
          </Form.Item>
          <Form.Item label="company_name_english" name="company_name_english">
            <Input />
          </Form.Item>
          <Form.Item label="avatar" name="avatar">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
