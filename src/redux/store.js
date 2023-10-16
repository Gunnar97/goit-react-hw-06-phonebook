import { configureStore } from '@reduxjs/toolkit';
import { phonebookReducers } from './phonebookReducers';

export const store = configureStore({
  reducer: {
    phonebook: phonebookReducers,
  },
});
