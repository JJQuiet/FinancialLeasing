// 引入相关模块和类型
import axios from 'axios';
import { Contract } from './contract';

// 定义 e签宝 的相关配置
const ESignConfig = {
  appId: 'your app id', // 应用标识
  appSecret: 'your app secret', // 应用密钥
  baseUrl: 'https://smlopenapi.esign.cn', // API 基础地址
  templateId: 'your template id', // 签章模板标识
};

// 定义契约锁 的相关配置
const QiyuesuoConfig = {
  accessKey: 'your access key', // 接入方密钥
  accessSecret: 'your access secret', // 接入方私钥
  baseUrl: 'https://openapi.qiyuesuo.com', // API 基础地址
  sealId: 'your seal id', // 签章标识
};

// 定义 e签宝 的签署合同的函数
export async function signContractWithESign(contractId: string): Promise<any> {
  try {
    // 获取合同数据
    const contract = await getContractById(contractId);

    // 创建个人账号
    const createAccountRes = await axios.post(
      `${ESignConfig.baseUrl}/v1/accounts/createByThirdPartyUserId`,
      {
        thirdPartyUserId: contract.userId, // 用户唯一标识，可以是手机号或者邮箱等
        name: contract.userName, // 用户姓名
        idType: 'CRED_PSN_CH_IDCARD', // 证件类型，这里使用身份证
        idNumber: contract.userIdCard, // 证件号码
      },
      {
        headers: {
          'X-Tsign-Open-App-Id': ESignConfig.appId, // 应用标识
          'X-Tsign-Open-Token': ESignConfig.appSecret, // 应用密钥
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取个人账号标识
    const accountId = createAccountRes.data.accountId;

    // 创建文件流
    const createFileRes = await axios.post(
      `${ESignConfig.baseUrl}/v1/files/getUploadUrl`,
      {
        contentMd5: contract.contentMd5, // 文件内容的 MD5 值，用于校验文件完整性
        contentType: contract.contentType, // 文件类型，例如 application/pdf
        fileName: contract.title, // 文件名称，带后缀名
        fileSize: contract.fileSize, // 文件大小，单位字节
      },
      {
        headers: {
          'X-Tsign-Open-App-Id': ESignConfig.appId,
          'X-Tsign-Open-Token': ESignConfig.appSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取文件流标识和上传地址
    const fileId = createFileRes.data.fileId;
    const uploadUrl = createFileRes.data.uploadUrl;

    // 上传文件内容到指定地址
    await axios.put(uploadUrl, contract.content, {
      headers: {
        'Content-Type': contract.contentType,
      },
    });

    // 创建签署流程
    const createFlowRes = await axios.post(
      `${ESignConfig.baseUrl}/v1/signflows`,
      {
        flowName: contract.title, // 签署流程名称
        businessScene: '融资租赁', // 业务场景
        autoArchive: true, // 是否自动归档
        configInfo: {
          noticeType: '1', // 通知类型，1 表示短信
          redirectUrl: 'your redirect url', // 签署完成后的回调地址
        },
      },
      {
        headers: {
          'X-Tsign-Open-App-Id': ESignConfig.appId,
          'X-Tsign-Open-Token': ESignConfig.appSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取签署流程标识
    const flowId = createFlowRes.data.flowId;

    // 添加签署区域
    await axios.post(
      `${ESignConfig.baseUrl}/v1/signflows/${flowId}/documents`,
      {
        docs: [
          {
            fileId: fileId, // 文件流标识
            encryption: false, // 是否加密
            fileName: contract.title, // 文件名称
            filePassword: '', // 文件密码，如果加密则必填
          },
        ],
        signfields: [
          {
            accountId: accountId, // 个人账号标识
            signType: 1, // 签署类型，1 表示平台方自动盖章
            sealId: ESignConfig.templateId, // 签章模板标识
            posBean: {
              posPage: '1', // 签署页码，从 1 开始
              posX: '100', // 签署横坐标，以左下角为原点，单位毫米
              posY: '100', // 签署纵坐标，以左下角为原点，单位毫米
              width: '100', // 签章宽度，单位毫米
            },
          },
        ],
      },
      {
        headers: {
          'X-Tsign-Open-App-Id': ESignConfig.appId,
          'X-Tsign-Open-Token': ESignConfig.appSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 开启签署流程
    await axios.put(
      `${ESignConfig.baseUrl}/v1/signflows/${flowId}/start`,
      {},
      {
        headers: {
          'X-Tsign-Open-App-Id': ESignConfig.appId,
          'X-Tsign-Open-Token': ESignConfig.appSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 返回签署结果
    return {
      success: true,
      message: '签署成功',
      signature: fileId, // 可以使用文件流标识作为电子签章的标识
    };
  } catch (error) {
    // 处理异常情况
    return {
      success: false,
      message: error.message || '签署失败',
      signature: '',
    };
  }
}

// 定义契约锁 的签署合同的函数
export async function signContractWithQiyuesuo(contractId: string): Promise<any> {
  try {
    // 获取合同数据
    const contract = await getContractById(contractId);

    // 创建合同主题
    const createSubjectRes = await axios.post(
      `${QiyuesuoConfig.baseUrl}/subject/create`,
      {
        subjectName: contract.title, // 合同主题名称
        subjectDesc: contract.content, // 合同主题描述
        subjectTypeCode: 'LEASE_CONTRACT', // 合同主题类型编码，可以自定义或使用预置的类型编码，例如 LEASE_CONTRACT 表示租赁合同
        subjectDataJsonString: JSON.stringify(contract) || '{}', // 合同主题数据，可以存储一些额外的信息，例如合同金额、租赁期限等，格式为 JSON 字符串
      },
      {
        headers: {
          accessKey: QiyuesuoConfig.accessKey, // 接入方密钥
          accessSecret: QiyuesuoConfig.accessSecret, // 接入方私钥
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取合同主题标识
    const subjectId = createSubjectRes.data.subjectId;

    // 上传合同文件
    const uploadFileRes = await axios.post(
      `${QiyuesuoConfig.baseUrl}/file/upload`,
      contract.content, // 文件内容，可以是 Buffer 或者 Stream
      {
        headers: {
          accessKey: QiyuesuoConfig.accessKey,
          accessSecret: QiyuesuoConfig.accessSecret,
          'Content-Type': contract.contentType, // 文件类型，例如 application/pdf
          'Content-MD5': contract.contentMd5, // 文件内容的 MD5 值，用于校验文件完整性
          'Content-Disposition': `attachment;filename=${contract.title}`, // 文件名称，带后缀名
        },
      },
    );

    // 获取文件标识
    const fileId = uploadFileRes.data.fileId;

    // 创建合同文件版本
    const createFileVersionRes = await axios.post(
      `${QiyuesuoConfig.baseUrl}/fileversion/create`,
      {
        subjectId: subjectId, // 合同主题标识
        fileId: fileId, // 文件标识
        versionName: 'v1.0', // 版本名称，可以自定义
        versionDesc: '初始版本', // 版本描述，可以自定义
      },
      {
        headers: {
          accessKey: QiyuesuoConfig.accessKey,
          accessSecret: QiyuesuoConfig.accessSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取合同文件版本标识
    const fileVersionId = createFileVersionRes.data.fileVersionId;

    // 创建合同签署方
    const createSignerRes = await axios.post(
      `${QiyuesuoConfig.baseUrl}/signer/create`,
      {
        subjectId: subjectId, // 合同主题标识
        signerType: 'PERSONAL', // 签署方类型，PERSONAL 表示个人，COMPANY 表示企业
        name: contract.userName, // 签署方姓名
        identityType: 'IDCARD', // 证件类型，IDCARD 表示身份证
        identity: contract.userIdCard, // 证件号码
        mobile: contract.userMobile, // 手机号码，用于接收短信验证码
      },
      {
        headers: {
          accessKey: QiyuesuoConfig.accessKey,
          accessSecret: QiyuesuoConfig.accessSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取合同签署方标识
    const signerId = createSignerRes.data.signerId;

    // 创建合同签署记录
    const createSignRecordRes = await axios.post(
      `${QiyuesuoConfig.baseUrl}/signrecord/create`,
      {
        subjectId: subjectId, // 合同主题标识
        fileVersionId: fileVersionId, // 合同文件版本标识
        signerId: signerId, // 签署方标识
        sealTypeCode: 'TEMPLATE', // 签章类型编码，TEMPLATE 表示使用模板签章，SEAL 表示使用印章图片，KEYWORD 表示使用关键字定位签章位置
        sealTemplateCode: QiyuesuoConfig.sealId, // 签章模板编码，如果使用模板签章，则必填，可以在契约锁平台上创建和管理签章模板
        signOrder: 1, // 签署顺序，从 1 开始，表示第一个签署的人
        signPositionTypeCode: 'COORDINATE', // 签章位置类型编码，COORDINATE 表示使用坐标定位签章位置，KEYWORD 表示使用关键字定位签章位置
        signPositionPageNumber: 1, // 签署页码，从 1 开始
        signPositionXAxisOffsetMillimeter: 100, // 签章横坐标偏移量，以左下角为原点，单位毫米
        signPositionYAxisOffsetMillimeter: 100, // 签章纵坐标偏移量，以左下角为原点，单位毫米
        signPositionWidthMillimeter: 100, // 签章宽度，单位毫米
      },
      {
        headers: {
          accessKey: QiyuesuoConfig.accessKey,
          accessSecret: QiyuesuoConfig.accessSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 获取合同签署记录标识
    const signRecordId = createSignRecordRes.data.signRecordId;

    // 发起合同签署
    const startSignRes = await axios.post(
      `${QiyuesuoConfig.baseUrl}/subject/start`,
      {
        subjectId: subjectId, // 合同主题标识
      },
      {
        headers: {
          accessKey: QiyuesuoConfig.accessKey,
          accessSecret: QiyuesuoConfig.accessSecret,
          'Content-Type': 'application/json',
        },
      },
    );

    // 返回签署结果
    return {
      success: true,
      message: '签署成功',
      signature: signRecordId, // 可以使用签署记录标识作为电子签章的标识
    };
  } catch (error) {
    // 处理异常情况
    return {
      success: false,
      message: error.message || '签署失败',
      signature: '',
    };
  }
}
