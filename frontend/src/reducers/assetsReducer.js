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
      Object.values(action.content.assets).forEach(asset => newState[asset.id] = asset)
      return newState
    
    // TODO NOTE May need to update all 'GET_BLAH's to 'add' to store rather than replace all
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