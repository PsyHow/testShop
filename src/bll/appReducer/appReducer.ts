const initialState = {
  status: 'succeeded' as RequestStatusType,
  error: null as string | null,
};

export const appReducer = (
  state = initialState,
  action: AppActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'SET_APP_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'SET_APP_ERROR': {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: 'SET_APP_STATUS',
    status,
  } as const);

export const setAppError = (error: string | null) =>
  ({
    type: 'SET_APP_ERROR',
    error,
  } as const);

export type AppActionTypes =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>;

type InitialStateType = typeof initialState;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
