import { MENU_LIST, DELETE_MENU_ITEM, CLEAR_MENU_ITEM } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case MENU_LIST:
      // console.log('Menu entered in the DB' , action.payload)
      return [...state, action.payload];
    case DELETE_MENU_ITEM:
      return state.filter(value => value.name !== action.payload);
    case CLEAR_MENU_ITEM:
      return action.payload;
    default:
      return state;
  }
}
