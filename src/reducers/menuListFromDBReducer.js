import {
  MENU_LIST_DB_LOADING,
  MENU_LIST_DB_SUCCESS,
  MENU_LIST_DB_FAILURE,
  DELETE_MENU_ITEM_DB
} from "../actions";

let initialState = {
  menuFromDB: {
    menuList: [],
    error: false,
    loading: true
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_LIST_DB_LOADING:
      return {
        ...state,
        menuFromDB: {
          menuList: [],
          loading: action.payload.loading,
          error: false
        }
      };
    case MENU_LIST_DB_SUCCESS:
      return {
        ...state,
        menuFromDB: { menuList: action.payload, loading: false, error: false }
      };
    case MENU_LIST_DB_FAILURE:
      return {
        ...state,
        menuFromDB: {
          menuList: [],
          loading: false,
          error: action.payload.error_message
        }
      };
    case DELETE_MENU_ITEM_DB:
      return {
        ...state,
        menuFromDB: {
          menuList: action.payload[1],
          loading: false,
          error: false
        }
      };
    default:
      return state;
  }
}
