import {
  GET_ASSETS,
  ADD_ASSET,
  UPDATE_ASSET,
  DELETE_ASSET
} from '../actions/assetActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'
import { GET_USER_CREATIONS } from '../actions/userActions'


export default function assetsReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
      return action.content.assets
    
    case GET_ASSETS:
      return action.assets
    case ADD_ASSET:
      newState[action.asset.id] = action.asset
      return newState
    case UPDATE_ASSET:
      newState[action.asset.id] = action.asset
      return newState
    case DELETE_ASSET:
      delete newState[action.asset.id]
      return newState
      
    case DELETE_CHRONICLE:
      return Object.values(state).filter(asset => !action.chronicle.asset_ids.includes(asset.id))
      
      
    default:
      return state
  }
}