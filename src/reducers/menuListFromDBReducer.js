import {MENU_LIST_DB , DELETE_MENU_ITEM_DB} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case MENU_LIST_DB:
   // console.log('Menu from DB' , action.payload)
    return action.payload
    case DELETE_MENU_ITEM_DB:
   // console.log(action.payload[1]);
    return action.payload[1];
    default:
      return state
  }
}
