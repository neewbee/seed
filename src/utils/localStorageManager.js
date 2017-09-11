/*
* @author liuwei @ZTO devops
*
* manage localStorages
* */


class localStorageManager {
  constructor () {
    this.items = new Set()
  }

  register (item, value) {
    this.items.add(item)
    window.localStorage.setItem(item, value)
  }

  clearAll () {
    for (let item of this.items) {
      window.localStorage.removeItem(item)
    }
    this.items = new Set()
  }

  getItems () {
    return Array.from(this.items)
  }
}

const lsm = new localStorageManager()

export default lsm
