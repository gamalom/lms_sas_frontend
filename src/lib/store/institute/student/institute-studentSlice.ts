import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEditStudentPayload,
  IInitialInstituteStudentData,
  IInstituteStudent,
} from "./types.institute-studentSlice";
import { Status } from "@/src/lib/types/types";
import { AppDispatch } from "../../store";
import { APIWITHTOKEN } from "@/src/lib/http";

const initialState: IInitialInstituteStudentData = {
  students: [],
  status: Status.LOADING,
};

const instituteStudentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents(
      state: IInitialInstituteStudentData,
      action: PayloadAction<IInstituteStudent[]>,
    ) {
      state.students = action.payload;
    },
    setStatus(
      state: IInitialInstituteStudentData,
      action: PayloadAction<Status>,
    ) {
      state.status = action.payload;
    },
    setDeleteStudent(
      state: IInitialInstituteStudentData,
      action: PayloadAction<string>,
    ) {
      state.students = state.students.filter(
        (student) => student.id !== action.payload,
      );
    },
    setEditStudent(
      state: IInitialInstituteStudentData,
      action: PayloadAction<IEditStudentPayload>,
    ) {
      const { id, data } = action.payload;
      state.students = state.students.map((student) =>
        student.id === id ? { ...student, ...data } : student,
      );
    },
  },
});

export const { setStudents, setStatus, setDeleteStudent, setEditStudent } =
  instituteStudentSlice.actions;
export default instituteStudentSlice.reducer;

const multipartHeaders = { "Content-Type": "multipart/form-data" };

export function createInstituteStudent(data: FormData) {
  return async function createInstituteStudentThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post(
        "/api/institute/student",
        data,
        { headers: multipartHeaders },
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchInstituteStudents());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute student:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchInstituteStudents() {
  return async function fetchInstituteStudentsThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.get("/api/institute/student");
      if (response.status === 200) {
        dispatch(setStudents(response.data.data ?? []));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute students:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteInstituteStudentById(studentId: string) {
  return async function deleteInstituteStudentThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(
        `/api/institute/student/${studentId}`,
      );
      if (response.status === 200) {
        dispatch(setDeleteStudent(studentId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting institute student:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function editInstituteStudent(studentId: string, data: FormData) {
  return async function editInstituteStudentThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.put(
        `/api/institute/student/${studentId}`,
        data,
        { headers: multipartHeaders },
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchInstituteStudents());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error editing institute student:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
