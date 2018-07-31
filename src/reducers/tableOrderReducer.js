import {TABLE_ORDER_LIST} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case TABLE_ORDER_LIST:
   // console.log('in reducer',action.payload);
    return action.payload 
    default:
      return state
  }
}
