import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearAuthStorage,
  IInitialData,
  IRegisterData,
  IUserData,
  persistAuthUser,
  readAuthFromStorage,
} from "./types.authSlice";
import { Status } from "../../types/types";
import { API, APIWITHTOKEN } from "../../http";
import { AppDispatch, RootState } from "../store";
import { ILoginData } from "@/src/app/auth/login/types.login";

const initialState: IInitialData = {
  user: {
    username: "",
    token: "",
    role: undefined,
    instituteId: null,
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state: IInitialData, action: PayloadAction<IUserData>) {
      state.user = action.payload;
    },
    setStatus(state: IInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

const { setUser, setStatus } = authSlice.actions;
export { setUser, setStatus };
export default authSlice.reducer;

export function hydrateAuthFromStorage() {
  return async function hydrateAuthFromStorageThunk(dispatch: AppDispatch) {
    if (typeof window === "undefined") return;

    const storedUser = readAuthFromStorage();

    if (!storedUser) {
      dispatch(setStatus(Status.SUCCESS));
      return;
    }

    dispatch(setUser(storedUser));

    if (!storedUser.role) {
      try {
        const response = await APIWITHTOKEN.get("/api/auth/me");
        if (response.status === 200) {
          const updatedUser: IUserData = {
            ...storedUser,
            username: response.data.data.username ?? storedUser.username,
            role: response.data.data.role,
            instituteId: response.data.data.instituteId,
          };
          dispatch(setUser(updatedUser));
          persistAuthUser(updatedUser);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }

    dispatch(setStatus(Status.SUCCESS));
  };
}

export function logoutUser() {
  return function logoutUserThunk(dispatch: AppDispatch) {
    clearAuthStorage();
    dispatch(
      setUser({
        username: "",
        token: "",
        role: undefined,
        instituteId: null,
      }),
    );
    dispatch(setStatus(Status.SUCCESS));
  };
}

export const registerUser = (data: IRegisterData) => {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post("/api/auth/register", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
};

export const LoginUser = (data: ILoginData) => {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post("/api/auth/login", data);
      if (response.status === 200) {
        const user: IUserData = response.data.data;
        dispatch(setUser(user));
        persistAuthUser(user);
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
};

export function markUserAsInstitute(instituteId: string | number) {
  return function markUserAsInstituteThunk(
    dispatch: AppDispatch,
    getState: () => RootState,
  ) {
    const currentUser = getState().auth.user;
    const updatedUser: IUserData = {
      ...currentUser,
      role: "institute",
      instituteId,
    };
    dispatch(setUser(updatedUser));
    persistAuthUser(updatedUser);
  };
}
