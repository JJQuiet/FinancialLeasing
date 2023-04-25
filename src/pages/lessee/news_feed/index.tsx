import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import { useRequest } from 'umi';
import ProjectList from './components/ProjectList';
import PolicyList from './components/PolicyList';
import TrainingList from './components/TrainingList';
import { getPolicyData, getProjectData, getTrainingData } from './service';
import { Policy, Project, Training } from './data';

const { TabPane } = Tabs;

const LeaseCustomer: React.FC = () => {
  // 定义三个状态变量，分别用于存储项目、政策和培训的数据
  const [projects, setProjects] = useState<Project[] | []>([]);
  const [policies, setPolicies] = useState<Policy[] | []>([]);
  const [trainings, setTrainings] = useState<Training[] | []>([]);

  // 使用useRequest hook来发送请求，获取后端数据
  // const { rows: projectData } =
  //   useRequest(
  //     '/doSQL?paramvalues=' +
  //       encodeURIComponent(JSON.stringify({ selectsql: 'select * from project' })),
  //   ).data || {};
  // // const { data: projectData } = useRequest('/api/projects');
  // const { rows: policyData } =
  //   useRequest(
  //     '/doSQL?paramvalues=' +
  //       encodeURIComponent(JSON.stringify({ selectsql: 'select * from policy' })),
  //   ).data || {};
  // // const { data: policyData } = useRequest('/api/policies');
  // const { rows: trainingData } =
  //   useRequest(
  //     '/doSQL?paramvalues=' +
  //       encodeURIComponent(JSON.stringify({ selectsql: 'select * from training' })),
  //   ).data || {};
  // const data = useRequest(
  //   '/doSQL?paramvalues=' +
  //     encodeURIComponent(JSON.stringify({ selectsql: 'select * from training' })),
  // );
  // const { data: trainingData } = useRequest('/api/trainings');
  // const {data:projectData} = await getProjectData();
  // const {data:policyData} = await getPolicyData();
  // const {data:trainingData} = await getTrainingData();
  // 使用useEffect hook来更新状态变量，当请求数据变化时触发
  // useEffect(() => {
  //   // const {data:projectData} = await getProjectData();
  //   if (projectData) {
  //     setProjects(projectData);
  //   }
  // }, [projectData]);
  useEffect(() => {
    (async () => {
      // 使用await return request来获取数据
      const { data: projectData } = await getProjectData();
      // 使用setState或者useState来更新状态
      if (projectData) {
        setProjects(projectData);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      // 使用await return request来获取数据
      const { data: policyData } = await getPolicyData();
      // 使用setState或者useState来更新状态
      if (policyData) {
        setPolicies(policyData);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      // 使用await return request来获取数据
      const { data: trainingData } = await getTrainingData();
      // 使用setState或者useState来更新状态
      if (trainingData) {
        setTrainings(trainingData);
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (policyData) {
  //     setPolicies(policyData);
  //   }
  // }, [policyData]);

  // useEffect(() => {
  //   if (trainingData) {
  //     setTrainings(trainingData);
  //   }
  // }, [trainingData]);

  // 定义一个渲染标签页的函数，根据不同的key来返回不同的组件
  const renderTabContent = (key: string) => {
    switch (key) {
      case 'projects':
        // return <ProjectList projects={projectData} />;
        return 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh';
        return <ProjectList projects={projects} />;
      case 'policies':
        // return <PolicyList policies={policyData} />;
        return 'pppppppppppppppppppppppppppp';
        return <PolicyList policies={policies} />;
      case 'trainings':
        // return <TrainingList trainings={trainingData} />;
        return 'ttttttttttttttttttttttttttt';
        return <TrainingList trainings={trainings} />;
      default:
        return null;
    }
  };

  // 返回一个PageContainer组件，包含一个Card组件，Card组件中有一个Tabs组件，Tabs组件中有三个TabPane组件，每个TabPane组件中调用renderTabContent函数来渲染内容
  return (
    <PageContainer>
      <Card>
        <Tabs onChange={renderTabContent}>
          {/* <TabPane tab="项目信息" key="projects" />
          <TabPane tab="政策更新" key="policies" />
          <TabPane tab="培训信息" key="trainings" /> */}
          <TabPane tab="项目信息" key="projects">
          {/* <TabPane tab="项目信息" eventKey="projects"> */}
            <ProjectList projects={projects} />
          </TabPane>
          <TabPane tab="政策更新" key="policies">
          {/* <TabPane tab="政策更新" eventKey="policies"> */}
            <PolicyList policies={policies} />
          </TabPane>
          <TabPane tab="培训信息" key="trainings">
          {/* <TabPane tab="培训信息" eventKey="trainings"> */}
            <TrainingList trainings={trainings} />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default LeaseCustomer;
