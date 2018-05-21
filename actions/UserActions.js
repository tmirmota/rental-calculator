import * as types from '../constants/ActionTypes'
import firebase, { db } from '../config/firebase'

const setUser = payload => ({
  type: types.SET_USER,
  payload,
})

export const fetchUser = uid => async dispatch => {
  db.ref(`users/${uid}`).on('value', snapshot => {
    dispatch(setUser({ uid, ...snapshot.val() }))
  })
}
