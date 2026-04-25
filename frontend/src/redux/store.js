import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    customer: customerSlice,
    user: userSlice
  },
  devTools: import.meta.env.MODE_ENV !== "production",
});



export default store; 