// eslint-disable-next-line @typescript-eslint/no-unused-vars,prettier/prettier
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// eslint-disable-next-line prettier/prettier
import {
  AuthState,
} from './typedefs';

const initialState: AuthState = {
  isFetching: false,
  isAuthenticated: false,
  allowCountdown: false,
  isInitialised: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    isAuthenticatedTrue(state) {
      state.isAuthenticated = true;
    },
    isAuthenticatedFalse(state) {
      state.isAuthenticated = false;
    },
    allowCountdown(state, action: PayloadAction<boolean>) {
      state.allowCountdown = action.payload;
    },
    clearData(state) {
      state.isAuthenticated = false;
      state.allowCountdown = false;
      localStorage.clear();
      sessionStorage.clear();
    },
    initialize(state) {
      state.isInitialised = true;
    },
    // INJECT
  },
});

export default authSlice;
