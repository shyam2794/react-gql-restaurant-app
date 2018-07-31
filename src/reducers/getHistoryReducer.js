import {GET_HISTORY} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case GET_HISTORY:
    return action.payload 
    default:
      return state
  }
}
