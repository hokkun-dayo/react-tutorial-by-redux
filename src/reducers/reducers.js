import { combineReducers } from 'redux'
import * as actionType from "../actions/actions"

function commentReducer(state = {
  isLoading: false,
  isSubmitting: false,
  data: []
}, action) {
  switch(action.type) {
    case actionType.LOAD_COMMENT_START:
      return Object.assign({}, state, {
        isLoading: true
      })
    case actionType.LOAD_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.comments
      })
    case actionType.SUBMIT_COMMENT_START:
      return Object.assign({}, state, {
        isSubmitting: true
      })
    case actionType.SUBMIT_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        data: state.data.concat(action.comment)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
                                      commentReducer
                                    })

export default rootReducer
