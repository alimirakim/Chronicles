import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import charactersReducer from './charactersReducer'
import assetsReducer from './assetsReducer'
import choicesReducer from './choicesReducer'
import chroniclesReducer from './chroniclesReducer'
import placesReducer from './placesReducer'
import selectionsReducer from './selectionsReducer'
import talesReducer from './talesReducer'
import threadsReducer from './threadsReducer'
import errorsReducer from './errorsReducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    assets: assetsReducer,
    choices: choicesReducer,
    characters: charactersReducer,
    chronicles: chroniclesReducer,
    errors: errorsReducer,
    places: placesReducer,
    selections: selectionsReducer,
    tales: talesReducer,
    threads: threadsReducer,
})

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        // composeEnhancers(),
        composeWithDevTools(applyMiddleware(logger))
    )
}