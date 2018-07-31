import {TABLE_DATA} from '../actions';

export default function (state=[], action)
{
  switch(action.type)
  {
    case TABLE_DATA:
   // console.log(action.payload)
    return action.payload
    default:
      return state
  }
}
