import React, { useEffect, useRef, useState } from 'react';
import { Anchor, Avatar, Button, Card, Descriptions, Slider, Table, Tabs } from 'antd';
// import { useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons'; // 导入左箭头图标
import { Link, history } from 'umi'; // 导入umi的history对象
import { request } from 'umi';
import ProTable from '@ant-design/pro-table';
import { keyBy } from 'lodash';
import { updateAssment } from './service';

const ProjectDetail: React.FC = () => {
  const [projectDetail, setProjectDetail] = useState(null);
  const [baseinfo_normal, setBaseinfo_normal] = useState({});
  const [holder, setHolder] = useState([]);
  const [inverst, setInverst] = useState([]);
  const [lawSuit, setLawSuit] = useState([]);
  const [ktAnnouncement, setKtAnnouncement] = useState([]);
  const [zhixinginfo, setZhixinginfo] = useState([]);
  const [dishonest, setDishonest] = useState([]);
  const [punishment, setPunishment] = useState([]);
  const [activeTab, setActiveTab] = useState('business_info');
  const anchorLinksRef = useRef(null);
  const [ownTax, setOwnTax] = useState([]);
  const [taxContravention, setTaxContravention] = useState([]);
  const [abnormal, setAbnormal] = useState([]);
  const [hiabnormal, setHiabnormal] = useState([]);
  const [baseinfoNormalWeight, setBaseinfoNormalWeight] = useState(0);
  const [baseinfoNormalRisk, setBaseinfoNormalRisk] = useState(0);
  const [holderWeight, setHolderWeight] = useState(0);
  const [holderRisk, setHolderRisk] = useState(0);
  const [inverstWeight, setInverstWeight] = useState(0);
  const [inverstRisk, setInverstRisk] = useState(0);
  const [punishmentWeight, setPunishmentWeight] = useState(0);
  const [punishmentRisk, setPunishmentRisk] = useState(0);
  const [ownTaxWeight, setOwnTaxWeight] = useState(0);
  const [ownTaxRisk, setOwnTaxRisk] = useState(0);
  const [taxContraventionWeight, setTaxContraventionWeight] = useState(0);
  const [taxContraventionRisk, setTaxContraventionRisk] = useState(0);
  const [abnormalWeight, setAbnormalWeight] = useState(0);
  const [abnormalRisk, setAbnormalRisk] = useState(0);
  const [hiabnormalWeight, setHiabnormalWeight] = useState(0);
  const [hiabnormalRisk, setHiabnormalRisk] = useState(0);
  const [lawSuitWeight, setLawSuitWeight] = useState(0);
  const [lawSuitRisk, setLawSuitRisk] = useState(0);
  const [ktAnnouncementWeight, setKtAnnouncementWeight] = useState(0);
  const [ktAnnouncementRisk, setKtAnnouncementRisk] = useState(0);
  const [zhixinginfoWeight, setZhixinginfoWeight] = useState(0);
  const [zhixinginfoRisk, setZhixinginfoRisk] = useState(0);
  const [dishonestWeight, setDishonestWeight] = useState(0);
  const [dishonestRisk, setDishonestRisk] = useState(0);

  // 定义一个状态变量来保存总评估值
  const [totalAssessment, setTotalAssessment] = useState(0);

  const { Link: AnchorLink } = Anchor;
  // const { id } = useParams<{ id: string }>(); // 获取项目id
  const id = history.location.pathname.split('/').pop();
  // #region
  // 锚点点击事件
  useEffect(() => {
    let anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinksRef.current = anchorLinks;
    anchorLinks.forEach((anchorLink) => {
      const targetId = anchorLink.getAttribute('href').substring(1);
      anchorLink.addEventListener('click', (event) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ block: 'start', inline: 'start', behavior: 'smooth' });
        }
      });
    });
    return () => {
      if (anchorLinksRef.current) {
        anchorLinksRef.current.forEach((anchorLink) => {
          const targetId = anchorLink.getAttribute('href').substring(1);
          anchorLink.removeEventListener('click', (event) =>
            handleAnchorLinkClick(event, targetId),
          );
        });
      }
    };
  }, [activeTab]);
  // 项目详情
  useEffect(() => {
    request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: `select * from financing_approval where id=${id}`,
        },
      },
    }).then((res) => {
      setProjectDetail(res?.rows[0]);
    });
  }, []);

  // 企业基本信息
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/ic/baseinfo/normal', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      })
        .then((res) => {
          setBaseinfo_normal(res?.result);
        })
        .catch((err) => {});
    }
  }, [projectDetail]);
  //股东信息
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/ic/holder/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setHolder(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 股东信息表格列
  const holder_columns = [
    {
      title: '股东',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.logo} />
          <span style={{ marginLeft: '8px' }}>{text}</span>
        </div>
      ),
    },
    {
      title: '股东简称',
      dataIndex: 'alias',
      key: 'alias',
    },
    {
      title: '实缴出资金额',
      dataIndex: 'capitalActl',
      key: 'capitalActl',
      render: (capitalActl) => capitalActl.map((item) => item.amomon).join(', '),
    },
    {
      title: '认缴出资金额',
      dataIndex: 'capital',
      key: 'capital',
      render: (capital) => capital.map((item) => item.amomon).join(', '),
    },
    {
      title: '认缴出资金额比例',
      dataIndex: 'capital',
      key: 'capital_percent',
      render: (capital) => capital.map((item) => item.percent).join(', '),
    },
  ];
  // 对外投资
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/ic/inverst/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setInverst(res?.result?.items);
      });
    }
  }, [projectDetail]);

  // 对外投资表格列
  const inverst_columns = [
    {
      title: '公司ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '公司类型',
      dataIndex: 'orgType',
      key: 'orgType',
      width: 200,
    },
    {
      title: '投资占比',
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: '简称',
      dataIndex: 'alias',
      key: 'alias',
    },
    {
      title: '企业状态',
      dataIndex: 'regStatus',
      key: 'regStatus',
    },
    {
      title: '开业时间',
      dataIndex: 'estiblishTime',
      key: 'estiblishTime',
      // 可自定义渲染函数，将毫秒数转换为可读日期格式
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: '法人',
      dataIndex: 'legalPersonName',
      key: 'legalPersonName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      // 可自定义渲染函数，将1和2分别显示为'公司'和'人'
      render: (text) => (text === 1 ? '公司' : '人'),
    },
    {
      title: '投资金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '行业',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '注册资金',
      dataIndex: 'regCapital',
      key: 'regCapital',
    },
    {
      title: '被投资公司',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '省份简称',
      dataIndex: 'base',
      key: 'base',
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'creditCode',
      key: 'creditCode',
    },
    {
      title: '被投资法人类型',
      dataIndex: 'personType',
      key: 'personType',
      // 可自定义渲染函数，将0、1和2分别显示为'无法人'、'人'和'公司'
      render: (text) => {
        if (text === 0) return '无法人';
        if (text === 1) return '人';
        if (text === 2) return '公司';
        return '';
      },
    },
    {
      title: '投资金额单位',
      dataIndex: 'amountSuffix',
      key: 'amountSuffix',
    },
    {
      title: '经营范围',
      dataIndex: 'business_scope',
      key: 'business_scope',
      width: 600,
      fixed: 'right', // 固定列宽在左侧
    },
  ];
  // 法律诉讼
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/jr/lawSuit/3.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setLawSuit(res?.result?.items);
      });
    }
  }, [projectDetail]);

  // 法律诉讼表格列
  const lawSuit_columns = [
    {
      title: '对应表ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '案号',
      dataIndex: 'caseNo',
      key: 'caseNo',
      width: 200,
    },
    {
      title: '案件名称',
      dataIndex: 'title',
      key: 'title',
      width: 400, //没有起作用
      // eclipse: true, // 超出宽度自动省略
    },
    {
      title: '涉案方名称',
      dataIndex: 'casePersons',
      key: 'casePersons',
      width: 300,
      // eclipse: true, // 超出宽度自动省略
      render: (persons) => (
        <ul>
          {persons.map((person) => (
            <li key={person.gid}>
              {person.role}:{person.name}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: '发布日期',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 100,
      render: (submitTime) => new Date(submitTime).toLocaleDateString(), // 根据需求格式化时间
    },
    {
      title: '案由',
      dataIndex: 'caseReason',
      key: 'caseReason',
      width: 200,
    },
    {
      title: '文书类型',
      dataIndex: 'docType',
      key: 'docType',
      width: 100,
    },
    {
      title: '案件金额',
      dataIndex: 'caseMoney',
      key: 'caseMoney',
      width: 100,
    },
    {
      title: 'UUID',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 200,
    },
    {
      title: '审理法院',
      dataIndex: 'court',
      key: 'court',
      width: 200,
    },
    {
      title: '裁判日期',
      dataIndex: 'judgeTime',
      key: 'judgeTime',
      width: 100,
    },
    {
      title: '案件类型',
      dataIndex: 'caseType',
      key: 'caseType',
      width: 200,
    },
    {
      title: '天眼查url（Web）',
      dataIndex: 'lawsuitUrl',
      key: 'lawsuitUrl',
      eclipsis: true, // 超出宽度时是否自动省略
      width: 200,
      render: (text) => <a href={text}>{text}</a>, // 将文本渲染为链接
    },
    {
      title: '天眼查url（H5）',
      dataIndex: 'lawsuitH5Url',
      key: 'lawsuitH5Url',
      eclipsis: true, // 超出宽度时是否自动省略
      width: 200,
      render: (text) => <a href={text}>{text}</a>, // 将文本渲染为链接
    },
  ];
  // 开庭公告
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/jr/ktannouncement/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setKtAnnouncement(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 开庭公告表格列
  const ktAnnouncement_columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '开庭日期(时间)',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '案号',
      dataIndex: 'caseNo',
      key: 'caseNo',
    },
    {
      title: '案由',
      dataIndex: 'caseReason',
      key: 'caseReason',
    },
    {
      title: '原告/上诉人',
      dataIndex: 'plaintiff',
      key: 'plaintiff',
      render: (plaintiffs) => plaintiffs.map((p) => p.name).join(', '),
    },
    {
      title: '被告/被上诉人',
      dataIndex: 'defendant',
      key: 'defendant',
      render: (defendants) => defendants.map((d) => d.name).join(', '),
    },
    {
      title: '法庭',
      dataIndex: 'courtroom',
      key: 'courtroom',
    },
    {
      title: '法院',
      dataIndex: 'court',
      key: 'court',
    },
    {
      title: '当事人',
      dataIndex: 'litigant',
      key: 'litigant',
    },
    {
      title: '审判长/主审人',
      dataIndex: 'judge',
      key: 'judge',
    },
    {
      title: '承办部门',
      dataIndex: 'contractors',
      key: 'contractors',
    },
  ];
  // 被执行人
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/jr/zhixinginfo/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setZhixinginfo(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 被执行人表格列
  const zhixinginfo_columns = [
    {
      title: '案号',
      dataIndex: 'caseCode',
      key: 'caseCode',
    },
    {
      title: '执行法院',
      dataIndex: 'execCourtName',
      key: 'execCourtName',
    },
    {
      title: '被执行人名称',
      dataIndex: 'pname',
      key: 'pname',
    },
    {
      title: '身份证号／组织机构代码',
      dataIndex: 'partyCardNum',
      key: 'partyCardNum',
    },
    {
      title: '创建时间',
      dataIndex: 'caseCreateTime',
      key: 'caseCreateTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '执行标的（元）',
      dataIndex: 'execMoney',
      key: 'execMoney',
    },
  ];
  // 失信人

  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/jr/dishonest/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setDishonest(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 失信人表格列
  const dishonest_columns = [
    {
      title: '法人、负责人姓名',
      dataIndex: 'businessentity',
      key: 'businessentity',
    },
    {
      title: '省份地区',
      dataIndex: 'areaname',
      key: 'areaname',
    },
    {
      title: '法院',
      dataIndex: 'courtname',
      key: 'courtname',
    },
    {
      title: '未履行部分',
      dataIndex: 'unperformPart',
      key: 'unperformPart',
    },
    {
      title: '法定负责人/主要负责人信息',
      dataIndex: 'staff',
      key: 'staff',
      render: (staff) => staff.map((s) => `${s.name} (${s.role})`).join(', '),
    },
    {
      title: '已履行部分',
      dataIndex: 'performedPart',
      key: 'performedPart',
    },
    {
      title: '失信人名称',
      dataIndex: 'iname',
      key: 'iname',
    },
    {
      title: '失信被执行人行为具体情形',
      dataIndex: 'disrupttypename',
      key: 'disrupttypename',
    },
    {
      title: '案号',
      dataIndex: 'casecode',
      key: 'casecode',
    },
    {
      title: '身份证号码/组织机构代码',
      dataIndex: 'cardnum',
      key: 'cardnum',
    },
    {
      title: '履行情况',
      dataIndex: 'performance',
      key: 'performance',
    },
    {
      title: '立案时间',
      dataIndex: 'regdate',
      key: 'regdate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '发布时间',
      dataIndex: 'publishdate',
      key: 'publishdate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '做出执行的依据单位',
      dataIndex: 'gistunit',
      key: 'gistunit',
    },
    {
      title: '生效法律文书确定的义务',
      dataIndex: 'duty',
      key: 'duty',
    },
    {
      title: '执行依据文号',
      dataIndex: 'gistid',
      key: 'gistid',
    },
  ];
  // 行政处罚
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/mr/punishmentInfo/3.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setPunishment(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 行政处罚表格列
  const punishment_columns = [
    {
      title: '日期',
      dataIndex: 'decisionDate',
      key: 'decisionDate',
    },
    {
      title: '决定文书号',
      dataIndex: 'punishNumber',
      key: 'punishNumber',
    },
    {
      title: '处罚事由/违法行为类型',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '处罚结果/内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '处罚单位',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: '数据来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '法定代表人',
      dataIndex: 'legalPersonName',
      key: 'legalPersonName',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '国家市场监督管理总局' ? record.legalPersonName : null;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '国家市场监督管理总局' ? record.remark : null;
      },
    },
    {
      title: '处罚状态',
      dataIndex: 'punishStatus',
      key: 'punishStatus',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '信用中国' ? record.punishStatus : null;
      },
    },
    {
      title: '处罚类别1',
      dataIndex: 'type',
      key: 'type',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '信用中国' ? record.type : null;
      },
    },
    {
      title: '处罚类别2',
      dataIndex: 'typeSecond',
      key: 'typeSecond',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '信用中国' ? record.typeSecond : null;
      },
    },
    {
      title: '处罚依据',
      dataIndex: 'evidence',
      key: 'evidence',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '信用中国' ? record.evidence : null;
      },
    },
    {
      title: '处罚名称',
      dataIndex: 'punishName',
      key: 'punishName',
      // Conditionally render the column based on the source value
      render: (_, record) => {
        return record.source === '信用中国' ? record.punishName : null;
      },
    },
  ];
  // 欠税公告
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/mr/ownTax/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setOwnTax(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 欠税公告表格列
  const ownTax_columns = [
    {
      title: '纳税人识别号',
      dataIndex: 'taxIdNumber',
      key: 'taxIdNumber',
    },
    {
      title: '当前新发生欠税余额',
      dataIndex: 'newOwnTaxBalance',
      key: 'newOwnTaxBalance',
    },
    {
      title: '欠税金额',
      dataIndex: 'ownTaxAmount',
      key: 'ownTaxAmount',
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      key: 'publishDate',
    },
    {
      title: '欠税余额',
      dataIndex: 'ownTaxBalance',
      key: 'ownTaxBalance',
    },
    {
      title: '税务类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '证件号码',
      dataIndex: 'personIdNumber',
      key: 'personIdNumber',
    },
    {
      title: '欠税税种',
      dataIndex: 'taxCategory',
      key: 'taxCategory',
    },
    {
      title: '纳税人类型',
      dataIndex: 'taxpayerType',
      key: 'taxpayerType',
    },
    {
      title: '法人证件名称',
      dataIndex: 'personIdName',
      key: 'personIdName',
    },
    {
      title: '纳税人名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '经营地点',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '税务机关',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '注册类型',
      dataIndex: 'regType',
      key: 'regType',
    },
    {
      title: '法人或负责人名称',
      dataIndex: 'legalpersonName',
      key: 'legalpersonName',
    },
  ];
  // 税收违法
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/mr/taxContravention/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setTaxContravention(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 税收违法表格列
  const taxContravention_columns = [
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      key: 'publish_time',
    },
    {
      title: '案件性质',
      dataIndex: 'case_type',
      key: 'case_type',
    },
    {
      title: '违法ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '所属税务机关',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '纳税人名称',
      dataIndex: 'taxpayer_name',
      key: 'taxpayer_name',
    },
  ];
  // 经营异常
  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/mr/abnormal/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setAbnormal(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 经营异常表格列
  const abnormal_columns = [
    {
      title: '移出日期',
      dataIndex: 'removeDate',
      key: 'removeDate',
    },
    {
      title: '列入异常名录原因',
      dataIndex: 'putReason',
      key: 'putReason',
    },
    {
      title: '决定列入异常名录部门',
      dataIndex: 'putDepartment',
      key: 'putDepartment',
    },
    {
      title: '移出部门',
      dataIndex: 'removeDepartment',
      key: 'removeDepartment',
    },
    {
      title: '移除异常名录原因',
      dataIndex: 'removeReason',
      key: 'removeReason',
    },
    {
      title: '列入日期',
      dataIndex: 'putDate',
      key: 'putDate',
    },
  ];
  // 历史经营异常

  useEffect(() => {
    if (projectDetail) {
      request('/tianyan/services/open/hi/abnormal/2.0', {
        params: {
          keyword: projectDetail.enterprise_customer_id,
        },
        headers: {
          Authorization: '0b75ec7b-0d1f-4f48-9c90-55388facd874',
        },
      }).then((res) => {
        setHiabnormal(res?.result?.items);
      });
    }
  }, [projectDetail]);
  // 历史经营异常表格列
  const hiabnormal_columns = [
    {
      title: '移出日期',
      dataIndex: 'removeDate',
      key: 'removeDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: '列入经营异常名录原因',
      dataIndex: 'putReason',
      key: 'putReason',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '作出决定机关',
      dataIndex: 'putDepartment',
      key: 'putDepartment',
    },
    {
      title: '决定移出部门',
      dataIndex: 'removeDepartment',
      key: 'removeDepartment',
    },
    {
      title: '移出经营异常名录原因',
      dataIndex: 'removeReason',
      key: 'removeReason',
    },
    {
      title: '异常ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '列入日期',
      dataIndex: 'putDate',
      key: 'putDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];
  // 评分变化
  useEffect(() => {
    // 计算所有weight的总和
    const totalWeight =
      baseinfoNormalWeight +
      holderWeight +
      inverstWeight +
      punishmentWeight +
      ownTaxWeight +
      taxContraventionWeight +
      abnormalWeight +
      hiabnormalWeight +
      lawSuitWeight +
      ktAnnouncementWeight +
      zhixinginfoWeight +
      dishonestWeight;

    // 计算总的评估值
    const totalAssessment = parseFloat(
      (
        (baseinfoNormalWeight * baseinfoNormalRisk +
          holderWeight * holderRisk +
          inverstWeight * inverstRisk +
          punishmentWeight * punishmentRisk +
          ownTaxWeight * ownTaxRisk +
          taxContraventionWeight * taxContraventionRisk +
          abnormalWeight * abnormalRisk +
          hiabnormalWeight * hiabnormalRisk +
          lawSuitWeight * lawSuitRisk +
          ktAnnouncementWeight * ktAnnouncementRisk +
          zhixinginfoWeight * zhixinginfoRisk +
          dishonestWeight * dishonestRisk) /
        totalWeight
      ).toFixed(2),
    );
    // 更新总评估值状态
    setTotalAssessment(totalAssessment);
    if (projectDetail) {
      updateAssment(projectDetail.id, totalAssessment);
    }
    request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: `select * from financing_approval where id=${id}`,
        },
      },
    }).then((res) => {
      setProjectDetail(res?.rows[0]);
    });
  }, [
    baseinfoNormalWeight,
    baseinfoNormalRisk,
    holderWeight,
    holderRisk,
    inverstWeight,
    inverstRisk,
    punishmentWeight,
    punishmentRisk,
    ownTaxWeight,
    ownTaxRisk,
    taxContraventionWeight,
    taxContraventionRisk,
    abnormalWeight,
    abnormalRisk,
    hiabnormalWeight,
    hiabnormalRisk,
    lawSuitWeight,
    lawSuitRisk,
    ktAnnouncementWeight,
    ktAnnouncementRisk,
    zhixinginfoWeight,
    zhixinginfoRisk,
    dishonestWeight,
    dishonestRisk,
  ]);

  // #endregion

  return (
    <div>
      <Button type="link" onClick={() => history.push('/project_approve')}>
        <ArrowLeftOutlined />
        返回
      </Button>
      <Card>
        {projectDetail ? (
          <Descriptions column={2} bordered title={projectDetail.project_name}>
            <Descriptions.Item label="ID">{projectDetail.id}</Descriptions.Item>
            <Descriptions.Item label="企业客户ID">
              {projectDetail.enterprise_customer_id}
            </Descriptions.Item>
            <Descriptions.Item label="租赁物ID">{projectDetail.leased_item_id}</Descriptions.Item>
            <Descriptions.Item label="项目名称">{projectDetail.project_name}</Descriptions.Item>
            <Descriptions.Item label="企业客户名称">{projectDetail.company_name}</Descriptions.Item>
            <Descriptions.Item label="租赁物">{projectDetail.leased_item}</Descriptions.Item>
            <Descriptions.Item label="项目描述">
              {projectDetail.project_description}
            </Descriptions.Item>
            <Descriptions.Item label="项目金额">{projectDetail.project_amount}</Descriptions.Item>
            <Descriptions.Item label="租赁期限">{projectDetail.lease_term}</Descriptions.Item>
            <Descriptions.Item label="利率">{projectDetail.interest_rate}</Descriptions.Item>
            <Descriptions.Item label="申请时间">{projectDetail.application_time}</Descriptions.Item>
            <Descriptions.Item label="审批状态">{projectDetail.approval_status}</Descriptions.Item>
            <Descriptions.Item label="审批人">{projectDetail.approver}</Descriptions.Item>
            <Descriptions.Item label="审批时间">{projectDetail.approval_time}</Descriptions.Item>
            <Descriptions.Item label="审批意见">
              {projectDetail.approval_comments}
            </Descriptions.Item>
            <Descriptions.Item label="审核状态">{projectDetail.status}</Descriptions.Item>
            {/* <Descriptions.Item label="项目风险评估值">{totalAssessment ? totalAssessment : projectDetail.assessment}</Descriptions.Item> */}
            <Descriptions.Item label="项目风险评估值">{projectDetail.assessment}</Descriptions.Item>
          </Descriptions>
        ) : (
          <div>Loading...</div>
        )}
      </Card>
      <Card>
        <Tabs
          tabBarStyle={{ marginBottom: 0 }}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          {/* <Tabs defaultActiveKey="business_info" tabBarStyle={{ marginBottom: 0 }} activeKey={activeTab} onChange={handleTabChange}> */}
          <Tabs.TabPane tab="工商信息" key="business_info">
            {/* 工商信息内容 */}

            <div style={{ display: 'flex' }}>
              {/* 左侧区域 */}
              <div style={{ width: 'auto', marginRight: '30px', marginTop: '30px' }}>
                {/* <div style={{ flex: 1 }}> */}
                <Anchor affix showInkInFixed style={{ textAlign: 'left' }}>
                  <AnchorLink href="#baseinfo_normal" title="企业基本信息" />
                  <AnchorLink href="#holder" title="股东信息" />
                  <AnchorLink href="#inverst" title="对外投资信息" />
                </Anchor>
              </div>

              {/* 右侧区域 */}
              {/* <div> */}
              <div style={{ flex: 1, marginTop: '30px' }}>
                {/* 企业基本信息 */}
                <div id="baseinfo_normal">
                  <Card title="企业基本信息">
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={baseinfoNormalWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => {
                          setBaseinfoNormalWeight(value);
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={baseinfoNormalRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setBaseinfoNormalRisk(value)}
                      />
                    </div>

                    {baseinfo_normal && (
                      <Descriptions>
                        {/* <Descriptions title="企业基本信息"> */}
                        <Descriptions.Item label="状态码">
                          {baseinfo_normal.error_code}
                        </Descriptions.Item>
                        <Descriptions.Item label="错误信息">
                          {baseinfo_normal.reason}
                        </Descriptions.Item>
                        <Descriptions.Item label="人员规模">
                          {baseinfo_normal.staffNumRange}
                        </Descriptions.Item>
                        <Descriptions.Item label="时间戳-经营开始时间">
                          {baseinfo_normal.fromTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="法人类型">
                          {baseinfo_normal.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="股票名">
                          {baseinfo_normal.bondName}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业ID">{baseinfo_normal.id}</Descriptions.Item>
                        <Descriptions.Item label="是否是小微企业">
                          {baseinfo_normal.isMicroEnt}
                        </Descriptions.Item>
                        <Descriptions.Item label="股票曾用名">
                          {baseinfo_normal.usedBondName}
                        </Descriptions.Item>
                        <Descriptions.Item label="注册号">
                          {baseinfo_normal.regNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业评分">
                          {baseinfo_normal.percentileScore}
                        </Descriptions.Item>
                        <Descriptions.Item label="注册资本">
                          {baseinfo_normal.regCapital}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业名">{baseinfo_normal.name}</Descriptions.Item>
                        <Descriptions.Item label="登记机关">
                          {baseinfo_normal.regInstitute}
                        </Descriptions.Item>
                        <Descriptions.Item label="注册地址">
                          {baseinfo_normal.regLocation}
                        </Descriptions.Item>
                        <Descriptions.Item label="行业">
                          {baseinfo_normal.industry}
                        </Descriptions.Item>
                        <Descriptions.Item label="核准时间">
                          {baseinfo_normal.approvedTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="参保人数">
                          {baseinfo_normal.socialStaffNum}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业标签">
                          {baseinfo_normal.tags}
                        </Descriptions.Item>
                        <Descriptions.Item label="纳税人识别号">
                          {baseinfo_normal.taxNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="经营范围" span={3}>
                          {baseinfo_normal.businessScope}
                        </Descriptions.Item>
                        <Descriptions.Item label="英文名">
                          {baseinfo_normal.property3}
                        </Descriptions.Item>
                        <Descriptions.Item label="简称">{baseinfo_normal.alias}</Descriptions.Item>
                        <Descriptions.Item label="组织机构代码">
                          {baseinfo_normal.orgNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业状态">
                          {baseinfo_normal.regStatus}
                        </Descriptions.Item>
                        <Descriptions.Item label="成立日期">
                          {baseinfo_normal.estiblishTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="更新时间">
                          {baseinfo_normal.updateTimes}
                        </Descriptions.Item>
                        <Descriptions.Item label="股票类型">
                          {baseinfo_normal.bondType}
                        </Descriptions.Item>
                        <Descriptions.Item label="法人">
                          {baseinfo_normal.legalPersonName}
                        </Descriptions.Item>
                        <Descriptions.Item label="时间戳-经营结束时间">
                          {baseinfo_normal.toTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="实收注册资金">
                          {baseinfo_normal.actualCapital}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业类型">
                          {baseinfo_normal.companyOrgType}
                        </Descriptions.Item>
                        <Descriptions.Item label="组成形式">
                          {baseinfo_normal.compForm}
                        </Descriptions.Item>
                        <Descriptions.Item label="省份简称">
                          {baseinfo_normal.base}
                        </Descriptions.Item>
                        <Descriptions.Item label="统一社会信用代码">
                          {baseinfo_normal.creditCode}
                        </Descriptions.Item>
                        <Descriptions.Item label="曾用名">
                          {baseinfo_normal.historyNames}
                        </Descriptions.Item>
                        <Descriptions.Item label="曾用名列表">
                          {baseinfo_normal.historyNameList}
                        </Descriptions.Item>
                        <Descriptions.Item label="股票号">
                          {baseinfo_normal.bondNum}
                        </Descriptions.Item>
                        <Descriptions.Item label="注册资本币种">
                          {baseinfo_normal.regCapitalCurrency}
                        </Descriptions.Item>
                        <Descriptions.Item label="实收注册资本币种">
                          {baseinfo_normal.actualCapitalCurrency}
                        </Descriptions.Item>
                        <Descriptions.Item label="吊销日期">
                          {baseinfo_normal.revokeDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="吊销原因">
                          {baseinfo_normal.revokeReason}
                        </Descriptions.Item>
                        <Descriptions.Item label="注销日期">
                          {baseinfo_normal.cancelDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="注销原因">
                          {baseinfo_normal.cancelReason}
                        </Descriptions.Item>
                        <Descriptions.Item label="市">{baseinfo_normal.city}</Descriptions.Item>
                        <Descriptions.Item label="区">{baseinfo_normal.district}</Descriptions.Item>
                        <Descriptions.Item label="国民经济行业分类" span={3}>
                          {/* {baseinfo_normal.industryAll} */}
                        </Descriptions.Item>
                        <Descriptions.Item label="国民经济行业分类门类">
                          {baseinfo_normal?.industryAll?.category}
                        </Descriptions.Item>
                        <Descriptions.Item label="国民经济行业分类大类">
                          {baseinfo_normal.industryAll?.categoryBig}
                        </Descriptions.Item>
                        <Descriptions.Item label="国民经济行业分类中类">
                          {baseinfo_normal.industryAll?.categoryMiddle}
                        </Descriptions.Item>
                        <Descriptions.Item label="国民经济行业分类小类">
                          {baseinfo_normal.industryAll?.categorySmall}
                        </Descriptions.Item>
                      </Descriptions>
                    )}
                  </Card>
                </div>
                {/* 股东信息 */}
                <div id="holder">
                  <Card title="股东信息" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={holderWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setHolderWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={holderRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setHolderRisk(value)}
                      />
                    </div>
                    <Table dataSource={holder} columns={holder_columns} />
                  </Card>
                </div>
                <div id="inverst">
                  {/* 对外投资信息 */}
                  <Card title="对外投资信息" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={inverstWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setInverstWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={inverstRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setInverstRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={inverst}
                      columns={inverst_columns}
                      scroll={{ x: 2000, y: 500 }}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="经营风险" key="business_risk">
            {/* 经营风险内容 */}
            <div style={{ display: 'flex' }}>
              {/* 左侧区域 */}
              <div style={{ width: 'auto', marginRight: '30px', marginTop: '30px' }}>
                <Anchor affix showInkInFixed style={{ textAlign: 'left' }}>
                  <AnchorLink href="#punishment" title="行政处罚" />
                  <AnchorLink href="#ownTax" title="欠税公告" />
                  <AnchorLink href="#taxContravention" title="税收违法" />
                  <AnchorLink href="#abnormal" title="经营异常" />
                  <AnchorLink href="#hiabnormal" title="历史经营异常" />
                </Anchor>
              </div>
              {/* 右侧区域 */}
              <div style={{ flex: 1, marginTop: '30px' }}>
                {/* 行政处罚 */}
                <div id="punishment">
                  <Card title="行政处罚" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={punishmentWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setPunishmentWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={punishmentRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setPunishmentRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={punishment}
                      columns={punishment_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                {/* 欠税公告 */}
                <div id="ownTax">
                  <Card title="欠税公告" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={ownTaxWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setOwnTaxWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={ownTaxRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setOwnTaxRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={ownTax}
                      columns={ownTax_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                {/* 税收违法 */}
                <div id="taxContravention">
                  <Card title="税收违法" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={taxContraventionWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setTaxContraventionWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={taxContraventionRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setTaxContraventionRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={taxContravention}
                      columns={taxContravention_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                {/* 经营异常 */}
                <div id="abnormal">
                  <Card title="经营异常" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={abnormalWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setAbnormalWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={abnormalRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setAbnormalRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={abnormal}
                      columns={abnormal_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                {/* 历史经营异常 */}
                <div id="hiabnormal">
                  <Card title="历史经营异常" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={hiabnormalWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setHiabnormalWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={hiabnormalRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setHiabnormalRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={hiabnormal}
                      columns={hiabnormal_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="司法风险" key="judicial_risk">
            {/* 司法风险内容 */}
            <div style={{ display: 'flex' }}>
              {/* 左侧区域 */}
              <div style={{ width: 'auto', marginRight: '30px', marginTop: '30px' }}>
                {/* <div style={{ flex: 1 }}> */}
                <Anchor affix showInkInFixed style={{ textAlign: 'left' }}>
                  <AnchorLink href="#lawSuit" title="法律诉讼" />
                  <AnchorLink href="#ktAnnouncement" title="开庭公告" />
                  <AnchorLink href="#zhixinginfo" title="被执行人" />
                  <AnchorLink href="#dishonest" title="失信人" />
                </Anchor>
              </div>

              {/* 右侧区域 */}
              <div style={{ flex: 1, marginTop: '30px' }}>
                <div id="lawSuit">
                  <Card title="法律诉讼" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={lawSuitWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setLawSuitWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={lawSuitRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setLawSuitRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={lawSuit}
                      columns={lawSuit_columns}
                      scroll={{ x: 2800 }}
                      // scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                <div id="ktAnnouncement">
                  <Card title="开庭公告" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={ktAnnouncementWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setKtAnnouncementWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={ktAnnouncementRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setKtAnnouncementRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={ktAnnouncement}
                      columns={ktAnnouncement_columns}
                      // scroll={{ x: 3500 }}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                <div id="zhixinginfo">
                  <Card title="被执行人" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={zhixinginfoWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setZhixinginfoWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={zhixinginfoRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setZhixinginfoRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={zhixinginfo}
                      columns={zhixinginfo_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
                <div id="dishonest">
                  <Card title="失信人" bordered>
                    <div style={{ display: 'flex' }}>
                      <span>权重打分：</span>
                      <Slider
                        defaultValue={dishonestWeight}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setDishonestWeight(value)}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span>风险分值打分：</span>
                      <Slider
                        defaultValue={dishonestRisk}
                        style={{ maxWidth: '250px', flex: 1 }}
                        onAfterChange={(value) => setDishonestRisk(value)}
                      />
                    </div>
                    <Table
                      dataSource={dishonest}
                      columns={dishonest_columns}
                      scroll={{ x: 'max-content' }}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="企业天眼风险" key="tianyan_risk"> */}
          {/* 企业天眼风险内容 */}
          {/* </Tabs.TabPane> */}
        </Tabs>
      </Card>
    </div>
  );
};

export default ProjectDetail;
