// 导入ProTable组件和相关类型
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { FileComponent } from './FileComponent';
import { handleRequest } from './service';

// 定义融资租赁项目的数据类型
type FinancingLeasingProject = {
  id: number; // 项目编号
  progress: string; // 项目进度
  status: string; // 项目状态
  contract: string; // 合同文件
  bill: string; // 账单文件
};


// 定义列配置对象，指定表格的列和操作
const columns: ProColumns<FinancingLeasingProject>[] = [
  {
    title: '项目编号',
    dataIndex: 'id',
    valueType: 'digit', // 数字类型
    sorter: true, // 可排序
  },
  {
    title: '项目名称',
    dataIndex: 'application_name',
    // valueType: 'digit', // 数字类型
    // sorter: true, // 可排序
  },
  {
    title: '项目进度',
    dataIndex: 'progress',
    valueType: 'select', // 下拉选择类型
    valueEnum: {
      // 枚举值
      申请中: { text: '申请中', status: 'Default' },
      审批中: { text: '审批中', status: 'Processing' },
      执行中: { text: '执行中', status: 'Success' },
      已完成: { text: '已完成', status: 'Success' },
      已终止: { text: '已终止', status: 'Error'}
    }},
        {
          title: '项目状态',
          dataIndex: 'status',
          valueType: 'select', // 下拉选择类型
          valueEnum: {
            // 枚举值
            待审核: { text: '待审核', status: 'Default' },
            已通过: { text: '已通过', status: 'Success' },
            已拒绝: { text: '已拒绝', status: 'Error' },
            正常: { text: '正常', status: 'Success' },
            逾期: { text: '逾期', status: 'Error' },
          },
        },
        {
          title: '合同文件',
          dataIndex: 'contract',
          valueType: 'text', // 文本类型
          renderText: (text) =>  <FileComponent name={text} />, // 使用文件组件渲染, // 渲染为超链接
          // renderText: (text) => <a href={text}>{text}</a>, // 渲染为超链接
        },
        {
          title: '账单文件',
          dataIndex: 'bill',
          valueType: 'text', // 文本类型
          renderText: (text) =>  <FileComponent name={text} />, // 使用文件组件渲染, // 渲染为超链接
        },
        {
          title: '操作',
          valueType: 'option', // 操作类型
          render: (text, record, _, action) => [
            // 渲染为按钮组
            <a key="view" onClick={() => alert(`查看项目${record.id}`)}>
              查看
            </a>,
            <a key="edit" onClick={() => alert(`编辑项目${record.id}`)}>
              编辑
            </a>,
            <a key="delete" onClick={() => alert(`删除项目${record.id}`)}>
              删除
            </a>,
          ],
        },
      ];
      
      // 定义页面组件，使用ProTable来显示数据表格
      const FinancingLeasingProjectPage = () => {
        // 定义一个引用，用来操作表格的行为，比如刷新数据
        const actionRef = useRef<ActionType>();
        return (
          <ProTable<FinancingLeasingProject>
            columns={columns} // 列配置对象
            request={handleRequest} // 请求函数
            pagination={{ defaultPageSize: 10, pageSizeOptions: [5, 8, 10, 12, 15] }}
            rowKey="id" // 行键
            actionRef={actionRef} // 表格操作引用
            search={{ labelWidth: 'auto' }} // 搜索配置
            dateFormatter="string" // 日期格式化配置
            headerTitle="融资租赁项目列表" // 表格标题
          />
        );
      };
      
      export default FinancingLeasingProjectPage; // 导出页面组件
      