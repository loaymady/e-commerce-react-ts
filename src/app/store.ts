import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApiSlice } from "./services/productsSlice";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import networkSlice from "./features/networkSlice";
import registerSlice from "./features/registerSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};

// for local storage
const persistedCart = persistReducer(persistCartConfig, cartSlice);

const store = configureStore({
  reducer: {
    cart: persistedCart,
    global: globalSlice,
    login: loginSlice,
    register: registerSlice,
    network: networkSlice,
    //to make dynamic api calls, reducerPath=> name of the slice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // for ignoring the serializable error
      serializableCheck: false,
    }).concat([productsApiSlice.middleware]),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
