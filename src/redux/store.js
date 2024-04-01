import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { catalogReducer } from './reducer';

// const favConfig = {
//   key: 'fav',
//   version: 1,
//   storage,
//   whitelist: ['fav'],
// };

const catalogConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  catalog: persistReducer(catalogConfig, catalogReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
export { persistor, store };
