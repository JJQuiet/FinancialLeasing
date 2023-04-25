import React from 'react';
import { List, Button } from 'antd';
import { Link } from 'umi';
import { Training } from '../data';

interface TrainingListProps {
  trainings: Training[];
}

const TrainingList: React.FC<TrainingListProps> = ({ trainings }) => {
  // 定义一个处理报名培训的函数，传入培训id作为参数
  const handleSignUp = (id: string) => {
    // TODO: 调用后端接口，发送报名请求，处理响应结果
  };

  // 返回一个List组件，传入数据源、分页配置和渲染项函数作为属性
  return (
    <div>
      {'trainingstrainingstrainingstrainingstrainingstraining'}
      <List
        dataSource={trainings}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(item: Training) => (
          // 使用List.Item组件来渲染每个培训信息，包含标题、时间、地点和操作等内容
          <List.Item>
            <List.Item.Meta title={item.title} description={`${item.date} ${item.location}`} />
            // 使用Link组件来跳转到培训详情页面，传递培训id作为参数
            <Link to={`/lessee/news_feed/training-detail/${item.id}`}>查看详情</Link>
            // 使用Button组件来触发报名培训的函数，传递培训id作为参数
            <Button onClick={() => handleSignUp(item.id)}>报名参加</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TrainingList;
