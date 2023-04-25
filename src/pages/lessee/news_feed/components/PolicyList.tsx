import React from 'react';
import { List } from 'antd';
import { Link } from 'umi';
import { Policy } from '../data';

interface PolicyListProps {
  policies: Policy[];
}

const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  // 返回一个List组件，传入数据源、分页配置和渲染项函数作为属性
  return (
    <List
      dataSource={policies}
      pagination={{
        pageSize: 10,
      }}
      renderItem={(item: Policy) => (
        // 使用List.Item组件来渲染每个政策信息，包含标题、摘要和操作等内容
        <List.Item>
          <List.Item.Meta title={item.title} description={item.summary} />
          // 使用Link组件来跳转到政策详情页面，传递政策id作为参数
          <Link to={`/lease-customer/policy-detail/${item.id}`}>查看详情</Link>
        </List.Item>
      )}
    />
  );
};

export default PolicyList;
