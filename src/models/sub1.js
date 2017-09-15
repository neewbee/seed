/* global window */
import modelExtend from 'dva-model-extend'
import qs from 'qs'
import * as usersService from '../services/users'
import { query, create, remove, update } from '../services/user'
import { paginationModel } from './common'

const prefix = 'antdAdmin'

export default modelExtend(paginationModel, {
  namespace: 'sub1',

  state: {
    list: [],
    currentItem: "create",
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        console.log("location.search", location.search)
        if (location.pathname === '/nav1/subNav1') {
          dispatch({
            type: 'query',
            payload: qs.parse(location.search, { ignoreQueryPrefix: true }),
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      console.log("payload: ", payload)

      // TODO no global state
      if (!payload) {
        const search = window.location.search
        payload = qs.parse(search, { ignoreQueryPrefix: true })
      }
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

    *delete ({ payload:id }, { call, put, select }) {
      const data = yield call(remove, { id })
      const { selectedRowKeys } = yield select(_ => _.sub1)
      const { error } = data
      if (!error) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== id),
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
      const data = yield call(create, payload)
      const { error } = data
      if ( !error ) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ sub1 }) => sub1.currentItem.id)
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
