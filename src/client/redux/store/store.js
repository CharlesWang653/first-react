import userListReducer from "../reducer/userList";
import userReducer from "../reducer/user";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";
import {combineReducers} from "redux";
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const reducers = (history) => combineReducers({
  router: connectRouter(history),
  userListReducer, userReducer
})
export const history = createBrowserHistory(); 
 
const store = createStore(
  reducers(history), // 使用connectRouter包裹 root reducer 并且提供我们创建的history对象，获得新的 root reducer
  {},
  applyMiddleware(thunk, routerMiddleware(history)) // 使用routerMiddleware(history)实现使用 dispatch history actions，这样就可以使用push('/path/to/somewhere')去改变路由（这里的 push 是来自 connected-react-router 的）
 )
export default store;