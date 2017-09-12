import modelExtend from 'dva-model-extend'
import { DEFAULT_PAGE_SIZE } from '../utils/config'
// 通用 Model 更新state 清除state 等等
const baseModel = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

// 常用组件的Model 例如分页 弹窗等等组件
const paginationModel = modelExtend(baseModel, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
      pageSize:DEFAULT_PAGE_SIZE,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})


module.exports = {
  baseModel,
  paginationModel,
}
