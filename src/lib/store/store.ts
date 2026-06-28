import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./institute/category/categorySlice";
import instituteSlice from "./institute/instituteSlice";
import instituteCourseSlice from "./institute/course/courseSlice";
import instituteTeacherSlice from "./institute/teacher/institute-teacherSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    institute: instituteSlice,
    course: instituteCourseSlice,
    teacher: instituteTeacherSlice,
  },
});

export default store;

//type of dispatch which is useful

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
