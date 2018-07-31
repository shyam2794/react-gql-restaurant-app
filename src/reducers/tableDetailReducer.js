import {TABLE_DETAIL} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case TABLE_DETAIL:
   // console.log("payload data" , action.payload);
    return action.payload
    default:
      return state
  }
}
