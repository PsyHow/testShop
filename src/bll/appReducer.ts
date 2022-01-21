import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable, RequestStatusType } from 'types';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'succeeded',
    error: null,
  } as InitialStateType,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: Nullable<string> }>) {
      state.error = action.payload.error;
    },
  },
});

export const { setAppStatus, setAppError } = slice.actions;

export const appReducer = slice.reducer;

type InitialStateType = {
  status: RequestStatusType;
  error: Nullable<string>;
};
