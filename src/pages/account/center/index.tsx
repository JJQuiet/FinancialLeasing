import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, request, useDispatch, useModel, useRequest, useSelector } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const TagList: React.FC<{ tags: CurrentUser['tags'] }> = ({ tags }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

// const Center =  () => {
  const Center: React.FC<RouteChildrenProps> = () => {
    const [tabKey, setTabKey] = useState<tabKeyType>('articles');
    const loginModelState = useSelector((state:any) => state.login);
    // const currentUser = useSelector((state:any) => state.user)
    //  获取用户信息
    // const { data: currentUser, loading } = useRequest('/api/currentUserDetail');
    // const { data: currentUser, loading } = useRequest(() => {
      //   return queryCurrent();
  // });
  const { initialState } = useModel('@@initialState');
  const { loading } = initialState || {};
  const dispatch = useDispatch();
  const curUser = JSON.parse(localStorage.getItem('localCurUser') || '');
  dispatch({
    type: 'user/fetchCurrent',
    payload: curUser
  })
  // const { currentUser, loading } = initialState || {};
  console.log('[ curUser ]-110-「f:/Users/Documents/IT/webFrontEnd/React/umi03/src/pages/account/center/index」', curUser);
  // const currentUser = JSON.parse(localStorage.getItem('userInfo') || '');
  
  const userInfoFromStorage = localStorage.getItem('userInfo');
  const currentUser =
    userInfoFromStorage && userInfoFromStorage !== 'undefined'
      ? JSON.parse(userInfoFromStorage)
      : null;
  console.log('[ currentUser ]-111-「f:/Users/Documents/IT/webFrontEnd/React/umi03/src/pages/account/center/index」', currentUser);

  // if(loading){
  //   return (
  //     <div>loading is {loading}</div>
  //   )
  // }
  if (currentUser) {
    //  渲染用户信息
    const renderUserInfo = ({ title, department, geographic }: Partial<CurrentUser>) => {
    // const renderUserInfo = ({ title, group, geographic }: Partial<CurrentUser>) => {
      return (
        <div className={styles.detail}>
          <p>
            <ContactsOutlined
              style={{
                marginRight: 8,
              }}
            />
            {title}
          </p>
          <p>
            <ClusterOutlined
              style={{
                marginRight: 8,
              }}
            />
            {department}
          </p>
          <p>
            <HomeOutlined
              style={{
                marginRight: 8,
              }}
            />
            {(geographic || { province: { label: '' } }).province.label}
            {
              (
                geographic || {
                  city: {
                    label: '',
                  },
                }
              ).city.label
            }
          </p>
        </div>
      );
    };

    // 渲染tab切换
    const renderChildrenByTabKey = (tabValue: tabKeyType) => {
      if (tabValue === 'projects') {
        return <Projects />;
      }
      if (tabValue === 'applications') {
        return <Applications />;
      }
      if (tabValue === 'articles') {
        return <Articles />;
      }
      return null;
    };

    return (
      <GridContent>
        <div>{JSON.stringify(loginModelState)}</div>
        <br></br>
        <div>{JSON.stringify(localStorage.getItem('localCurUser'))}</div>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
              {!loading && currentUser && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser?.signature}</div>
                  </div>
                  {renderUserInfo(currentUser)}
                  <Divider dashed />
                  <TagList tags={currentUser.tags || []} />
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map((item) => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={(_tabKey: string) => {
                setTabKey(_tabKey as tabKeyType);
              }}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }

  return <div>{JSON.stringify(currentUser)}loading.....</div>;
};
export default Center;
