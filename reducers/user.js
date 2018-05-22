import * as types from '../constants/ActionTypes'

const initialState = {
  displayName: 'Thomas Test',
  selectedAsset: null,
  assets: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return action.payload

    case types.UPDATE_ASSET:
      return {
        ...state,
        assets: {
          ...state.assets,
          [state.selectedAsset]: {
            ...state.assets[state.selectedAsset],
            ...action.payload,
          },
        },
      }

    case types.SELECT_ASSET:
      return {
        ...state,
        selectedAsset: action.payload,
      }

    default:
      return state
  }
}
