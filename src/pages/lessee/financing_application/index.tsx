// 引入相关组件
import React, { useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { message } from 'antd';

// 定义步骤标题
const steps = [
  {
    title: '承租人基本信息',
  },
  {
    title: '租赁物件基本信息',
  },
  {
    title: '租赁合同主要条款',
  },
  {
    title: '承租人信用评级和担保措施',
  },
  {
    title: '承租人经营计划和收益预测',
  },
];

// 定义页面组件
const FinancingApplication = () => {
  // 定义表单提交成功后的回调函数
  const onFinish = async (values: any) => {
    console.log('[ values ]-36-「onFinish src/pages/lessee/financing_application/index」', values);
    // 模拟发送请求
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 显示成功提示
    message.success('提交成功');
    // 打印表单数据

    console.log(values);
  };

  return (
    // 使用StepsForm组件创建分步表单
    <StepsForm
      onFinish={onFinish}
      steps={steps}
      formProps={{
        validateMessages: {
          required: '${label}是必填项',
        },
      }}
    >
      {/* 第一步：承租人基本信息 */}
      <StepsForm.StepForm name="basic" title="承租人基本信息">
        <ProFormText name="name" label="名称" width="md" rules={[{ required: true }]} />
        <ProFormText name="id" label="身份证号" width="md" rules={[{ required: true }]} />
        <ProFormText name="address" label="地址" width="md" rules={[{ required: true }]} />
        <ProFormText name="phone" label="手机号" rules={[{ required: true }]} />
        <ProFormText name="email" label="邮箱" rules={[{ required: true }]} />
        <ProFormText
          name="representative"
          label="法定代表人"
          width="md"
          rules={[{ required: true }]}
        />
        <ProFormText name="capital" label="注册资本" width="md" rules={[{ required: true }]} />
        <ProFormTextArea name="scope" label="经营范围" width="md" rules={[{ required: true }]} />
        <ProFormTextArea name="finance" label="财务状况" width="md" rules={[{ required: true }]} />
      </StepsForm.StepForm>
      {/* 第二步：租赁物件基本信息 */}
      <StepsForm.StepForm name="object" title="租赁物件基本信息">
        <ProFormText name="name" label="名称" width="md" rules={[{ required: true }]} />
        <ProFormText name="specification" label="规格" width="md" rules={[{ required: true }]} />
        <ProFormText name="model" label="型号" width="md" rules={[{ required: true }]} />
        <ProFormText name="quantity" label="数量" width="md" rules={[{ required: true }]} />
        <ProFormText name="price" label="价格" width="md" rules={[{ required: true }]} />
        <ProFormText name="supplier" label="供货商" width="md" rules={[{ required: true }]} />
      </StepsForm.StepForm>
      {/* 第三步：租赁合同主要条款 */}
      <StepsForm.StepForm name="contract" title="租赁合同主要条款">
        <ProFormText name="rent" label="租金" width="md" rules={[{ required: true }]} />
        <ProFormText name="term" label="期限" width="md" rules={[{ required: true }]} />
        <ProFormRadio.Group
          name="repayment"
          label="还款方式"
          options={[
            {
              label: '等额本息',
              value: 'equal',
            },
            {
              label: '等额本金',
              value: 'principal',
            },
            {
              label: '先息后本',
              value: 'interest',
            },
          ]}
          rules={[{ required: true }]}
        />
        <ProFormText name="deposit" label="保证金" width="md" rules={[{ required: true }]} />
        <ProFormText name="residual" label="余值" width="md" rules={[{ required: true }]} />
      </StepsForm.StepForm>
      {/* 第四步：承租人信用评级和担保措施 */}
      <StepsForm.StepForm name="credit" title="承租人信用评级和担保措施">
        <ProFormUploadButton name="report" label="信用报告" max={1} rules={[{ required: true }]} />
        <ProFormUploadButton name="guarantee" label="担保函" max={1} rules={[{ required: true }]} />
        <ProFormUploadButton
          name="collateral"
          label="抵押物"
          max={1}
          rules={[{ required: true }]}
        />
      </StepsForm.StepForm>
      {/* 第五步：承租人经营计划和收益预测 */}
      <StepsForm.StepForm name="plan" title="承租人经营计划和收益预测">
        <ProFormTextArea
          name="background"
          label="项目背景"
          width="md"
          rules={[{ required: true }]}
        />
        <ProFormTextArea name="analysis" label="市场分析" width="md" rules={[{ required: true }]} />
        <ProFormTextArea
          name="profit"
          label="成本收益分析"
          width="md"
          rules={[{ required: true }]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default FinancingApplication;
