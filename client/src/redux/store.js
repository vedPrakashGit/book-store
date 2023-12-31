import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    cart: cartReducer,
  },
});

export default store;
