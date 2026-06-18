import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IInitialInstituteTeacherData,
  IInstituteTeacherWithCourse,
  TeacherExpertise,
} from "./types.institute-teacherSlice";
import { Status } from "@/src/lib/types/types";
import { AppDispatch } from "../../store";
import API from "@/src/lib/http";

const initialState: IInitialInstituteTeacherData = {
  teacher: {
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
    teacherExpertise: TeacherExpertise.BIGNNIER,
    joiningDate: "",
    salary: 0,
    courseId: "",
    teacherPhoto: "",
    course: {
      courseName: "",
      coursePrice: "",
    },
  },
  status: Status.LOADING,
};

const instituteslice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacher(
      state: IInitialInstituteTeacherData,
      action: PayloadAction<IInstituteTeacherWithCourse>,
    ) {
      state.teacher = action.payload;
    },
    setState(
      state: IInitialInstituteTeacherData,
      action: PayloadAction<Status>,
    ) {
      state.status = action.payload;
    },
  },
});

const { setTeacher, setState } = instituteslice.actions;
export default instituteslice.reducer;

export const createInstituteTeacher = (data: IInstituteTeacherWithCourse) => {
  return async function createInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("institute/teacher", data);
      if (response.status === 201) {
        // assume created teacher is returned in response.data

        dispatch(setState(Status.SUCCESS));
      } else {
        dispatch(setState(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute teacher:", error);
      dispatch(setState(Status.ERROR));
    }
  };
};

export const fetchInstituteTeacher = () => {
  return async function fetchInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("institute/teacher");
      if (response.status === 201) {
        // assume created teacher is returned in response.data
        dispatch(setTeacher(response.data.data));
        dispatch(setState(Status.SUCCESS));
      } else {
        dispatch(setState(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute teacher:", error);
      dispatch(setState(Status.ERROR));
    }
  };
};

export const deleteInstituteTeacherById = (data: { teacherId: string }) => {
  return async function deleteInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      const response = await API.delete(`institute/teacher/${data.teacherId}`);
      if (response.status === 200) {
        dispatch(setState(Status.SUCCESS));
        //popout teacher of that id
      } else {
        dispatch(setState(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute teacher:", error);
      dispatch(setState(Status.ERROR));
    }
  };
};
