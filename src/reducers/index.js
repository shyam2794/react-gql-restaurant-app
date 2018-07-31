import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import tabledata from "./tablelistreducer";
import postHistory from "./postHistoryReducer";
import menulist from "./menulistreducer";
import tableItem from "./tableDetailReducer";
import tableorder from "./tableOrderReducer";
import serveorder from "./serveOrderReducer";
import getHistory from "./getHistoryReducer";
import menusFromDB from "./menuListFromDBReducer";
import weeklyOrders from "./getWeeklyOrders";

export default combineReducers({
  form,
  tabledata,
  menusFromDB,
  menulist,
  getHistory,
  tableItem,
  tableorder,
  serveorder,
  weeklyOrders,
  postHistory
});
