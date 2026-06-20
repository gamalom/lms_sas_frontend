import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialData, IRegisterData, IUserData } from "./types.authSlice";
import { Status } from "../../types/types";
import { API } from "../../http";
import { AppDispatch } from "../store";
import { ILoginData } from "@/src/app/auth/login/types.login";

const initialState: IInitialData = {
  user: {
    username: "",
    token: "",
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
export default authSlice.reducer;

export const registerUser = (data: IRegisterData) => {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/api/auth/register", data);
      if (response.status === 201) {
        // Handle successful registration
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      // Handle registration error
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
};

export const LoginUser = (data: ILoginData) => {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/api/auth/login", data);
      if (response.status === 200) {
        // Handle successful login
        dispatch(setUser(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      // Handle registration error
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
};
