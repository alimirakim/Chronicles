import {
  GET_CHOICES,
  ADD_CHOICE,
  UPDATE_CHOICE,
  DELETE_CHOICE
} from '../actions/choiceActions'


export default function choicesReducer(state = {}, action) {
  const newState = {...state }
  switch (action.type) {
      case GET_CHOICES:
          return action.choices
      case ADD_CHOICE:
          return {...state, ...action.choice }
      case UPDATE_CHOICE:
          newState[action.choice.id] = action.choice
          return newState
      case DELETE_CHOICE:
          delete newState[action.choice.id]
          return newState
      default:
          return state
  }
}