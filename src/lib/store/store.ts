import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import instituteSlice from "./institute/instituteSlice";
import teacherSlice from "./teacher/teacherSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    institute: instituteSlice,
    teacher: teacherSlice,
  },
});

export default store;

//type of dispatch which is useful

export type AppDispatch = typeof store.dispatch;
export type RootState = typeof store.getState;
