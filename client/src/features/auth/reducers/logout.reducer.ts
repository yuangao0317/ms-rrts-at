import { createSlice, Slice } from '@reduxjs/toolkit';
import { IReduxLogout } from 'src/features/auth/interfaces/auth.interface';
import { initialLogoutValue } from 'src/shared/utils/init-state.constant';

const logoutSlice: Slice = createSlice({
  name: 'logout',
  initialState: initialLogoutValue,
  reducers: {
    updateLogout: (state: boolean, action: IReduxLogout): boolean => {
      state = action.payload;
      return state;
    },
    logout: (state: boolean): boolean => {
      return state;
    }
  }
});

export const { updateLogout, logout } = logoutSlice.actions;
export default logoutSlice.reducer;
