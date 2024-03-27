import { createStore } from 'redux'
import * as actions from '../actions/actions'


export const initialState = {
    members: [],
}

export function appReducer(state, action) {
    switch (action.type) {
        case actions.SET_MEMBERS: {
            const newState = { ...state }
            newState.members = action.payload.members
            return newState
        }

        default:
            return state
    }
}
export const store = createStore(appReducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
