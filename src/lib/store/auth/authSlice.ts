import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialData, IUserData } from "./types.authSlice";
import { Status } from "../../types/types";

const initialState: IInitialData = {
  user: {
    username: "",
    password: "",
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
export default = authSlice.reducer