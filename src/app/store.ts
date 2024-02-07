import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productApiSlice, productsApiSlice } from "./services/productsSlice";
import loginSlice from "./features/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    //to make dynamic api calls, reducerPath=> name of the slice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // for ignoring the serializable error
      serializableCheck: false,
    }).concat([productsApiSlice.middleware, productApiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
