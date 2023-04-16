import { Effect, Reducer,history } from 'umi';
import { accountLoginState } from '@/services/login';
import { message } from 'antd';
export type LoginModelType = {
  namespace: string;
  state: API.LoginResult;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<API.LoginResult>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }): any {
      const response = yield call(accountLoginState, payload);
      console.log('[ response ]-21-「/src/models/login」', response);
      if (response.status === 'ok') {
        message.success('登陆成功 login model')
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        //跳转到首页
        // history.push('/');
      }
    },
    *logout(_, { put }) {
      // 清除localStorage中的登录信息
      // localStorage.removeItem('localCurUser');
      // 更新currentUser
      yield put({
        type: 'changeLoginStatus',
        payload: {},
      });
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(
        '[ payload ]-「f:/users/Documents/IT/webFrontEnd/React/umi03/src/models/login」',
        payload,
      );

      // setAuthority(payload.access_token);
      //将token存入locallstorage里
      localStorage.setItem('localCurUser', JSON.stringify(payload));
      // localStorage.setItem('access_token', JSON.stringify(payload.access_token));
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
