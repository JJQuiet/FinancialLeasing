
// 定义项目数据的接口，包含id、名称、类型、金额和状态等属性
export interface Project {
  id: string;
  name: string;
  type: string;
  amount: number;
  status: string;
}

// 定义政策数据的接口，包含id、标题、摘要和内容等属性
export interface Policy {
  id: string;
  title: string;
  summary: string;
  content: string;
}

// 定义培训数据的接口，包含id、标题、日期、地点和内容等属性
export interface Training {
  id: string;
  title: string;
  date: string;
  location: string;
  content: string;
}

// 定义合同数据的接口，包含id、编号、签订日期、生效日期、到期日期和文件地址等属性
export interface Contract {
  id: string;
  number: string;
  signDate: string;
  startDate: string;
  endDate: string;
  fileUrl: string;
}

// 定义还款数据的接口，包含id、期数、应还日期、应还金额、实还金额、实还日期和状态等属性
export interface Repayment {
  id: string;
  period: number;
  dueDate: string;
  dueAmount: number;
  paidAmount: number;
  paidDate: string;
  status: string;
}