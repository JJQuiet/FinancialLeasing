import { message } from 'antd';
import { Effect, Reducer, Subscription } from 'umi';
import request from 'umi-request';

// import {  getRemoteList,  editRecord,  deleteRecord,  addRecord,} from '../tenantry03_dva_basicTable/service';

const getRemoteList = async () => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(JSON.stringify({ sqlprocedure: 'b02_select_all_tenantry' })),
    {
      method: 'GET',
    },
  )
    .then(function (response) {
      return { data: response.rows, success: true };
    })
    .catch(function (error) {});
};
const editRecord = async ({ values }) => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(
        JSON.stringify({
          sqlprocedure: 'b05_edit_tenantry_basicTable_changeCompanyName_baseEmail',
          company_name: values.company_name,
          email: values.email,
        }),
      ),
    {},
  )
    .then(function (response) {
      message.success('编辑成功！');
      return response;
    })
    .catch(function (error) {});
};
const addRecord = async ({ values }) => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(
        JSON.stringify({
          sqlprocedure: 'b06_add_tenantry_basicTable_no_foreignkey',
          email: values.email,
          name: values.name,
          phone: values.phone,
          company_name: values.company_name,
          legal_representative: values.legal_representative,
          registered_capital: values.registered_capital,
          unified_social_credit_code: values.unified_social_credit_code,
          official_site: values.official_site,
          address: values.address,
          phone_company: values.phone_company,
          company_name_english: values.company_name_english,
          avatar: values.avatar,
        }),
      ),
    {},
  )
    .then(function (response) {
      message.success('添加成功！');
      return response;
    })
    .catch(function (error) {});
};
const deleteRecord = async ({ record }) => {
  return request(
    `http://localhost:8081/myServer/doSQL?paramvalues=` +
      encodeURIComponent(
        JSON.stringify({ sqlprocedure: 'b04_delete_tenantry_basicTable', email: record.email }),
      ),
    {
      method: 'post',
    },
  )
    .then(function (response) {
      message.success('删除成功！');
      return response;
    })
    .catch(function (error) {});
};

export interface SingleTenantryType {
  phone?: string;
  email?: string;
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
}
export interface TenantryState {
  data: SingleTenantryType[];
  success: boolean;
}

export interface IndexModelType {
  namespace: 'customer-credit';
  state: TenantryState;
  effects: {
    getRemote: Effect;
    edit: Effect;
    add: Effect;
    deleteRow: Effect;
  };
  reducers: {
    getList: Reducer<TenantryState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;3
  };
  subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
  namespace: 'customer-credit',

  state: {
    data: [],
    success: true,
  },

  effects: {
    // *query({ payload }, { call, put }) {},
    *getRemote(action, { put, call }): any {
      // *getRemote({ type, payload }, { put, call }) {
      // getRemote(action, effects){
      const data = yield call(getRemoteList);
      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit({ type, payload: { values } }, { put, call }) {
      yield call(editRecord, { values });
      yield put({
        type: 'getRemote',
      });
    },
    *add({ type, payload: { values } }, { put, call }) {
      yield call(addRecord, { values });
      yield put({
        type: 'getRemote',
      });
    },
    *deleteRow({ type, payload: { record } }, { put, call }) {
      // *deleteRow({type,payload:{id,values}}, {put,call}){
      // yield call(deleteRecord, {id, values});
      yield call(deleteRecord, { record });
      yield put({
        type: 'getRemote',
      });
    },
  },
  reducers: {
    getList(state, { type, payload }) {
      // getList(state, action) {

      return payload;
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/organization/tenantry') {
          // dispatch({
          //   type: 'getRemote',
          // });
        }
      });
    },
  },
};

export default IndexModel;
