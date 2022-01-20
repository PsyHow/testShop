import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'succeeded',
    error: null,
  } as InitialStateType,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.error;
    },
  },
});

export const { setAppStatus, setAppError } = slice.actions;

export const appReducer = slice.reducer;

type InitialStateType = {
  status: RequestStatusType;
  error: null | string;
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
