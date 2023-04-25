import React from 'react';
import { Table } from 'antd';
import { Link } from 'umi';
import { Project } from '../data';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  // 定义一个表格的列配置数组，包含项目名称、类型、金额、状态和操作等列
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '项目类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '项目金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Project) => (
        // 使用Link组件来跳转到项目详情页面，传递项目id作为参数
        <Link to={`/news_feed/training-detail/${record.id}`}>查看详情</Link>
      ),
    },
  ];

  // 返回一个Table组件，传入列配置和数据源作为属性
  return <Table columns={columns} dataSource={projects} />;
};

export default ProjectList;