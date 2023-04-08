import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getRemoteList,editRecord } from './service';

export interface IndexModelState {
  data?:any;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    getRemote: Effect;
    edit: Effect;
  };
  reducers: {
    getList: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',

  state: {
    data: [],
  },

  effects: {
    // *query({ payload }, { call, put }) {},
    *getRemote({type,payload}, {put,call}){
    // getRemote(action, effects){
      const data = yield call(getRemoteList);
      yield put({
        type: 'getList',
        payload: data,
      })
    },
    *edit({type,payload:{id,values}}, {put,call}){
      const data = yield call(editRecord, {id, values});
    }
  },
  reducers: {
    getList(state, {type, payload}) {
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
        if (pathname === '/organization/tenantryDva') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default IndexModel;