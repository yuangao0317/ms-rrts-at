import { createSlice, Slice } from '@reduxjs/toolkit';
import { IReduxHeader } from 'src/shared/headers/interfaces/header.interface';
import { initialHeaderValue } from 'src/shared/utils/init-state.constant';

const headerSlice: Slice = createSlice({
  name: 'header',
  initialState: initialHeaderValue,
  reducers: {
    updateHeader: (state: string, action: IReduxHeader): string => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateHeader } = headerSlice.actions;
export default headerSlice.reducer;
