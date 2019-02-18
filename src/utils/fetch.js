import fetch from 'isomorphic-fetch'

import Config from '../config'

const handleHTTPErrors = (res) => {
  if (res.ok) return res
  return res.json().then((err) => { throw err })
}

export default (url, options) => {
  const jwtToken = localStorage.getItem(Config.LocalStorageKeys.Authorization)
  if (jwtToken) {
    let authAddedOptions = options
    if (typeof options !== 'object') {
      authAddedOptions = {}
    }
    if (typeof authAddedOptions.headers !== 'object') {
      authAddedOptions.headers = {}
    }
    authAddedOptions.headers = {
      ...authAddedOptions.headers,
      Authorization: jwtToken
    }
    return fetch(url, authAddedOptions).then(handleHTTPErrors)
  } else {
    return fetch(url, options).then(handleHTTPErrors)
  }
}
