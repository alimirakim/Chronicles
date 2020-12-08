import {
  SET_SELECTIONS,
  ADD_SELECTION,
  UPDATE_SELECTION,
  UPDATE_SELECTIONS,
  WIPE_SELECTIONS,
  WIPE_ALL_SELECTIONS
} from '../actions/selectionActions'

const initialState = {
  chronicle: "",
  tale: "",
  thread: "",
  choice: "",
  // effect: "",
  // lock: "",
  // character: "",
  // place: "",
  // asset: "",
  // condition: "",
  // rank: "",
}

export default function selectionsReducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case SET_SELECTIONS:
      return action.selections
    case ADD_SELECTION:
      newState[action.selectionType] = action.selection
      return newState
    case UPDATE_SELECTION:
      newState[action.selectionType] = action.selection
      return newState
    case UPDATE_SELECTIONS:
      action.selections.forEach(update => newState[update.type] = update.selection)
      return newState
    case WIPE_SELECTIONS:
      action.selectionTypes.forEach(type => newState[type] = "")
      return newState
    case WIPE_ALL_SELECTIONS:
      return initialState
    default:
      return state
  }
}