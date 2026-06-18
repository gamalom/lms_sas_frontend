import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialTeacherData, ITeacher } from "./types.teacherSlice";
import { Status } from "../../types/types";

const initialState: IInitialTeacherData = {
  teacher: {
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
    teacherExpertise: "",
    joiningDate: "",
    salary: 0,
    courseId: "",
  },
  status: Status.LOADING,
};

const instituteslice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacher(state: IInitialTeacherData, action: PayloadAction<ITeacher>) {
      state.teacher = action.payload;
    },
    setState(state: IInitialTeacherData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

const { setTeacher, setState } = instituteslice.actions;
export default instituteslice.reducer;
