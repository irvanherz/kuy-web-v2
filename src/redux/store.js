import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from 'redux-logger';

const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production'
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducers, applyMiddleware(thunk, logger))
export const persistor = persistStore(store)