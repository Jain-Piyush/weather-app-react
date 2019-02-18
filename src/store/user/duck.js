import Rx from 'rxjs/Rx'
import { Record } from 'immutable'
import { combineEpics } from 'redux-observable'
import HttpStatus from 'http-status-codes'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'
import Config from '../../config'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const LOGIN_USER = 'ReactProject/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'ReactProject/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'ReactProject/user/LOGIN_USER_ERROR'

export const SIGNUP_USER = 'ReactProject/user/SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'ReactProject/user/SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_ERROR = 'ReactProject/user/SIGNUP_USER_ERROR'

export const GET_USER = 'ReactProject/user/GET_USER'
export const GET_USER_SUCCESS = 'ReactProject/user/GET_USER_SUCCESS'
export const GET_USER_ERROR = 'ReactProject/user/GET_USER_ERROR'

export const UPDATE_PROFILE = 'ReactProject/user/UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'ReactProject/user/UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_ERROR = 'ReactProject/user/UPDATE_PROFILE_ERROR'

export const SIGN_OUT = 'ReactProject/user/SIGN_OUT'
export const SIGN_OUT_SUCCESS = 'ReactProject/user/SIGN_OUT_SUCCESS'
export const SIGN_OUT_ERROR = 'ReactProject/user/SIGN_OUT_ERROR'

export const CLEAR_PHASE = 'ReactProject/user/CLEAR_PHASE'

/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  token: null,  // We need this here to tell InitialState that there is a token key,
                // but it will be reset below to what is in localStorage, unless a value
                // is passed in when the object is instanciated
  phase: INIT,
  fetchPhase: INIT,
  user: null,
  users: [],
  userdata:[],
  dataPhase: INIT,
  updatePhase: INIT,
  error: null,
  isSubmitting: false,
  message:'',
  success:'',
}
class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = localStorage.getItem(Config.LocalStorageKeys.Authorization)
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements
export default function (state = new InitialState(), action = {}) {

  switch (action.type) {
    case LOGIN_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      window.localStorage.setItem(Config.LocalStorageKeys.Authorization, payload.data.token)
      window.localStorage.setItem("user", JSON.stringify(payload.data.account))
      return state
        .set('phase', SUCCESS)
        .set('user', payload.data.account)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', ERROR)
        .set('isSubmitting', false)
    }
    
    case SIGNUP_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case SIGNUP_USER_SUCCESS: {
      const { payload } = action
      window.localStorage.setItem(Config.LocalStorageKeys.Authorization, payload.data.token)
      window.localStorage.setItem("user", JSON.stringify(payload.data.account))
      return state
        .set('phase', SUCCESS)
        .set('user', payload.data.account)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case SIGNUP_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', ERROR)
        .set('isSubmitting', false)
    }
    
    case GET_USER: {
      return state
        .set('fetchPhase', INIT)
        .set('updatePhase', INIT)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case GET_USER_SUCCESS: {
      const { payload } = action
      window.localStorage.setItem("user", JSON.stringify(payload.data))
      return state
        .set('fetchPhase', SUCCESS)
        .set('user', payload.data)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case GET_USER_ERROR: {
      window.localStorage.clear();
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('isSubmitting', false)
    }
    
    case UPDATE_PROFILE: {
      return state
        .set('updatePhase', INIT)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case UPDATE_PROFILE_SUCCESS: {
      const { payload } = action
      if (payload.success){
        window.localStorage.setItem("user", JSON.stringify(payload.data.account))
        return state
          .set('updatePhase', SUCCESS)
          .set('user', payload.data.account)
          .set('error', null)
          .set('isSubmitting', false)
      }else{
        return state
          .set('error', payload.message)
          .set('updatePhase', ERROR)
          .set('isSubmitting', false)
      }
    }

    case UPDATE_PROFILE_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('updatePhase', ERROR)
        .set('isSubmitting', false)
    }


    case SIGN_OUT: {
      return state
        .set('phase', INIT)
        .set('error', null)
    }

    case SIGN_OUT_SUCCESS: {
      const { payload } = action
      localStorage.clear();
      localStorage.removeItem("user")
      return new InitialState()
    }

    case SIGN_OUT_ERROR: {
      const { payload } = action
      localStorage.clear();
      localStorage.removeItem("user")
      return new InitialState()
    }

    case CLEAR_PHASE: {
    return state
      .set('dataPhase', INIT)
    }

    default: {
      return state
    }
  }
}


/***********************************
 * Action Creators
 ***********/

export const loginUser = (credentials) => {
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const signUpUser = (credentials) => {
  return {
    type: SIGNUP_USER,
    payload: credentials
  }
}

export const getUser = (credentials) => {
  return {
    type: GET_USER,
    payload: credentials
  }
}

export const updateProfile = (data) => ({
  type: UPDATE_PROFILE,
  payload: { data }
})


export const handleSignOut = (data) => ({
  type: SIGN_OUT,
  payload: { data }
})

export const clearPhase = () => ({
  type: CLEAR_PHASE
})


/***********************************
 * Epics
 ***********************************/
const loginUserEpic = (action$) =>
  action$
  .ofType(LOGIN_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.loginUser(action.payload))
    .flatMap((payload) => ([{
      type: LOGIN_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: LOGIN_USER_ERROR,
      payload: { error }
    }))
  })

const signUpUserEpic = (action$) =>
  action$
  .ofType(SIGNUP_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.signupUser(action.payload))
    .flatMap((payload) => ([{
      type: SIGNUP_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: SIGNUP_USER_ERROR,
      payload: { error }
    }))
  })

const getUserEpic = (action$) =>
  action$
  .ofType(GET_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.getUser(action.payload))
    .flatMap((payload) => ([{
      type: GET_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: GET_USER_ERROR,
      payload: { error }
    }))    
  })

const updateProfileEpic = (action$) =>
  action$
  .ofType(UPDATE_PROFILE)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.updateProfile(action.payload.data))
    .flatMap((payload) => ([{
      type: UPDATE_PROFILE_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: UPDATE_PROFILE_ERROR,
      payload: { error }
    }))
  })

const signOutUserEpic = (action$) =>
  action$
  .ofType(SIGN_OUT)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.signOut(action.payload))
    .flatMap((payload) => ([{
      type: SIGN_OUT_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: SIGN_OUT_ERROR,
      payload: { error }
    }))
  })

export const userEpic = combineEpics(
  loginUserEpic,
  signUpUserEpic,
  getUserEpic,
  updateProfileEpic,
  signOutUserEpic,
)
