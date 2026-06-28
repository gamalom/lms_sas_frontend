import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEditTeacherPayload,
  IInitialInstituteTeacherData,
  IInstituteTeacher,
} from "./types.institute-teacherSlice";
import { Status } from "@/src/lib/types/types";
import { AppDispatch } from "../../store";
import { APIWITHTOKEN } from "@/src/lib/http";

const initialState: IInitialInstituteTeacherData = {
  teachers: [],
  status: Status.LOADING,
};

const instituteTeacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeachers(
      state: IInitialInstituteTeacherData,
      action: PayloadAction<IInstituteTeacher[]>,
    ) {
      state.teachers = action.payload;
    },
    setStatus(
      state: IInitialInstituteTeacherData,
      action: PayloadAction<Status>,
    ) {
      state.status = action.payload;
    },
    setDeleteTeacher(
      state: IInitialInstituteTeacherData,
      action: PayloadAction<string>,
    ) {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload,
      );
    },
    setEditTeacher(
      state: IInitialInstituteTeacherData,
      action: PayloadAction<IEditTeacherPayload>,
    ) {
      const { id, data } = action.payload;
      state.teachers = state.teachers.map((teacher) =>
        teacher.id === id ? { ...teacher, ...data } : teacher,
      );
    },
  },
});

export const { setTeachers, setStatus, setDeleteTeacher, setEditTeacher } =
  instituteTeacherSlice.actions;
export default instituteTeacherSlice.reducer;

const multipartHeaders = { "Content-Type": "multipart/form-data" };

export function createInstituteTeacher(data: FormData) {
  return async function createInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post(
        "/api/institute/teacher",
        data,
        { headers: multipartHeaders },
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchInstituteTeacher());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute teacher:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchInstituteTeacher() {
  return async function fetchInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.get("/api/institute/teacher");
      if (response.status === 200) {
        dispatch(setTeachers(response.data.data ?? []));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute teachers:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteInstituteTeacherById(teacherId: string) {
  return async function deleteInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(
        `/api/institute/teacher/${teacherId}`,
      );
      if (response.status === 200) {
        dispatch(setDeleteTeacher(teacherId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting institute teacher:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function editInstituteTeacher(teacherId: string, data: FormData) {
  return async function editInstituteTeacherThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.put(
        `/api/institute/teacher/${teacherId}`,
        data,
        { headers: multipartHeaders },
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchInstituteTeacher());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error editing institute teacher:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
