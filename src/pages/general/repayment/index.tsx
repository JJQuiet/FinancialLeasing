import {
  Table,
  Button,
  DatePicker,
  Select,
  Form,
  AutoComplete,
  Input,
  message,
  Tooltip,
} from 'antd';
import { request } from 'umi';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { random } from 'lodash';

const { RangePicker } = DatePicker;
const { Option } = Select;

// const columns = [
//   {
//     title: '客户姓名',
//     dataIndex: 'customerName',
//     key: 'customerName',
//   },
//   {
//     title: '合同编号',
//     dataIndex: 'contractNumber',
//     key: 'contractNumber',
//   },
//   {
//     title: '应还款日期',
//     dataIndex: 'dueDate',
//     key: 'dueDate',
//   },
//   {
//     title: '实际还款日期',
//     dataIndex: 'actualPaymentDate',
//     key: 'actualPaymentDate',
//   },
//   {
//     title: '应还款金额',
//     dataIndex: 'dueAmount',
//     key: 'dueAmount',
//   },
//   {
//     title: '实际还款金额',
//     dataIndex: 'actualPaymentAmount',
//     key: 'actualPaymentAmount',
//   },
//   {
//     title: '是否逾期',
//     dataIndex: 'isOverdue',
//     key: 'isOverdue',
//     render: (text) => (
//       <span style={{ color: text ? 'red' : 'inherit' }}>
//         {text ? '是' : '否'}
//       </span>
//     ),
//   },
//   {
//     title: '是否已还清',
//     dataIndex: 'isPaidOff',
//     key: 'isPaidOff',
//     render: (text) => (
//       <span style={{ color: text ? 'green' : 'inherit' }}>
//         {text ? '是' : '否'}
//       </span>
//     ),
//   },
//   // 更多操作列可根据实际需要添加
// ];

// const data = [
//   {
//     key: '1',
//     customerName: '张三',
//     contractNumber: 'CONTRACT001',
//     dueDate: '2023-05-31',
//     actualPaymentDate: '2023-05-15',
//     dueAmount: 1000,
//     actualPaymentAmount: 1000,
//     isOverdue: false,
//     isPaidOff: true,
//   },
//   // 其他还款记录
// ];

const RentalPaymentPage = () => {
  const [form] = Form.useForm(); // 使用Form组件的useForm钩子
  const [data, setData] = useState([]); // 用于存放表格数据
  const [options, setOptions] = useState([]); // 用于存放客户名称选项

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '合同编号',
      dataIndex: 'contract_id',
      key: 'contract_id',
      width: 60,
    },
    {
      title: '客户名称',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '当前期数',
      dataIndex: 'current_installment',
      key: 'current_installment',
      width: 60,
    },
    {
      title: '计划还款日期',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title: '实际还款日期',
      dataIndex: 'actual_payment_date',
      key: 'actual_payment_date',
      render: (text, record, index) => (
        <DatePicker
          key={record.id}
          defaultValue={text ? moment(text) : null}
          // defaultValue={record.actual_payment_date ? moment(record.actual_payment_date) : null}
          onChange={(date) => handleActualPaymentDateChange(record.id, date)}
        />
      ),
    },
    {
      title: '当期还款金额',
      dataIndex: 'installment_amount',
      key: 'installment_amount',
    },
    {
      title: '实际还款金额',
      dataIndex: 'actual_payment_amount',
      key: 'actual_payment_amount',
      width: 150,
      render: (text, record, index) => (
        <Tooltip
          key={record.id}
          title={Boolean(record.actual_payment_date) ? '' : '请先输入实际还款日期！'}
          // placement="topLeft"
          overlayClassName="input-tooltip"
        >
          <Input
            readOnly={!Boolean(record.actual_payment_date)}
            // {!Boolean(record.actual_payment_date)}
            defaultValue={text}
            onBlur={(e) => {
              handleActualPaymentAmountChange(
                record.id,
                record.contract_id,
                record.current_installment,
                record.total_due_amount,
                record.installment_amount,
                e.target.value,
              );
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: '目前已还款总金额',
      dataIndex: 'total_paid_amount',
      key: 'total_paid_amount',
    },
    {
      title: '应还款总金额',
      dataIndex: 'total_due_amount',
      key: 'total_due_amount',
    },
  ];
  // 处理实际还款日期变更
  const handleActualPaymentDateChange = (id, date) => {
    // if (date) {
    //   console.log('有效');
    // } else {
    //   console.log('无效');
    // }
    // return;
    let updatesql;
    if (date) {
      updatesql = `update repayment_records set actual_payment_date = '${moment(date).format(
        'YYYY-MM-DD',
      )}' where id = ${id}`;
    } else {
      updatesql = `update repayment_records set actual_payment_date = NULL where id = ${id}`;
    }
    // 执行相应的处理逻辑，例如更新数据
    request('/doSQL', {
      params: {
        paramvalues: {
          updatesql: updatesql,
        },
      },
    })
      .then((res) => {
        console.log(' res', res);
        if (date) {
          request('/doSQL', {
            params: {
              paramvalues: JSON.stringify({
                sqlprocedure: 'update_repayment_date',
                id: id,
                actual_payment_date: moment(date).format('YYYY-MM-DD'),
              }),
            },
          })
            .then((res) => {
              console.log('update_repayment_date res', res);
            })
            .catch((err) => {
              console.log('update_repayment_date err', err);
            });
        }
      })
      .catch((err) => {
        console.log(' err', err);
      });
  };
  // 处理实际还款金额变更
  const handleActualPaymentAmountChange = (
    id,
    contract_id,
    current_installment,
    total_due_amount,
    installment_amount,
    amount,
  ) => {
    // 执行相应的处理逻辑，例如更新数据
    request('/doSQL', {
      params: {
        paramvalues: {
          sqlprocedure: 'update_repayment_amount',
          id: id,
          contract_id: contract_id,
          current_installment: current_installment,
          total_due_amount: total_due_amount,
          installment_amount: installment_amount,
          actual_payment_amount: amount,
        },
      },
    }).then((res) => {});

    onFinish(form.getFieldsValue());
  };
  // 筛选条件提交
  const onFinish = (values) => {
    // 在这里进行筛选操作，根据values中的值过滤数据或执行其他逻辑
    let sql = 'select * from repayment_records';
    const { dateRange, paymentStatus, company_name } = values;
    let whereClause = '';
    if (dateRange && dateRange.length === 2) {
      whereClause += ` AND due_date BETWEEN '${dateRange[0].format(
        'YYYY-MM-DD',
      )}' AND '${dateRange[1].format('YYYY-MM-DD')}'`;
    }
    if (paymentStatus && paymentStatus !== '全部') {
      whereClause += ` AND repayment_status = '${paymentStatus}'`;
    }
    if (company_name) {
      whereClause += ` AND company_name = '${company_name}'`;
    }
    if (whereClause) {
      sql += ' WHERE ' + whereClause.slice(5); // 去掉开头的 AND
    } else {
      sql += ' WHERE 1'; // 增加一个条件，保证 WHERE 语句有效
    }

    request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: sql,
        },
      },
    }).then((res) => {
      setData(res?.rows);
    });
  };
  // 获取初试数据
  useEffect(() => {
    request('/doSQL', {
      params: {
        paramvalues: {
          selectsql: `select * from repayment_records `,
          sortfield: 'id desc',
        },
      },
    }).then((res) => {
      setData(res?.rows);
    });
  }, []);
  const handleSearch = async (value) => {
    let options = [];
    if (value.indexOf(`'`) === -1) {
      request('/doSQL', {
        params: {
          paramvalues: {
            selectsql: `select * from financing_approval where company_name like '%${value}%'`,
            sortfield: 'id desc',
          },
        },
      }).then((res) => {
        if (res?.rows.length) {
          options = res?.rows.map((item) => ({
            value: item.company_name,
          }));
          setOptions(options);
        }
      });
    }
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="dateRange" label="日期范围">
          <RangePicker style={{ marginRight: '16px' }} />
        </Form.Item>
        <Form.Item name="paymentStatus" label="还款状态">
          <Select style={{ width: '100px', marginRight: '16px' }}>
            <Option value="全部">全部</Option>
            <Option value="未还款">未还款</Option>
            <Option value="overdue">逾期</Option>
            <Option value="已还清">已还清</Option>
            <Option value="未还清">未还清</Option>
            <Option value="已全部还清">已全部还清</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="企业客户名称"
          name="company_name"
          // rules={[{ required: true, message: '请输入企业客户名称' }]}
        >
          <AutoComplete options={options} onSearch={handleSearch} style={{ width: '250px' }}>
            <Input />
          </AutoComplete>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            筛选
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        // onRow={(record) => ({
        //   onDoubleClick: () => {
        //   },
        // })}
      />
    </div>
  );
};

export default RentalPaymentPage;
