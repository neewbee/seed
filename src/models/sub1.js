/* global window */
import modelExtend from 'dva-model-extend'
import config from '../utils/config'
import * as usersService from '../services/users'
import { query, create, remove, update } from '../services/user'
import { paginationModel } from './common'
import qs from 'qs'

const prefix = 'antdAdmin'

const { queryUsers } = usersService

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
    *query ({ payload = {} }, { call, put }) {
      console.log("payload: ", payload)
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

    *create ({ formData, search }, { call, put }) {
      const data = yield call(create, formData)
      const { error } = data
      if ( !error ) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query', payload:qs.parse(search, { ignoreQueryPrefix: true }) })
      }
    },

    *update ({ formData, search }, { select, call, put }) {
      const id = yield select(({ sub1 }) => sub1.currentItem.id)
      const newUser = { ...formData, id }
      const data = yield call(update, newUser)
      const { error } = data
      if (!error) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query', payload:qs.parse(search, { ignoreQueryPrefix: true }) })
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
