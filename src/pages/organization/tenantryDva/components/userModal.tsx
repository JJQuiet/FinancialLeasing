import { Modal, Form, Input, Button, Checkbox } from 'antd';
import { useEffect } from 'react';

const UserModal = (props: { record: any; open: any; close: any; onFinish: any }) => {
  const [form] = Form.useForm();
  const { record, open, close, onFinish } = props;

  useEffect(() => {
    form.setFieldsValue(record);
  }, [open]);
  
  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('onFinishFailed');
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
          <Form.Item label="create_time" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
