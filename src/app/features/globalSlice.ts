import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface globalState {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}

const initialState: globalState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});

export const { onOpenCartDrawerAction, onCloseCartDrawerAction } =
  globalSlice.actions;
export const selectGlobal = (state: RootState) => state.global;
export default globalSlice.reducer;
