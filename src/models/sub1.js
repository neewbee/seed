/* global window */
import modelExtend from 'dva-model-extend'
import config from '../utils/config'
import * as usersService from '../services/users'
import { create, remove, update } from '../services/user'
import { paginationModel } from './common'

const prefix = 'antdAdmin'

const { query } = usersService

export default modelExtend(paginationModel, {
  namespace: 'sub1',

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
    currentItem: "create",
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/nav1/subNav1') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)

      if (!data.error) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      const { error } = data
      if (!error) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *multiDelete ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      const { error } = data
      if ( !error ) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      }
    },

    *create ({ payload }, { call, put }) {
      console.log("payload", payload)
      const data = yield call(create, payload)
      console.log("data", data)
      const { error } = data
      if ( !error ) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      const { error } = data
      if (!error) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },
})
