/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 
 * @Date: 2021-10-12 09:56:49
 * @LastEditors: YingJie Xing
 * @LastEditTime: 2021-10-13 14:53:59
 * @FilePath: \antd_pro_shop_admins\ant-design-pro\src\models\user.ts
 * Copyright 2021 YingJie Xing, All Rights Reserved. 
 */
import type { Effect, Reducer } from 'umi';

// import { queryCurrent, query as queryUsers } from '@/services/user';
import { loginSetCurUser } from '@/services/login';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: API.CurrentUser;
  // state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    // currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }):any {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    //获取当前登陆用户数据
    *fetchCurrent({payload}, { call, put }):any {
      //看localstroage里是否有用户信息
      let localCurUser = JSON.parse(localStorage.getItem('localCurUser') || '')
      let userInfo;
      if (localCurUser) {
      // if (!localCurUser) {
        userInfo = yield call(loginSetCurUser,localCurUser);
        //判断是否获取到用户信息
        // if (userInfo.id !== undefined) {
          //把用户信息存入localstroage里
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        // }
      }

      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        ...action.payload || {},
        // currentUser: action.payload || {},
      };
    },

  },
};

export default UserModel;
