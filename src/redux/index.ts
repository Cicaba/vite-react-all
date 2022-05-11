import common from "@/redux/reducer/common"
import router from "@/redux/reducer/router"
import local from "@/redux/reducer/local"
import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//redux数据持久化
let config = {
  key: 'yds',
  storage,
  // blacklist: [], //黑名单
  whitelist: ['local'] //白名单
};
let reducer = combineReducers({ common, router, local })
let persistedReducer = persistReducer(config, reducer);
let store = createStore(persistedReducer)
export const persistor = persistStore(store)
export default store