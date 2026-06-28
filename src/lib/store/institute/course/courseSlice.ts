import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { Status } from "@/src/lib/types/types";
import { APIWITHTOKEN } from "@/src/lib/http";
import {
  IEditCoursePayload,
  IInitialInstituteCourseData,
  IInstituteCourse,
} from "./types.institute-courseSlice";

const initialState: IInitialInstituteCourseData = {
  courses: [],
  status: Status.LOADING,
};

const instituteCourseSlice = createSlice({
  name: "institute-courseSlice",
  initialState,
  reducers: {
    setCourses(
      state: IInitialInstituteCourseData,
      action: PayloadAction<IInstituteCourse[]>,
    ) {
      state.courses = action.payload;
    },
    setStatus(state: IInitialInstituteCourseData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteCourse(
      state: IInitialInstituteCourseData,
      action: PayloadAction<string>,
    ) {
      state.courses = state.courses.filter(
        (course) => course.courseId !== action.payload,
      );
    },
    setEditCourse(
      state: IInitialInstituteCourseData,
      action: PayloadAction<IEditCoursePayload>,
    ) {
      const { id, data } = action.payload;
      state.courses = state.courses.map((course) =>
        course.courseId === id ? { ...course, ...data } : course,
      );
    },
  },
});

export const { setCourses, setStatus, setDeleteCourse, setEditCourse } =
  instituteCourseSlice.actions;
export default instituteCourseSlice.reducer;

const multipartHeaders = { "Content-Type": "multipart/form-data" };

export function createInstituteCourse(data: FormData) {
  return async function createInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post(
        "/api/institute/course",
        data,
        { headers: multipartHeaders },
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchInstituteCourse());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute course:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchInstituteCourse() {
  return async function fetchInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await APIWITHTOKEN.get("/api/institute/course");
      if (response.status === 200) {
        dispatch(setCourses(response.data.data ?? []));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute courses:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteInstituteCourse(id: string) {
  return async function deleteInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(
        `/api/institute/course/${id}`,
      );
      if (response.status === 200) {
        dispatch(setDeleteCourse(id));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error deleting institute course:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function editInstituteCourse(id: string, data: FormData) {
  return async function editInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.put(
        `/api/institute/course/${id}`,
        data,
        { headers: multipartHeaders },
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchInstituteCourse());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error editing institute course:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
