import {TABLE_ADDED_BILL} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case TABLE_ADDED_BILL:
    //console.log('in added bill reducer',action.payload);
    return action.payload
    default:
      return state
  }
}
