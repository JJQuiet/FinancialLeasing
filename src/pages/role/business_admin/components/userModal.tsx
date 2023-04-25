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
          <Form.Item label="性别" name="gender">
            <Input />
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <Input />
          </Form.Item>
          <Form.Item label="出生日期" name="birthdate">
            <Input />
          </Form.Item>
          <Form.Item label="政治面貌" name="political_status">
            <Input />
          </Form.Item>
          <Form.Item label="公司名称" name="company_name">
            <Input />
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="公司电话" name="phone_company">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
