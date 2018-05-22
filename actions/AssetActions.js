import * as types from '../constants/ActionTypes'
import firebase, { db } from '../config/firebase'
import { Asset } from '../constants/Records'

export const createAsset = () => (dispatch, getState) => {
  const { user } = getState()
  db.ref(`users/${user.uid}/assets`).push({
    displayName: 'New Asset',
    housePrice: null,
    rentalPrice: null,
    utilities: null,
    maintenance: null,
    mortgageRate: null,
    downPayment: null,
  })
}

export const updateAsset = (key, value) => (dispatch, getState) => {
  const { user } = getState()
  const { uid, selectedAsset } = user
  const payload = { [key]: value }

  db.ref(`users/${uid}/assets/${selectedAsset}`).update(payload)

  dispatch({
    type: types.UPDATE_ASSET,
    payload,
  })
}

export const deleteAsset = () => ({})

export const selectAsset = key => (dispatch, getState) => {
  const { user } = getState()
  const { uid } = user

  db.ref(`/users/${uid}`).update({ selectedAsset: key })

  dispatch({
    type: types.SELECT_ASSET,
    payload: key,
  })
}
