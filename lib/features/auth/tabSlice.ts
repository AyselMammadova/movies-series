import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabValue = 'login' | 'register';

interface TabState {
  currentTab: TabValue;
}

const initialState: TabState = {
  currentTab: 'login',
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<TabValue>) => {
      state.currentTab = action.payload;
    },
    resetTab: (state) => {
      state.currentTab = 'login';
    }
  },
});

export const { setTab, resetTab } = tabSlice.actions;
export default tabSlice.reducer;