import React, { useRef, useState } from 'react';
import { Modal, Form, Input, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

import { PlusOutlined } from '@ant-design/icons';

interface EquipmentInfoFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  equipmentType: number | null;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const EquipmentInfoForm: React.FC<EquipmentInfoFormProps> = ({
  visible,
  onCancel,
  onFinish,
  equipmentType,
}) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const fileListRef = useRef(null);

  const handleFinish = () => {
    const imgfile = fileListRef.current?.fileList[0]; // 获取 fileList中的第一个文件

    let formData = new FormData();
    formData.append('targetpath', '\\mybase\\resources'); //文件路径
    formData.append('targetfile', imgfile.uid + imgfile.name.split('.').pop()); //目标文件名，不加文件扩展名
    formData.append('file', imgfile.originFileObj); //上传文件对象
    fetch('/doFileUpload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        form.validateFields().then((values) => {
          form.resetFields();
          onFinish({
            ...values,
            image_url: `http://localhost:8081/myServer/mybase/resources/${data.targetfile}`,
          });
        });
      })
      .catch((err) => {});
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal open={visible} title="添加设备信息" onCancel={onCancel} onOk={handleFinish}>
      <Form
        initialValues={{
          model_number: 'XC-3938579',
          manufacturer: '上海东康建筑工程有限公司',
          supplier: '福建徐工机械有限公司',
          production_year: '2021',
          specifications: '混凝土泵流量：80m³/h，泵送压力：16MPa，发动机功率：110kW',
          notes: '无',
          price: 11,
        }}
        form={form}
      >
        <Form.Item name="model_number" label="设备型号" rules={[{ required: true }]}>
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
        <Form.Item name="notes" label="设备其他信息">
          <Input.TextArea placeholder="请输入设备其他信息" />
        </Form.Item>
        <Form.Item name="price" label="价格">
          <Input.TextArea placeholder="请输入价格" />
        </Form.Item>

        <Form.Item name="image_url" label="机械设备型号图片">
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            ref={fileListRef}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EquipmentInfoForm;
