import {push} from 'react-router-redux';
import store from "../store/store"
const axios = require('axios');
export const userListRequestStart = () => {
  return {
    type: "GET_LIST_START"
  }
}
export const userListGetSuccess = (res) => {
  return {
    type: "GET_LIST_SUCCESS",
    data: res
  }
}
export const userListGetFail = (err) => {
  return {
    type: "GET_LIST_FAIL",
    err: err
  }
}
export const sort = (field, AorD) => {
  return {
    type: "SORT",
    WhichAndHow:{field: field, AorD: AorD}
  }
}
export const search = (text) => {
  return {
    type: "SEARCH",
    word: text
  }
}
export const clear = () => {
  return {
    type: "CLEAR"
  }
}

//sigle user
export const userRequestStart = () => {
  return {
    type: "USER_START"
  }
}
export const userGetSuccess = (res) => {
  return {
    type: "GET_USER_SUCCESS",
    data: res
  }
}
export const userRequestFail = (err) => {
  return {
    type: "USER_FAIL",
    err: err
  }
}

export const getList = () => {
  return (dispatch, getState) => {
    dispatch(userListRequestStart());
    axios
      .get('http://localhost:8888/api/users')
      .then(res => {
        dispatch(userListGetSuccess(res.data))
      })
      .catch(error => {
        dispatch(userListGetFail(error));
      });
  }
}
export const getOneUser = (id) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    axios
      .get(`http://localhost:8888/api/users/${id}`)
      .then(res => {
        dispatch(userGetSuccess(res.data));
      })
      .then(res => {
        store.dispatch(push(`/edit/${id}`))
      })
      .catch(error => {
        dispatch(userRequestFail(error));
      });
  }
}
export const deleteOneUser = (id) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    axios
      .delete(`http://localhost:8888/api/users/${id}`)
      .then(res => {
        dispatch(getList());
      })
      .catch(error => {
        dispatch(userRequestFail(error));
      });
  }
}
export const createOneUser = (user,history) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    axios
      .post(`http://localhost:8888/api/users`, user)
      .then(() => {
        // store.dispatch(push("/home"));
        history.push("/home");
        console.log("goback");
      })
      .catch(error => {
        dispatch(userRequestFail(error));
      });
  }
}
export const updateOneUser = (id,user) => {
  return (dispatch, getState) => {
    dispatch(userRequestStart());
    axios
      .put(`http://localhost:8888/api/users/${id}`, user)
      .then(() => {
        store.dispatch(push("/home"));
      })
      .catch(error => {
        dispatch(userRequestFail(error));
      });
  }
}