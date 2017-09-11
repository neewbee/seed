import qs from 'qs'

import request from '../utils/request'
import config from '../utils/config'

const { api } = config
const { user } = api

export async function query (params) {
  console.log("params:", params)
  return request(`${user}/?${qs.stringify(params)}`, {
    method: 'GET',
  })
}

export async function create (params) {
  return request(user.replace('/:id', ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}

export async function remove (id) {
  return request(`${user}/${id}`, {
    method: 'DELETE',
  })
}

export async function update (params) {
  return request(user, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}