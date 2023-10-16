import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  number: '',
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { setName, setNumber } = contactFormSlice.actions;
export const contactFormReducers = contactFormSlice.reducer;
