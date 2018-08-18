import axios from "axios";

export const USERTABLE_DATA = "Table type entered in user table";
export const GET_USER = "get user";
export const MENU_LIST = "table data";
export const SERVED_ORDER_ITEM = "served order item";
export const DELETE_SERVED_ORDER_ITEM = "delete served order item";
export const POST_HISTORY_SUCCESS = "POST_HISTORY_SUCCESS";
export const POST_HISTORY_LOADING = "POST_HISTORY_LOADING";
export const POST_HISTORY_FAILURE = "POST_HISTORY_FAILURE";
export const POST_HISTORY_MESSAGE_TOGGLE = "POST_HISTORY_MESSAGE_TOGGLE";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS";
export const GET_HISTORY_LOADING = "GET_HISTORY_LOADING";
export const GET_HISTORY_FAILURE = "GET_HISTORY_FAILURE";
export const MENU_LIST_DB = "get menu from DB";
export const DELETE_MENU_ITEM = "delete menu item";
export const CLEAR_MENU_ITEM = "CLEAR_MENU_ITEM";
export const DELETE_MENU_ITEM_DB = "delete menu item from DB";
export const TABLE_DETAIL = "filter data";
export const WEEKLY_ORDERS_SUCCESS = "WEEKLY_ORDERS_SUCCESS";
export const WEEKLY_ORDERS_LOADING = "WEEKLY_ORDERS_LOADING";
export const WEEKLY_ORDERS_FAILURE = "WEEKLY_ORDERS_FAILURE";
export const TABLE_DATA = "Table types entered in Table detail";
export const TABLE_ORDER_LIST = "table bill from socket";
export const TABLE_ADDED_BILL = "Added bill from socket";

const URL = `http://farmbazaar.co.in:8072`;
//const URL = `http://localhost:4000`;

export const signin = (values, callback) => dispatch => {
  axios
    .post(`${URL}/checkUser`, {
      email: values.username,
      password: values.password
    })
    .then(response => {
      localStorage.setItem("id", response.data.result[0].id);
      callback(response.data.result[0]);
      return {};
    })
    .catch(error => console.log(error));
};

export const menulist = menu => ({
  type: MENU_LIST,
  payload: menu
});

export const deleteMenuItem = name => ({
  type: DELETE_MENU_ITEM,
  payload: name
});

export const clearMenuItem = () => ({
  type: CLEAR_MENU_ITEM,
  payload: []
});

export const removeServedMenuItem = order => {
  let updatedOrder = {};
  if (order.served_count !== order.count) {
    updatedOrder = {
      id: order.id,
      served_count: order.served_count + 1,
      served: order.served,
      count_to_be_served: order.count_to_be_served - 1
    };
  } else {
    updatedOrder = {
      id: order.id,
      served_count: order.served_count,
      served: 1,
      count_to_be_served: order.count_to_be_served
    };
  }
  return dispatch => {
    axios
      .patch(`${URL}/upDateOrder`, updatedOrder)
      .then(response => {
        //console.log("response from server", response.data[1]);
        dispatch({
          type: DELETE_SERVED_ORDER_ITEM,
          payload: response.data[1].filter(value => value.served !== 1)
        });
      })
      .catch(err => console.log(err));
  };
};

export const getOrdersForServe = () => {
  let id = Number(localStorage.getItem("id"));
  return dispatch => {
    axios
      .get(`${URL}/getOrders/${id}`)
      .then(response =>
        dispatch({
          type: SERVED_ORDER_ITEM,
          payload: response.data
        })
      )
      .catch(err => console.log(err));
  };
};

export const postResDetail = (id, details) => {
  let newDetails = [...details];
  let detailToPost = {
    id: Number(localStorage.getItem("id"))
  };
  for (let i in newDetails) {
    if (newDetails[i].tabletype === "Kudil")
      detailToPost.Kudil = Number(newDetails[i].tablecount);
    else detailToPost.partyhall = Number(newDetails[i].tablecount);
  }
  console.log(detailToPost);
};

export const postTableDetails = tabledetail => dispatch => {
  // console.log(tabledetail);
  axios
    .post(`${URL}/tableDetails`, tabledetail)
    .then(response => console.log(response))
    .catch(err => console.log(err));
};

export const getTableDetails = () => dispatch => {
  axios
    .get(`${URL}/getTableDetails`)
    .then(response =>
      dispatch({
        type: TABLE_DATA,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const getWeeklyOrders = () => dispatch => {
  axios
    .get(`${URL}/getWeeklyOrders`)
    .then(response => {
      dispatch({
        type: WEEKLY_ORDERS_LOADING,
        payload: {
          loading: true
        }
      });
      dispatch({
        type: WEEKLY_ORDERS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err =>
      dispatch({
        type: WEEKLY_ORDERS_FAILURE,
        payload: {
          error_message: err
        }
      })
    );
};

export const getHistoryData = () => {
  const id = localStorage.getItem("id");
  return dispatch => {
    axios
      .get(`${URL}/getHistory/${id}`)
      .then(response => {
        dispatch({
          type: GET_HISTORY_LOADING,
          payload: {
            loading: true
          }
        });
        dispatch({
          type: GET_HISTORY_SUCCESS,
          payload: response.data
        });
      })
      .catch(err =>
        dispatch({
          type: GET_HISTORY_FAILURE,
          payload: {
            error_message: err
          }
        })
      );
  };
};

export const getMenuFromDB = () => {
  let id = Number(localStorage.getItem("id"));
  return dispatch => {
    axios
      .get(`${URL}/getMenu/${id}`)
      .then(response =>
        dispatch({
          type: MENU_LIST_DB,
          payload: response.data
        })
      )
      .catch(err => console.log(err));
  };
};

export const deleteMenuFromDB = id => dispatch => {
  axios
    .delete(`${URL}/deleteMenu/${id}`)
    .then(response =>
      dispatch({
        type: DELETE_MENU_ITEM_DB,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const toggleError = () => ({
  type: POST_HISTORY_MESSAGE_TOGGLE,
  payload: {
    error_toggle: false
  }
});

export const postHistory = bill => {
  // console.log("inside post history ");
  const { date } = bill;
  return function(dispatch) {
    axios
      .get(`${URL}/checkHistory/${date}`)
      .then(response => {
        // console.log(response);
        if (response.data.length === 0) {
          axios
            .post(`${URL}/postHistory`, bill)
            .then(response => {
              dispatch({
                type: POST_HISTORY_LOADING,
                payload: {
                  loading: true
                }
              });
              dispatch({
                type: POST_HISTORY_SUCCESS,
                payload: response.data[0]
              });
            })
            .catch(err =>
              dispatch({
                type: POST_HISTORY_FAILURE,
                payload: {
                  error_message: err
                }
              })
            );
        } else {
          let updatebill = {
            ...bill,
            price: response.data[0].price + bill.price,
            id: response.data[0].id
          };
          axios
            .post(`${URL}/updateHistory`, updatebill)
            .then(response => {
              dispatch({
                type: POST_HISTORY_LOADING,
                payload: {
                  loading: true
                }
              });
              dispatch({
                type: POST_HISTORY_SUCCESS,
                payload: response.data[0]
              });
            })
            .catch(err =>
              dispatch({
                type: POST_HISTORY_FAILURE,
                payload: {
                  error_message: err
                }
              })
            );
        }
      })
      .catch(err =>
        dispatch({
          type: POST_HISTORY_FAILURE,
          payload: {
            error_message: err
          }
        })
      );
  };
};

export const getTableOrders = () => {
  let id = Number(localStorage.getItem("id"));
  return dispatch => {
    axios
      .get(`${URL}/getOrders/${id}`)
      .then(response => {
        dispatch({
          type: TABLE_ORDER_LIST,
          payload: response.data
        });
        dispatch({
          type: SERVED_ORDER_ITEM,
          payload: response.data.filter(value => value.served !== 1)
        });
      })
      .catch(err => console.log(err));
  };
};
