import {legacy_createStore as createStore} from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from './reducer';


const persitConfig = {
    key:"root",
    storage:storage,
   // 如果不想将部分state持久化，可以将其放入黑名单(blacklist)中.黑名单是设置
  // blacklist: ['address', 'token', 'userInfo']
}
const persist_reducers = persistReducer(persitConfig, reducer);
const store = createStore(persist_reducers); // 创建仓库放入管理员
const persistor =  persistStore(store);
export { store, persistor }