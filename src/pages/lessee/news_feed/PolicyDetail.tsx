// 文件名：src/pages/LeaseCustomer/PolicyDetail.tsx
// 这是政策详情的页面，用于显示承租客户选择的融资租赁政策的详细信息，包括标题、摘要和内容等
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import { useRequest } from 'umi';
import { Policy } from './data.d';

interface PolicyDetailProps {
  // 使用match属性来获取路由参数中的政策id
  match: {
    params: {
      id: string;
    };
  };
}

const PolicyDetail: React.FC<PolicyDetailProps> = ({ match }) => {
  // 定义一个状态变量，用于存储政策的数据
  const [policy, setPolicy] = useState<Policy>();

  // 使用useRequest hook来发送请求，获取后端数据，传入政策id作为参数
  const { data: policyData } = useRequest(`/api/policy/${match.params.id}`);

  // 使用useEffect hook来更新状态变量，当请求数据变化时触发
  useEffect(() => {
    if (policyData) {
      setPolicy(policyData);
    }
  }, [policyData]);

  // 返回一个PageContainer组件，包含一个Card组件，Card组件中有一个Typography组件，Typography组件中有一个Title组件和一个Paragraph组件，分别显示政策的标题和内容
  return (
    <PageContainer>
      <Card>
        <Typography>
          <Typography.Title>{policy?.title}</Typography.Title>
          <Typography.Paragraph>{policy?.content}</Typography.Paragraph>
        </Typography>
      </Card>
    </PageContainer>
  );
};

export default PolicyDetail;
