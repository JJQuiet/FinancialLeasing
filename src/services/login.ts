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
        pagesize: 22,
      }),
    },
  })
    .then(function (response: any) {
      console.log('[ response ]-15-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/services/login」', response);
      return {username:data.username, status: 'ok', type: 'account', authority: response.rows[0].authority };
    })
    .catch(function (error) {});
};
export async function loginSetCurUser(data: any){
  console.log('[ function loginSetCurUser data ]-20-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/services/login」', data);
  return request('/doSQL',{
    params: {
      paramvalues: JSON.stringify({
        sqlprocedure: 'b03_login_curUser',
        phone_or_email: data.username,
        // phone_or_email: data.username,
        // authority: data.currentAuthority
        authority: data.authority
      })
    }
  }).then(res => {
    console.log('[function loginSetCurUser res ]-30-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/services/login」', res);
    return res?.rows?.[0];
  }).catch(err =>{
    message.error(JSON.stringify(err))
  })
}
