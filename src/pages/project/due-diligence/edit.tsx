import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormText,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-form';
import { history } from 'umi';
import { updateTenantDetail } from './service';

const EditPage: React.FC = () => {
  const id = history.location.pathname.split('/').pop();

  const onFinish = async (values) => {
    await updateTenantDetail(id, values);
    history.goBack();
  };

  return (
    <PageContainer>
      <ProForm
        onFinish={onFinish}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            children: '保存',
          },
        }}
      >
        <ProFormText
          name="year"
          label="年份"
          rules={[{ required: true, message: '请输入年份' }]}
        />
        <ProFormDigit
          name="revenue"
          label="收入（万元）"
          rules={[{ required: true, message: '请输入收入' }]}
        />
        <ProFormDigit
          name="profitMargin"
          label="利润率（%）"
          rules={[{ required: true, message: '请输入利润率' }]}
        />
        <ProFormSelect
          name="evaluationValue"
          label="评估值"
          valueEnum={{
            正常: '正常',
            下降: '下降',
            回升: '回升',
          }}
          rules={[{ required: true, message: '请选择评估值' }]}
        />
      </ProForm>
    </PageContainer>
  );
};

export default EditPage;