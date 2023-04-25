import { Modal, Form, Input, message } from 'antd';
import { useEffect, FC } from 'react';

interface UserModalProps {
  record: API.CurrentUser | undefined;
  open: boolean;
  close: () => void;
  onFinish: (values: any) => void;
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
          <Form.Item label="部门" name="department">
            <Input />
          </Form.Item>
          <Form.Item label="电话号码" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="电子邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="职位" name="position">
            <Input />
          </Form.Item>
          <Form.Item label="是否在职" name="status">
            <Input />
          </Form.Item>
          <Form.Item label="身份证号码" name="id_card_number">
            <Input />
          </Form.Item>
          <Form.Item label="入职时间" name="hire_date">
            <Input />
          </Form.Item>
          <Form.Item label="离职时间" name="leave_date">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
