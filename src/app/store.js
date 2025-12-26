import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/students/studentSlice";
import schoolSlice from "../features/school/schoolSlice";

export default configureStore({
  reducer: {
    students: studentSlice.reducer,
    school: schoolSlice.reducer,
  },
});
