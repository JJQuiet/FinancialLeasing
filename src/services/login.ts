import { message } from 'antd';
import { request } from 'umi';
export async function accountLoginState(data: API.LoginParams) {
  return request<API.LoginResult>('/doSQL', {
    method: 'POST',
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b01_login01',
        phone_or_email: data.username,
        password: data.password,
      }),
    },
  })
    .then(function (response: any) {
      return {
        username: data.username,
        status: 'ok',
        type: 'account',
        authority: response.rows[0].authority,
      };
    })
    .catch(function (error: any) {});
}
export async function loginSetCurUser(data: any) {
  return request('/doSQL', {
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b03_login_curUser',
        phone_or_email: data.username,
        authority: data.authority,
      }),
    },
  })
    .then((res: any) => {
      return {...res?.rows?.[0],authority: data.authority};
    })
    .catch((err: any) => {
      message.error(JSON.stringify(err));
    });
}
