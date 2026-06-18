import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { Status } from "@/src/lib/types/types";
import API from "@/src/lib/http";

const instituteCourseSlice = createSlice({
  name: "institute-courseSlice",
  initialState: {
    courses: [],
    status: "loading",
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setDelteCourse(state, action: PayloadAction<string>) {
      // state.courses = state.courses.filter(
      //   (course) => course.courseId !== action.payload,
      // );

      const index = state.courses.findIndex(
        (course) => course.courseId === action.payload,
      );
      if (index !== -1) {
        state.courses.splice(index, 1);
      }
    },
    setEditCourse(state, action: PayloadAction<any>) {
      const courseId = action.payload.id;
      const data = action.payload.data;
      const index = state.courses.findIndex(
        (course) => course.courseId === courseId,
      );
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...data };
      }
    },
  },
});

export const { setCourses, setStatus, setDelteCourse, setEditCourse } =
  instituteCourseSlice.actions;
export default instituteCourseSlice.reducer;

export function createInstituteCourse(data: any) {
  return async function createInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/api/institute/courses", data);
      if (response.status == 201) {
        dispatch(setStatus(Status.SUCCESS));
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
      const response = await API.get("/api/institute/courses");
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCourses(response.data.data));
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
      const response = await API.delete(`/api/institute/courses/${id}`);
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDelteCourse(id));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute courses:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function editInstituteCourse(id: string, data: any) {
  return async function editInstituteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.put(`/api/institute/courses/${id}`, data);
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setEditCourse({ id, data }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error editing institute course:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
