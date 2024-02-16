import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction(state, action) {
      console.log(action.payload.token)
      console.log(action)
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      window.localStorage.setItem("token" , action.payload.token)
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutAction(state) {
      window.localStorage.removeItem("token")
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;