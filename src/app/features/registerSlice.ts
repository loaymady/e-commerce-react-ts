import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import { RootState } from "../store";
import { IRegister } from "../../interfaces";
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

export const userRegister = createAsyncThunk(
  "login/userRegister",
  async (user: IRegister, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(
        `https://strapi-e-commerce-6029.onrender.com/api/auth/local/register`,
        // `http://localhost:1337/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

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

const registerSlice = createSlice({
  initialState,
  name: "register",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
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
        CookieService.set("username", action.payload.user.username, {
          path: "/",
          expires: date,
        });
        CookieService.set("isAdmin", action.payload.user.admin, {
          path: "/",
          expires: date,
        });
        toast({
          title: "Register Success",
          status: "success",
          isClosable: true,
        });
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      })
      .addCase(userRegister.rejected, (state, action) => {
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

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;
