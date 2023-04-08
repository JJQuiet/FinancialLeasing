import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {
  getRemoteList,
  editRecord,
  deleteRecord,
  addRecord,
} from '../tenantry03_dva_basicTable/service';

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
  namespace: 'tenantry03_dva_basicTable';
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
  namespace: 'tenantry03_dva_basicTable',

  state: {
    data: [],
    success: true,
  },

  effects: {
    // *query({ payload }, { call, put }) {},
    *getRemote(action, { put, call }) {
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
        if (pathname === '/organization/tenantry03_dva_basicTable') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default IndexModel;
