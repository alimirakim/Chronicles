import {
  GET_USER_CREATIONS,
  LOGOUT_USER,
} from '../actions/userActions'

import {
  ADD_CHRONICLE,
  DELETE_CHRONICLE,
} from '../actions/chronicleActions'
import {
  ADD_TALE,
  DELETE_TALE,
} from '../actions/taleActions'
import {
  ADD_THREAD,
  DELETE_THREAD,
} from '../actions/threadActions'
import {
  ADD_CHOICE,
  DELETE_CHOICE,
} from '../actions/choiceActions'
import {
  ADD_CHARACTER,
  DELETE_CHARACTER,
} from '../actions/characterActions'
import {
  ADD_PLACE,
  DELETE_PLACE,
} from '../actions/placeActions'
import {
  ADD_ASSET,
  DELETE_ASSET,
} from '../actions/assetActions'
import {
  ADD_CONDITION,
  DELETE_CONDITION,
} from '../actions/conditionActions'
import {
  ADD_METER,
  DELETE_METER,
} from '../actions/meterActions'
// import {
//   ADD_,
//   DELETE_,
// } from '../actions/Actions'



export default function userReducer(state = {}, action) {
  let newState = { ...state }
  let i;
  switch (action.type) {

    case GET_USER_CREATIONS:
      return action.content.user

    // chronicles
    case ADD_CHRONICLE:
      newState.chronicle_ids.push(action.chronicle.id)
      return newState
    case DELETE_CHRONICLE:
      i = newState.chronicle_ids.indexOf(action.chronicle.id)
      newState.chronicle_ids.splice(i, 1)
      return newState

    // tales
    case ADD_TALE:
      newState.tale_ids.push(action.tale.id)
      return newState
    case DELETE_TALE:
      i = newState.tale_ids.indexOf(action.tale.id)
      newState.tale_ids.splice(i, 1)
      return newState

    // threads
    case ADD_THREAD:
      newState.thread_ids.push(action.thread.id)
      return newState
    case DELETE_THREAD:
      i = newState.thread_ids.indexOf(action.thread.id)
      newState.thread_ids.splice(i, 1)
      return newState

    // choices
    case ADD_CHOICE:
      newState.choice_ids.push(action.choice.id)
      return newState
    case DELETE_CHOICE:
      i = newState.choice_ids.indexOf(action.choice.id)
      newState.choice_ids.splice(i, 1)
      return newState

    // characters
    case ADD_CHARACTER:
      newState.character_ids.push(action.character.id)
      return newState
    case DELETE_CHARACTER:
      i = newState.character_ids.indexOf(action.character.id)
      newState.character_ids.splice(i, 1)
      return newState

    // places
    case ADD_PLACE:
      newState.place_ids.push(action.place.id)
      return newState
    case DELETE_PLACE:
      i = newState.place_ids.indexOf(action.place.id)
      newState.place_ids.splice(i, 1)
      return newState

    // assets
    case ADD_ASSET:
      newState.asset_ids.push(action.asset.id)
      return newState
    case DELETE_ASSET:
      i = newState.asset_ids.indexOf(action.asset.id)
      newState.asset_ids.splice(i, 1)
      return newState

    case LOGOUT_USER:
      return {}

    // conditions
    case ADD_CONDITION:
      newState.condition_ids.push(action.condition.id)
      return newState
    case DELETE_CONDITION:
      i = newState.condition_ids.indexOf(action.condition.id)
      newState.condition_ids.splice(i, 1)
      return newState

    // meters
    case ADD_METER:
      newState.meter_ids.push(action.meter.id)
      return newState
    case DELETE_METER:
      i = newState.meter_ids.indexOf(action.meter.id)
      newState.meter_ids.splice(i, 1)
      return newState
      
    // // effects
    // case ADD_:
    //   newState._ids.push(action..id)
    //   return newState
    // case DELETE_:
    //   i = newState._ids.indexOf(action..id)
    //   newState._ids.splice(i, 1)
    //   return newState

    // // locks
    // case ADD_:
    //   newState._ids.push(action..id)
    //   return newState
    // case DELETE_:
    //   i = newState._ids.indexOf(action..id)
    //   newState._ids.splice(i, 1)
    //   return newState

    // // pcs
    // case ADD_:
    //   newState._ids.push(action..id)
    //   return newState
    // case DELETE_:
    //   i = newState._ids.indexOf(action..id)
    //   newState._ids.splice(i, 1)
    //   return newState



    default:
      return state
  }
}