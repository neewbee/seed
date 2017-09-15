import lodash from 'lodash'

/*@param menuData <Number> 菜单层级
* 返回一级路由
*
* */

const getNavMenu = menuData => {
  const { menu, flag } = menuData

  // 一级路由id长度为flag
  const length = flag

  return menu
    .filter(({ id }) => String(id).length === length)
    .sort((a, b) => a - b)
}

// 根据key 和 value 返回对应的路由对象数组 没有返回undefined
const getRoutesByKeyValue = (key, value, routeMap) => {
  const keys = ['id', 'pid', 'name', 'route']
  if (keys.indexOf(key) === -1) {
    return undefined
  }
  return routeMap.menu.filter(routeObject => value === routeObject[key])
}

//
// 将 声明式的 list 转化为 有从属关系的树状结构
// https://stackoverflow.com/questions/22367711/construct-hierarchy-tree-from-flat-list-with-parent-field
const listToTree = (
  list,
  idAttr = 'id',
  parentAttr = 'pid',
  childrenAttr = 'children'
) => {
  let _list = lodash.cloneDeep(list).filter(_ => _.pid !== null)

  const treeList = []
  const lookup = {}
  _list.forEach(function (obj) {
    lookup[obj[idAttr]] = obj
    obj[childrenAttr] = []
  })
  _list.forEach(function (obj) {
    // if (obj[parentAttr] !== null) {
    //   debugger
    //   const pid = obj[parentAttr]
    //   const bb = lookup[pid]
    //   bb[childrenAttr].push(obj)
    // } else {
    //   treeList.push(obj)
    // }
    const pid = obj[parentAttr]
    const bb = lookup[pid]
    if (!bb) {
      treeList.push(obj)
    } else {
      bb[childrenAttr].push(obj)
    }
  })
  return treeList
}
/*
* 根据route返回id和所有的父id
* */
const getPidsAndIdByRoute = (currentRoute, routeMap) => {
  let pids = [], id = -1
  const { flag } = routeMap
  const currentRouteObject = routeMap.menu.find(
    ({ route }) => currentRoute === route
  )
  if (currentRouteObject) {
    id = currentRouteObject.id
    const array = String(id).split('')
    const getPids = () => {
      if (array.length > Number(flag)) {
        array.splice(0 - Number(flag)).join('')
        pids.push(array.join(''))
        getPids()
      }
    }
    getPids()
  }
  return { pids, id }
}



export default {
  getNavMenu,
  getRoutesByKeyValue,
  listToTree,
  getPidsAndIdByRoute,
}
