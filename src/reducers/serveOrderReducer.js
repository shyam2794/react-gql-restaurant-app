import {SERVED_ORDER_ITEM , DELETE_SERVED_ORDER_ITEM} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case SERVED_ORDER_ITEM:
    return action.payload
    case DELETE_SERVED_ORDER_ITEM:
    return action.payload
    default:
      return state
  }
}
