import fetch from 'dva/fetch'

function checkStatus (response) {
  if (response.ok) {
    return response
  }

  return response.json().then((json) => {
    const error = new Error(json.message || response.statusText)
    error.response = response
    throw error
  })
}

function parseJSON (response) {
  return response.text().then(text => {
    return text ? JSON.parse(text) : {}
  })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request (url, options) {
  console.log('request: ', url)
  console.log("options", options)
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => {
      console.log("err----------------" , err)
      return { err }
    })
}
