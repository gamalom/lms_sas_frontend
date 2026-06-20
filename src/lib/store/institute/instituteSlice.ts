import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialInstituteData, IInstitute } from "./types.instituteSlice";
import { Status } from "../../types/types";
import { AppDispatch } from "../store";
import { API, APIWITHTOKEN } from "../../http";

const initialState: IInitialInstituteData = {
  institute: {
    instituteName: "",
    instituteAddress: "",
    institutePhoneNumber: "",
    instituteEmail: "",
    institutePanNumber: "",
    instituteVatNumber: "",
  },
  status: Status.LOADING,
};

const instituteSlice = createSlice({
  name: "instituteSlice",
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

export function createInstitute(data: IInstitute) {
  return async function createInstituteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/api/institute", data);
      if (response.status === 201 || response.status === 200) {
        // update local state with server response when available, fallback to sent data
        const instituteData = response.data?.instituteNumber
          ? { ...data, instituteNumber: response.data.instituteNumber }
          : data;
        dispatch(setInstitute(instituteData));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error creating institute:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchInstitute() {
  return async function fetchInstituteThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/api/institute");
      if (response.status === 200) {
        dispatch(setInstitute(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching institute:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
