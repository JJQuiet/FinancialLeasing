import { Modal, Form, Input,message, } from 'antd';
import { useEffect, FC } from 'react';
import { SingleUserType, FormValues } from '../data';

interface UserModalProps {
  record: SingleUserType | undefined;
  open: boolean;
  close: () => void;
  onFinish: (values: FormValues) => void;
}
const UserModal: FC<UserModalProps> = (props) => {
  const [form] = Form.useForm();
  const { record, open, close, onFinish } = props;

  useEffect(() => {
    form.setFieldsValue(record);
  }, [open]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
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
