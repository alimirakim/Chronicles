import {
    GET_ASSETS,
    ADD_ASSET,
    UPDATE_ASSET,
    DELETE_ASSET
} from '../actions/assetActions'

export default function assetsReducer(state = {}, action) {
    const newState = {...state }
    switch (action.type) {
        case GET_ASSETS:
            return action.assets
        case ADD_ASSET:
            return {...state, ...action.asset }
        case UPDATE_ASSET:
            newState[action.asset.id] = action.asset
            return newState
        case DELETE_ASSET:
            delete newState[action.asset.id]
            return newState
        default:
            return state
    }
}