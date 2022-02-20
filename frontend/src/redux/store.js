import { createStore, combineReducers, applyMiddleware } from 'redux';
import headerReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk'; 


const rootReducer = combineReducers({
  headers: headerReducer,
});
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authState']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistedStore = persistStore(store);



