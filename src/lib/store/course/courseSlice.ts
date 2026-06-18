import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse, IInitialState } from "./types.courseSlice";
import { Status } from "../../types/types";
const initialState: IInitialState = {
  course: {
    courseName: "",
    courseDuration: "",
    coursePrice: 0,
    courseLevel: "",
    courseDescription: "",
    categoryId: "",
  },
  status: Status.LOADING,
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    setCourse(state: IInitialState, action: PayloadAction<ICourse>) {
      state.course = action.payload;
    },
    setState(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

const { setCourse, setState } = courseSlice.actions;
export default courseSlice.reducer;
