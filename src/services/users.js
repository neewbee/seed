import request from '../utils/request'
import { api } from '../utils/config'

const { users } = api

export async function query () {
  return request(users, {
    method: 'GET',
  })
}

export async function remove (params) {
  return request(`${users}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
