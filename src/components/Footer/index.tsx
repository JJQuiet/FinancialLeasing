import { useIntl } from 'umi';
import { GithubOutlined, AntDesignOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'JJQuiet融资租赁信息技术有限责任公司出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design/zh-CN/docs/overview',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/JJQuiet/umi03/tree/%E6%9C%80%E7%88%B1%E7%99%BD%E8%8F%9C%E5%91%8001',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: <AntDesignOutlined />,
          href: 'https://4x-ant-design.antgroup.com/components/overview-cn/',
          blankTarget: true,
        },
        {
          key: 'Pro components',
          title: 'Pro components',
          href: 'https://procomponents.ant.design/components',
          blankTarget: true,
        },
        {
          key: 'umi-v3',
          title: 'umi-v3',
          href: 'https://v3.umijs.org/zh-CN/docs',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
