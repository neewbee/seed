import request from '../utils/request'
import config from '../utils/config'

const { api } = config
const { users } = api

export async function query () {
  return request(users, {
    method: 'GET',
  })
}

export async function remove (params) {
  return request(`${users}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
