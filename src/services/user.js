import qs from 'qs'

import request from '../utils/request'
import { api } from '../utils/config'

const { user, users } = api

export async function query (params) {
  console.log("params:", params)
  return request(`${users}/?${qs.stringify(params)}`, {
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

export async function remove ({id}) {
  return request(user.replace(':id', id), {
    method: 'DELETE',
  })
}

export async function update (params) {
  return request(user.replace(':id', params.id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
