// 引入相关的组件和样式
import React, { useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  // ProFormDatePicker,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { message } from 'antd';

// 定义表单的步骤和标题
const steps = [
  {
    title: '基本信息',
  },
  {
    title: '财务信息',
  },
  {
    title: '附件上传',
  },
];

// 定义表单的提交函数
const submitForm = async (values) => {
  // 模拟发送请求
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 显示成功消息
  message.success('提交成功');
};

// 定义表单组件
const StepFormDemo = () => {
  // 定义表单的当前步骤
  const [current, setCurrent] = useState(0);

  return (
    <StepsForm
      // 设置表单的布局和样式
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      // 设置表单的步骤和标题
      steps={steps}
      // 设置表单的当前步骤
      current={current}
      // 设置表单的提交函数
      onFinish={submitForm}
      // 设置表单的步骤切换函数
      onCurrentChange={setCurrent}
    >
      {/* 第一步：基本信息 */}
      <StepsForm.StepForm
        name="base"
        title="基本信息"
        // 设置第一步的提交函数，用于验证和跳转到下一步
        onFinish={async () => {
          setCurrent(1);
          return true;
        }}
      >
        {/* 姓名 */}
        <ProFormText
          name="name"
          label="姓名"
          placeholder="请输入姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        />
        {/* 身份证号 */}
        <ProFormText
          name="id"
          label="身份证号"
          placeholder="请输入身份证号"
          rules={[{ required: true, message: '请输入身份证号' }]}
        />
        {/* 手机号 */}
        <ProFormText
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          rules={[{ required: true, message: '请输入手机号' }]}
        />
        {/* 邮箱 */}
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[{ required: true, message: '请输入邮箱' }]}
        />
        {/* 融资金额 */}
        <ProFormText
          name="amount"
          label="融资金额"
          placeholder="请输入融资金额"
          rules={[{ required: true, message: '请输入融资金额' }]}
        />
        {/* 融资期限 */}
        <ProFormSelect
          name="term"
          label="融资期限"
          placeholder="请选择融资期限"
          options={[
            { value: '6', label: '6个月' },
            { value: '12', label: '12个月' },
            { value: '24', label: '24个月' },
            { value: '36', label: '36个月' },
            { value: '48', label: '48个月' },
            { value: '60', label: '60个月' },
          ]}
          rules={[{ required: true, message: '请输入融资期限' }]}
        />
      </StepsForm.StepForm>
      {/* 第二步：财务信息  */}
      <StepsForm.StepForm
        name="finance"
        title="财务信息"
        // 设置第二步的提交函数，用于验证和跳转到下一步
        onFinish={async () => {
          setCurrent(2);
          return true;
        }}
      >
        {/* 收入来源 */}
        <ProFormSelect
          name="income"
          label="收入来源"
          placeholder="请选择收入来源"
          options={[
            { value: 'salary', label: '工资' },
            { value: 'business', label: '生意' },
            { value: 'investment', label: '投资' },
            { value: 'other', label: '其他' },
          ]}
          rules={[{ required: true, message: '请选择收入来源' }]}
        />
        {/* 月收入 */}
        <ProFormText
          name="incomeAmount"
          label="月收入"
          placeholder="请输入月收入"
          rules={[{ required: true, message: '请输入月收入' }]}
        />
        {/* 支出项目 */}
        <ProFormSelect
          name="expense"
          label="支出项目"
          placeholder="请选择支出项目"
          options={[
            { value: 'rent', label: '房租' },
            { value: 'mortgage', label: '房贷' },
            { value: 'car', label: '车辆' },
            { value: 'loan', label: '贷款' },
            { value: 'other', label: '其他' },
          ]}
          rules={[{ required: true, message: '请选择支出项目' }]}
        />
        {/* 月支出 */}
        <ProFormText
          name="expenseAmount"
          label="月支出"
          placeholder="请输入月支出"
          rules={[{ required: true, message: '请输入月支出' }]}
        />
        {/* 资产类型 */}
        <ProFormSelect
          name="asset"
          label="资产类型"
          placeholder="请选择资产类型"
          options={[
            { value: 'house', label: '房产' },
            { value: 'car', label: '车辆' },
            { value: 'stock', label: '股票' },
            { value: 'fund', label: '基金' },
            { value: 'other', label: '其他' },
          ]}
          rules={[{ required: true, message: '请选择资产类型' }]}
        />
        {/* 资产价值 */}
        <ProFormText
          name="assetValue"
          label="资产价值"
          placeholder="请输入资产价值"
          rules={[{ required: true, message: '请输入资产价值' }]}
        />
      </StepsForm.StepForm>
      {/* 第三步：附件上传 */}
      <StepsForm.StepForm name="attachment" title="附件上传">
        {/* 身份证正面照 */}
        <ProFormUploadButton
          name="idFront"
          label="身份证正面照"
          max={1}
          fieldProps={{
            name: 'idFront',
            listType: 'picture-card',
            accept: '.jpg,.jpeg,.png',
          }}
          action="/upload.do"
          rules={[{ required: true, message: '请输入资产价值' }]}
        />
        {/* </StepsForm.StepForm> */}
        {/* 身份证反面照 */}
        <ProFormUploadButton
          name="idBack"
          label="身份证反面照"
          max={1}
          fieldProps={{
            name: 'idBack',
            listType: 'picture-card',
            accept: '.jpg,.jpeg,.png',
          }}
          action="/upload.do"
          rules={[{ required: true, message: '上传身份证反面照' }]}
        />
        {/* 工作证明 */}
        <ProFormUploadButton
          name="workProof"
          label="工作证明"
          max={1}
          fieldProps={{
            name: 'workProof',
            listType: 'picture-card',
            accept: '.jpg,.jpeg,.png,.pdf',
          }}
          action="/upload.do"
          rules={[{ required: true, message: '上传工作证明' }]}
        />
        {/* 收入证明 */}
        <ProFormUploadButton
          name="incomeProof"
          label="收入证明"
          max={1}
          fieldProps={{
            name: 'incomeProof',
            listType: 'picture-card',
            accept: '.jpg,.jpeg,.png,.pdf',
          }}
          action="/upload.do"
          rules={[{ required: true, message: '上传收入证明' }]}
        />
        {/* 资产证明 */}
        <ProFormUploadButton
          name="assetProof"
          label="资产证明"
          max={1}
          fieldProps={{
            name: 'assetProof',
            listType: 'picture-card',
            accept: '.jpg,.jpeg,.png,.pdf',
          }}
          action="/upload.do"
          rules={[{ required: true, message: '上传资产证明' }]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default StepFormDemo;
