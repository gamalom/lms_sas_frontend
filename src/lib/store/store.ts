import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./institute/category/categorySlice";
import instituteSlice from "./institute/instituteSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    institute: instituteSlice,
  },
});

export default store;

//type of dispatch which is useful

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
