import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import { RootState } from "../store";
import { IUser } from "../../interfaces";
import CookieService from "../../services/CookieService";

const { toast } = createStandaloneToast();

interface LoginState {
  data: null;
  loading: boolean;
  error: unknown;
}

const initialState: LoginState = {
  data: null,
  loading: false,
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: IUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(`http://localhost:1337/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData?.error?.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        const date = new Date();
        const IN_DAYS = 3;
        const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        date.setTime(date.getTime() + EXPIRES_IN_DAYS);
        CookieService.set("jwt", action.payload.jwt, {
          path: "/",
          expires: date,
        });
        toast({
          title: "Logged in successfully",
          status: "success",
          isClosable: true,
        });
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        toast({
          title: `${action.payload}`,
          description: "Make sure you have the correct Email or Password",
          status: "error",
          isClosable: true,
        });
      });
  },
});

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
