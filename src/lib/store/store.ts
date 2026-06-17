import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./studentSlice";

const store = configureStore({
  reducer: {
    studentSlice,
  },
});

export default store;

//type of dispatch which is useful

export type AppDispatch = typeof store.dispatch;
export type RootState = typeof store.getState;
