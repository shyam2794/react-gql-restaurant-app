import {
  GET_HISTORY_SUCCESS,
  GET_HISTORY_LOADING,
  GET_HISTORY_FAILURE
} from "../actions";

let initialState = {
  historyOrders: {
    orders: [],
    error: null,
    loading: true
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY_LOADING:
      return {
        ...state,
        historyOrders: {
          orders: [],
          loading: action.payload.loading,
          error: null
        }
      };
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        historyOrders: {
          orders: action.payload,
          loading: false,
          error: null
        }
      };
    case GET_HISTORY_FAILURE:
      return {
        ...state,
        historyOrders: {
          orders: [],
          loading: false,
          error: action.payload.error_message
        }
      };
    default:
      return state;
  }
}
