
// 文件名：src/pages/LeaseCustomer/TrainingDetail.tsx
// 这是培训详情的页面，用于显示承租客户选择的融资租赁培训的详细信息，包括标题、日期、地点、内容和报名按钮等

import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Button } from 'antd';
import { useRequest } from 'umi';
import { Training } from './data.d';

interface TrainingDetailProps {
  // 使用match属性来获取路由参数中的培训id
  match: {
    params: {
      id: string;
    };
  };
}

const TrainingDetail: React.FC<TrainingDetailProps> = ({ match }) => {
  console.log('[ match ]-21-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/pages/lessee/news_feed/TrainingDetail」', match);
  // 定义一个状态变量，用于存储培训的数据
  const [training, setTraining] = useState<Training>();

  // 使用useRequest hook来发送请求，获取后端数据，传入培训id作为参数
  const { data: trainingData } = useRequest(`/api/training/${match.params.id}`);

  // 使用useEffect hook来更新状态变量，当请求数据变化时触发
  useEffect(() => {
    if (trainingData) {
      setTraining(trainingData);
    }
  }, [trainingData]);

  // 定义一个处理报名培训的函数，传入培训id作为参数
  const handleSignUp = (id: string) => {
    // TODO: 调用后端接口，发送报名请求，处理响应结果
    console.log(`报名培训${id}`);
  };

  // 返回一个PageContainer组件，包含一个Card组件，Card组件中有一个Typography组件和一个Button组件，Typography组件中有一个Title组件和一个Paragraph组件，分别显示培训的标题和内容，Button组件用于触发报名培训的函数
  return (
    <PageContainer>
      <Card>
        <Typography>
          <Typography.Title>{training?.title}</Typography.Title>
          <Typography.Paragraph>{training?.content}</Typography.Paragraph>
        </Typography>
        <Button onClick={() => handleSignUp(training?.id)}>报名参加</Button>
      </Card>
    </PageContainer>
  );
};

export default TrainingDetail;