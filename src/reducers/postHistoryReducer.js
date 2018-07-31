import {
  POST_HISTORY_LOADING,
  POST_HISTORY_SUCCESS,
  POST_HISTORY_FAILURE,
  POST_HISTORY_MESSAGE_TOGGLE
} from "../actions";

let initialState = {
  history: { historyOrder: [], error: null, loading: false }
};

export default function(state = initialState, action) {
  let error;
  switch (action.type) {
    case POST_HISTORY_LOADING:
      return {
        ...state,
        history: {
          historyOrder: [],
          error: null,
          loading: action.payload.loading
        }
      };
    case POST_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          historyOrder: action.payload,
          error: null,
          loading: false
        }
      };
    case POST_HISTORY_FAILURE:
      error = action.payload.error_message || {
        message: action.payload.message
      };
      return {
        ...state,
        history: { historyOrder: [], error: error, loading: false }
      };
    case POST_HISTORY_MESSAGE_TOGGLE:
      return {
        ...state,
        history: {
          historyOrder: [],
          error: action.payload.error_toggle,
          loading: false
        }
      };
    default:
      return state;
  }
}
