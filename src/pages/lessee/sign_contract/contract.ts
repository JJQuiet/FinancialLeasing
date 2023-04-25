// 定义合同数据的类型
export type Contract = {
  id: string; // 合同编号
  title: string; // 合同标题
  content: string; // 合同内容
  contentMd5: string; // 合同内容的 MD5 值，用于校验文件完整性
  contentType: string; // 合同内容的类型，例如 application/pdf
  fileSize: number; // 合同内容的大小，单位字节
  userId: string; // 用户唯一标识，可以是手机号或者邮箱等
  userName: string; // 用户姓名
  userIdCard: string; // 用户身份证号码
  userMobile: string; // 用户手机号码，用于接收短信验证码
  signature: string; // 电子签章的标识，可以是文件流标识或者签署记录标识等
};
