import { List } from 'immutable';
import Config from '../../config';
import { fetch } from '../../utils';
import UserModel from './user-model';

const HOSTNAME = process.env.API_HOSTNAME;

export const loginUser = (credentials) => {
  return fetch(`${HOSTNAME}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    if(payload.success === false) {
      throw new Error(payload.message)
    }
    return payload
  })
  .catch((error) => {
    throw error
  })
}

export const signupUser = (credentials) => {
  return fetch(`${HOSTNAME}/api/v1/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    if(payload.success === false) {
      throw new Error(payload.message)
    }
    return payload
  })
  .catch((error) => {
    throw error
  })
}


export const getUser = (credentials) => {
  return fetch(`${HOSTNAME}/api/v1/getUserById/${credentials}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    if(payload.success === false) {
      throw new Error(payload.message)
    }
    return payload
  })
  .catch((error) => {
    throw error
  })
}


export const updateProfile = (data) => {
  return fetch(`${HOSTNAME}/api/v1/updateRegistration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((payload) => {
    return payload
  }).catch((error) => {
   throw error
  })
}

export const signOut = (data) => {
  return fetch(`${HOSTNAME}/api/v1/signOut/${data.data._id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .then((payload) => {
    return payload
  }).catch((error) => {
   throw error
  })
}

