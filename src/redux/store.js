import { configureStore } from '@reduxjs/toolkit';
import { phonebookReducers } from './phonebookReducers';
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

const phonebookPersistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const store = configureStore({
  reducer: {
    phonebook: persistReducer(phonebookPersistConfig, phonebookReducers),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
