import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialInstituteData, IInstitute } from "./types.instituteSlice";
import { Status } from "../../types/types";

const initialState: IInitialInstituteData = {
  institute: {
    instituteName: "",
    instituteAddress: "",
    institutePhoneNumber: "",
    instituteEmail: "",
  },
  status: Status.LOADING,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setInstitute(
      state: IInitialInstituteData,
      action: PayloadAction<IInstitute>,
    ) {
      state.institute = action.payload;
    },
    setStatus(state: IInitialInstituteData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

const { setInstitute, setStatus } = instituteSlice.actions;
export default instituteSlice.reducer;
