import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudentInitial } from "./type";

const studentInitial: IStudentInitial = {
  name: null,
  address: null,
};

const studentSlice = createSlice({
  name: "studentSlice",
  initialState: studentInitial,
  reducers: {
    setName(state: IStudentInitial, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAddress(state: IStudentInitial, action: PayloadAction<string>) {
      state.address = action.payload;
    },
  },
});
const { setName, setAddress } = studentSlice.actions;
export default studentSlice.reducer;
export { setName, setAddress };
