import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Button,
  DatePicker,
  Input,
  Row,
  Col,
  Select,
  Descriptions,
  Tooltip,
  Card,
  message,
} from 'antd';
import SignatureCanvas from 'react-signature-canvas';
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  PrinterOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { history, request } from 'umi';
import { editRecord } from './service';

const { Option } = Select;
const ContractForm = () => {
  const [isSignatureVisible, setIsSignatureVisible] = useState(false);
  const [signature, setSignature] = useState(null);
  const [buyoutRights, setBuyoutRights] = useState(true);
  const [signatureData, setSignatureData] = useState('');
  const [projectDetail, setProjectDetail] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const canvasRef = useRef(null);

  // 获取项目id
  const id = history.location.pathname.split('/').pop();

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
  // 设置初试值

  useEffect(() => {
    if (projectDetail) {
      if (projectDetail.contract_status !== '未起草') {
        setInitialValues({
          equipmentQuantity: projectDetail.equipment_quantity,
          startDate: moment(projectDetail.start_date, 'YYYY-MM-DD'),
          endDate: moment(projectDetail.end_date, 'YYYY-MM-DD'),
          rentAmount: projectDetail.rent_amount,
          rentPaymentMethod: projectDetail.rent_payment_method,
          repaymentInterval: projectDetail.repayment_interval,
          lateFeeRate: projectDetail.late_fee_rate,
          depositAmount: projectDetail.deposit_amount,
          depositRefund: projectDetail.deposit_refund,
          usageScope: projectDetail.usage_scope,
          maintenanceResponsibility: projectDetail.maintenance_responsibility,
          insuranceResponsibility: projectDetail.insurance_responsibility,
          insuranceCost: projectDetail.insurance_cost,
          breachTerms: projectDetail.breach_terms,
          contractTermination: projectDetail.contract_termination,
          buyoutOption: projectDetail.buyout_option,
          buyoutPrice: projectDetail.buyout_price,
          disputeResolution: projectDetail.dispute_resolution,
          grace_period: projectDetail.grace_period,
        });
        setSignatureData(projectDetail.signature_data_url);
      } else {
        setInitialValues({
          equipmentQuantity: 3,
          startDate: moment('2023-05-20', 'YYYY-MM-DD'),
          endDate: moment('2023-06-20', 'YYYY-MM-DD'),
          rentAmount: 1000,
          rentPaymentMethod: '银行转账',
          repaymentInterval: '每月',
          lateFeeRate: 0.01,
          depositAmount: 5000,
          depositRefund: '押金将在合同终止后退还',
          usageScope: '设备可在工地使用',
          maintenanceResponsibility: '租赁方负责设备的维护和保养',
          insuranceResponsibility: '租赁方负责设备的保险责任',
          insuranceCost: 200,
          breachTerms: '违约方需支付违约金',
          contractTermination: '合同解除需书面通知双方',
          buyoutOption: 'yes',
          buyoutPrice: 5000,
          disputeResolution: '仲裁',
          grace_period: 1,
        });
      }
      setIsDataLoaded(true);
    }
  }, [projectDetail]);

  const handleSignatureClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };
  const handleBuyoutRightsChange = (value) => {
    setBuyoutRights(value === 'yes');
  };
  const handleSignatureSave = () => {
    message.success('签名成功');

    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL(); // 获取签名的图像数据URL

      // 将数据URL转换为Blob对象
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // 创建FormData对象并添加文件
      const formData = new FormData();
      formData.append('targetpath', '\\mybase\\resources'); // 文件路径
      formData.append('targetfile', `${Date.now()}.png`); // 目标文件名，可以自定义
      formData.append('file', blob); // 上传文件对象

      // 发送文件到服务器
      fetch('/doFileUpload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(' res', res);
          // 在此处将签名图像数据提交到服务器或进行其他必要的处理
          setSignatureData(`http://localhost:8081/myServer/mybase/resources/${res.targetfile}`);
          console.log(`http://localhost:8081/myServer/mybase/resources/${res.targetfile}`);
          setIsSignatureVisible(false);
        });
    }
  };
  const onFinish = (values) => {
    console.log(' values', values);
    editRecord(id, values, signatureData);
    console.log(' signatureData', signatureData);
  };
  const printContract = () => {
    // 获取Form表单元素
    const form = document.querySelector('form');

    // 创建一个新窗口
    const printWindow = window.open('', '_blank');

    // 构建打印内容
    let content = '<h1>合同内容</h1>';
    content += `<p><strong>${'甲方'}：</strong> ${'蒋建琪'}</p></br>`;
    content += `<p><strong>${'乙方'}：</strong> ${'蒋建琪'}</p></br></br>`;
    // 遍历Descriptions.Item组件
    // const descriptionItems = document.querySelectorAll('.ant-descriptions-item');
    // descriptionItems.forEach((item) => {
    //   const label = item.querySelector('.ant-descriptions-item-label').textContent;
    //   const value = item.querySelector('.ant-descriptions-item-content').textContent;

    //   // 添加Descriptions.Item的标签和值到打印内容中
    //   content += `<p><strong>${label}：</strong> ${value}</p>`;
    // });

    // 遍历Form表单中的所有表单项
    const formItems = form.querySelectorAll('input, select, textarea, .ant-select-selection-item');
    formItems.forEach((item) => {
      //   const label = item.parentNode.parentNode.querySelector('label').textContent;
      const label = item.parentNode.parentNode.parentNode.previousElementSibling
        ? item.parentNode.parentNode.parentNode.previousElementSibling.querySelector('label')
            .textContent
        : item.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling
        ? item.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelector(
            'label',
          ).textContent
        : '';
      const value = item.value ? item.value : item.textContent;

      // 添加表单项的标签和值到打印内容中
      if (label) {
        content += `<p><strong>${label}：</strong> ${value}</p>`;
      }
    });
    content += `<p><strong>${'甲方签名'}：</strong> <img src=${signatureData} /></p>`;

    // 在新窗口中显示打印内容
    printWindow.document.write(content);
    printWindow.document.close();

    // 打印新窗口
    printWindow.print();
  };
  return (
    <>
      <Card style={{ marginLeft: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            {/* 返回上一页面按钮 */}
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => history.push('/contract/contract-sign')}
            >
              返回
            </Button>
          </div>
          {/* 导航和操作按钮 */}
          <div>
            <Button type="primary" icon={<PrinterOutlined />} onClick={printContract}>
              打印合同
            </Button>
            <Button icon={<DownloadOutlined />} onClick={() => {}}>
              保存为PDF
            </Button>
            {/* 更多操作按钮 */}
            {/* ... */}
          </div>
        </div>
      </Card>
      {isDataLoaded && ( // 在数据加载完成后渲染表单
        <Form onFinish={onFinish} initialValues={initialValues} style={{ marginLeft: '30px' }}>
          <Card>
            <Descriptions title="合同基本信息" column={4} bordered>
              <Descriptions.Item label="合同编号">CONTRACT12345</Descriptions.Item>
              <Descriptions.Item label="合同日期">2023-05-16</Descriptions.Item>
              <Descriptions.Item label="客户名称">{projectDetail?.company_name}</Descriptions.Item>
            </Descriptions>
          </Card>
          {/* 租赁设备信息 */}
          <Card>
            <Row gutter={24} style={{ marginTop: '20px' }}>
              <Col span={12}>
                <Descriptions title="租赁设备信息" bordered>
                  <Descriptions.Item label="租赁物名称">
                    {projectDetail?.leased_item}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="数量">3</Descriptions.Item> */}
                </Descriptions>
              </Col>
            </Row>
          </Card>
          {/* 设备数量 */}
          <Card title="租赁数量及期限">
            <Row gutter={24} style={{ marginTop: '20px' }}>
              <Col span={4}>
                <Form.Item label="设备数量" name="equipmentQuantity">
                  <Input />
                </Form.Item>
              </Col>
              {/* 租赁期限 */}
              <Col span={5}>
                <Form.Item label="开始日期" name="startDate">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="结束日期" name="endDate">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {/* 租金支付 */}
          <Card title="租金支付">
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="租金金额" name="rentAmount">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="租金支付方式" name="rentPaymentMethod">
                  <Select placeholder="请选择支付方式">
                    <Option value="银行转账">银行转账</Option>
                    <Option value="支票">支票</Option>
                    <Option value="现金">现金</Option>
                    <Option value="支付宝">支付宝</Option>
                    <Option value="微信支付">微信支付</Option>
                    <Option value="信用卡支付">信用卡支付</Option>
                    <Option value="电汇">电汇</Option>
                    <Option value="托收">托收</Option>
                    <Option value="其他电子支付方式">其他电子支付方式</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="还款日期间隔" name="repaymentInterval">
                  {/* <Input.Group compact> */}
                  <Select placeholder="请选择还款日期间隔">
                    <Option value="每月">每月</Option>
                    <Option value="每季度">每季度</Option>
                    <Option value="每半年">每半年</Option>
                    <Option value="每年">每年</Option>
                  </Select>
                  {/* <Input style={{ width: '30%' }} placeholder="其他日期间隔" /> */}
                  {/* </Input.Group> */}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              {/* 滞纳金 */}
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      滞纳金&nbsp;
                      <Tooltip title="逾期未支付租金的罚款金额或比例">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  name="lateFeeRate"
                >
                  <Input type="number" placeholder="请输入滞纳金金额或比例" />
                </Form.Item>
              </Col>
              {/* 宽限期 */}
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      宽限期&nbsp;
                      <Tooltip title="宽限期是一个允许债务人在不产生滞纳金的期限，在宽限期内完成还款不会有任何额外费用。">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  name="grace_period"
                >
                  <Input type="number" placeholder="请输入宽限期" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* 押金 */}
          <Card title="押金">
            {/* <Row gutter={24}> */}
            <Col span={12}>
              <Form.Item label="押金金额" name="depositAmount">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="押金退还条件与方式" name="depositRefund">
                <Input.TextArea />
              </Form.Item>
            </Col>
            {/* </Row> */}
          </Card>

          {/* 设备使用和保养 */}
          <Card title="设备使用和保养">
            <Col span={12}>
              <Form.Item label="使用范围" name="usageScope">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    维护和保养责任&nbsp;
                    <Tooltip title="约定设备的维护和保养责任，包括保持设备的正常工作状态和安全性">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="maintenanceResponsibility"
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Card>

          {/* 设备保险 */}
          <Card title="设备保险">
            <Col span={12}>
              <Form.Item label="保险责任" name="insuranceResponsibility">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="保险费用" name="insuranceCost">
                <Input />
              </Form.Item>
            </Col>
          </Card>
          {/* 违约和解除合同 */}
          <Card title="违约和解除合同">
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    违约条款&nbsp;
                    <Tooltip title="约定当事方违反合同条款的后果和补救措施">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="breachTerms"
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    合同解除&nbsp;
                    <Tooltip title="约定合同解除的条件和程序">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="contractTermination"
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Card>

          {/* 买断设备 */}
          <Card title="买断设备">
            <Col span={6}>
              <Form.Item
                label={
                  <span>
                    买断权&nbsp;
                    <Tooltip title="约定客户是否具有买断设备的权利，并规定买断设备的价格和程序">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="buyoutOption"
              >
                <Select onChange={handleBuyoutRightsChange}>
                  <Option value="yes">有</Option>
                  <Option value="no">无</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* 买断价格 */}
            <Col span={6}>
              {buyoutRights ? (
                <Form.Item label="买断价格" name="buyoutPrice">
                  <Input placeholder="请输入买断价格" />
                </Form.Item>
              ) : (
                <Form.Item label="买断价格" name="buyoutPrice" initialValue={0} hidden>
                  <Input />
                </Form.Item>
              )}
            </Col>
          </Card>

          {/* 争议解决方式 */}
          <Card>
            <Col span={6}>
              <Form.Item label="争议解决方式" name="disputeResolution">
                <Select placeholder="请选择争议解决方式">
                  <Option value="仲裁">仲裁</Option>
                  <Option value="诉讼">诉讼</Option>
                  <Option value="协商调解">协商调解</Option>
                  <Option value="双方选择专家">双方选择专家</Option>
                  <Option value="线上争议解决平台">线上争议解决平台</Option>
                  <Option value="独立评估">独立评估</Option>
                  <Option value="调解委员会">调解委员会</Option>
                  <Option value="法律顾问">法律顾问</Option>
                  <Option value="其他特定的争议解决方式">其他特定的争议解决方式</Option>
                </Select>
              </Form.Item>
            </Col>
          </Card>

          {/* 签署和确认区域 */}
          <Card title="签署和确认区域">
            <Form.Item>
              <Button type="primary" onClick={() => setIsSignatureVisible(!isSignatureVisible)}>
                {/* <Button type="primary" onClick={() => setIsSignatureVisible(true)}> */}
                打开签名区域
              </Button>
            </Form.Item>

            {/* 签名区域 */}
            {isSignatureVisible && (
              <>
                <Form.Item label="签名日期">
                  <DatePicker />
                </Form.Item>

                <Form.Item label="签名">
                  <SignatureCanvas
                    penColor="black"
                    backgroundColor="#eee"
                    canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
                    ref={canvasRef}
                    // ref={(ref) => setSignature(ref)}
                  />
                </Form.Item>

                <Button onClick={handleSignatureClear}>清除签名</Button>
                <Button type="primary" onClick={handleSignatureSave}>
                  保存签名
                </Button>
              </>
            )}
          </Card>
          {/* 提交按钮 */}
          <Form.Item style={{ marginTop: '30px', textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              保存合同
            </Button>
          </Form.Item>
        </Form>
      )}
      {/* 其他辅助信息 */}
      <Card style={{ marginTop: '2rem', backgroundColor: '#aaa' }}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <h3 style={{ marginBottom: '0.5rem' }}>隐私政策</h3>
            <ul style={{ padding: '0px' }}>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;我们十分重视您的隐私和个人信息保护。在您使用我们的服务时，我们将遵守适用的隐私法律和法规，并采取相应措施保护您的个人信息安全和隐私。本隐私政策旨在向您说明我们收集、使用、存储和保护个人信息的方式。请在使用我们的服务前仔细阅读本隐私政策。
              </li>
              <li>
                1.
                收集的个人信息：我们可能收集您的姓名、联系方式、地址等个人信息，用于提供服务和与您沟通。
              </li>

              <li>
                2.
                个人信息使用：我们会合法、合规地使用收集的个人信息，用于向您提供所需的服务，并进行相关的业务沟通。
              </li>
              <li>
                3.
                个人信息保护：我们采取合理的安全措施保护您的个人信息，防止未经授权的访问、使用或泄露。
              </li>
              <li>
                4. 个人信息共享：除非获得您的明确同意或法律要求，我们不会向第三方共享您的个人信息。
              </li>
              <li>5. 个人信息存储和保留：我们将在法律要求的时间范围内存储和保留您的个人信息。</li>
              <li>
                6.
                其他事项：请详细阅读我们的完整隐私政策，了解更多关于个人信息的收集、使用和保护的细节。
              </li>
              <li>如有任何关于隐私政策的问题或疑虑，请联系我们的客户服务团队。</li>
            </ul>
          </Col>
          <Col span={8}>
            <h3 style={{ marginBottom: '0.5rem' }}>服务条款</h3>
            <ol style={{ padding: '0px' }}>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;欢迎使用我们的服务。本服务条款规定了您使用我们提供的服务的条件和规则。请在使用我们的服务之前仔细阅读本服务条款。
              </li>
              <li>
                服务使用：您同意使用我们提供的服务时遵守适用法律法规，并承担相应的责任和义务。
              </li>
              <li>
                知识产权：我们的服务和相关内容的知识产权归属于我们或我们的许可方。未经授权，您不得进行复制、修改、传播或进行其他侵权行为。
              </li>
              <li>
                免责声明：我们尽力提供准确和可靠的服务，但不对服务的适用性、可靠性和准确性作任何明示或暗示的保证。
              </li>
              <li>
                责任限制：在适用法律允许的范围内，我们对使用服务所产生的任何直接或间接损失概不负责。
              </li>
              <li>
                终止和解除：我们有权根据合理的判断终止或限制您使用服务的权利，或根据法律法规要求解除服务。
              </li>
            </ol>
            &nbsp;&nbsp;&nbsp;&nbsp;请仔细阅读我们的完整服务条款，了解更多关于服务使用的规定和限制。
            如果您对服务条款有任何疑问或疑虑，请联系我们的客户服务团队。
          </Col>
          <Col span={8}>
            <h3 style={{ marginBottom: '0.5rem' }}>法律声明</h3>
            <ul style={{ padding: '0px' }}>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;本法律声明适用于您使用我们的服务时的法律义务和责任。请在使用我们的服务前仔细阅读本法律声明。
              </li>
              <li>法律适用：您同意在使用我们的服务时遵守适用的法律法规，并承担相应的法律责任。</li>
              <li>
                免责声明：我们尽力提供准确和可靠的信息和服务，但不对信息的准确性、完整性和可靠性作任何明示或暗示的保证。
              </li>
              <li>
                限制责任：在适用法律允许的范围内，我们对使用服务所产生的任何直接或间接损失概不负责。
              </li>
              <li>
                知识产权：我们的服务和相关内容的知识产权归属于我们或我们的许可方。未经授权，您不得进行复制、修改、传播或进行其他侵权行为。
              </li>
            </ul>
            &nbsp;&nbsp;&nbsp;&nbsp;请详细阅读我们的完整法律声明，了解更多关于使用服务时的法律义务和责任。
            如果您对法律声明有任何疑问或疑虑，请联系我们的客户服务团队。
          </Col>
          <Col span={8}>
            <h3 style={{ marginBottom: '0.5rem' }}>租赁条款解释</h3>
            <ul style={{ padding: '0px' }}>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;本条款解释旨在向您说明与租赁设备相关的具体条款和条件。请在使用我们的租赁服务之前仔细阅读本条款解释。
              </li>
              <li>租赁设备描述：租赁设备包括压路机、挖掘机、粉碎机等，数量根据合同约定。</li>
              <li>租金支付：租金支付方式由双方协商确定，可选择银行转账、支票等支付方式。</li>
              <li>还款日期间隔：还款日期间隔根据合同约定，可选择每月、每季度等还款方式。</li>
              <li>滞纳金：如租金逾期未支付，将根据合同约定收取相应的滞纳金作为罚款。</li>
              <li>
                争议解决方式：在发生争议时，双方应尽量通过友好协商解决；如果无法协商解决，双方同意提交仲裁解决争议。
              </li>
            </ul>
            &nbsp;&nbsp;&nbsp;&nbsp;请详细阅读我们的完整租赁条款，了解更多关于租赁设备的具体条款和条件。
            如果您对租赁条款解释有任何疑问或疑虑，请联系我们的客户服务团队。
          </Col>
          <Col span={8}>
            <h3 style={{ marginBottom: '0.5rem' }}>联系方式</h3>
            <p>公司名称：JJQuiet融资租赁公司</p>
            <p>联系电话：123-456789</p>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ContractForm;
