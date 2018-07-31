import {
  WEEKLY_ORDERS_SUCCESS,
  WEEKLY_ORDERS_LOADING,
  WEEKLY_ORDERS_FAILURE
} from "../actions";

let initialState = {
  weeklyOrders: {
    orders: [],
    error: null,
    loading: false,
    processing: true
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WEEKLY_ORDERS_LOADING:
      return {
        ...state,
        weeklyOrders: {
          orders: [],
          error: null,
          processing: false,
          loading: action.payload.loading
        }
      };
    case WEEKLY_ORDERS_SUCCESS:
      return {
        ...state,
        weeklyOrders: {
          orders: action.payload,
          error: null,
          loading: false,
          processing: false
        }
      };
    case WEEKLY_ORDERS_FAILURE:
      return {
        ...state,
        weeklyOrders: {
          orders: [],
          error: action.payload.error_message,
          loading: false,
          processing: false
        }
      };
    default:
      return state;
  }
}
