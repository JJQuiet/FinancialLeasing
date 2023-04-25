declare namespace API {
  type LoginParams = {
    phone_or_email?: string;
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
    mobile?: string;
    captcha?: string;
  };
  type LoginResult = {
    phone_or_email?: string;
    status?: string;
    type?: string;
    currentAuthority?: string;
  };
  type CurUser = {
    phone_or_email?: string;
    phone?: string;
    email?: string;
    username?: string; //指的是登录界面输入的用户名
    password?: string;
    authority?: string;
    name?: string;
    company_name?: string;
    legal_representative?: string;
    registered_capital?: number;
    unified_social_credit_code?: string;
    official_site?: string;
    address?: string;
    phone_company?: string;
    company_name_english?: string;
    avatar?: string;
  };
  type CurrentUser = {
    authority?: string;
    access?: string;
    address?: string;
    age?: number;
    authority?: string;
    avatar?: string;
    birthdate?: string;
    company_name?: string;
    company_name_english?: string;
    country?: string;
    department?: string;
    email?: string;
    gender?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    group?: string;
    hire_date?: string; //入职时间
    id?: number;
    id_card_number?: string; //身份证号
    isLogin?: boolean;
    leave_date?: string; //离职时间
    legal_representative?: string;
    name?: string;
    notifyCount?: number;
    // notice?: []; //很可能出问题
    official_site?: string;
    password?: string;
    phone?: string;
    phone_company?: string;
    phone_or_email?: string;
    political_status?: string;
    position?: string; //职位
    registered_capital?: number;
    remark?: string; //备注
    signature?: string;
    status?: string; //在职状态
    sysrowno?: number;
    tags?: { key?: string; label?: string }[];
    title?: string;
    unified_social_credit_code?: string;
    unreadCount?: number;
    userid?: string;
    username?: string; //指的是登录界面输入的用户名
  };
  // 项目审批  project_to_approve
  type Project = {
    id?: number;
    customer?: string;
    item?: string;
    term?: number;
    amount?: number;
    type?: string;
    supplier?: string;
    MODE?: string;
    STATUS?: string;
  };
}
