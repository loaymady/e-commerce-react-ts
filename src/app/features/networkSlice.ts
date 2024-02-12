import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface networkState {
  isOnline: boolean;
}

const initialState: networkState = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { networkMode } = networkSlice.actions;
export const selectNetwork = (state: RootState) => state.network;
export default networkSlice.reducer;
