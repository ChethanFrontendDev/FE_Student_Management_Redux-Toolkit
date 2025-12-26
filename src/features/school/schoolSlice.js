import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseApiUrl = "https://be-student-management.vercel.app";

export const fetchTeacher = createAsyncThunk(
  "teacher/fetchTeacher",
  async () => {
    const response = await axios.get(`${baseApiUrl}/teachers`);
    return response.data;
  }
);

export const addTeacher = createAsyncThunk(
  "teacher/addTeacher",
  async (teacherData) => {
    const response = await axios.post(`${baseApiUrl}/teachers`, teacherData);
    return response.data;
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacher/deleteTeacher",
  async (teacherId) => {
    const response = await axios.delete(`${baseApiUrl}/teachers/${teacherId}`);
    return teacherId;
  }
);

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null,

    teachers: [],

    fetchStatus: "idle",
    fetchError: null,

    addStatus: "idle",
    addError: null,

    deleteStatus: "idle",
    deleteError: null,
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageAttendance = action.payload.averageAttendance;
      state.averageMarks = action.payload.averageMarks;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
    resetAddState: (state) => {
      state.addStatus = "idle";
      state.addError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchTeacher.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchTeacher.fulfilled, (state, action) => {
      state.fetchStatus = "success";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeacher.rejected, (state, action) => {
      state.fetchStatus = "error";
      state.fetchError = action.error.message;
    });

    // Add
    builder.addCase(addTeacher.pending, (state) => {
      state.addStatus = "loading";
    });
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.teachers.push(action.payload);
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      state.addStatus = "error";
      state.addError = action.error.payload;
    });

    // Delete
    builder.addCase(deleteTeacher.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.deleteStatus = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload
      );
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.deleteStatus = "error";
      state.deleteError = action.error.payload;
    });
  },
});

export const { updateSchoolStats, setTopStudent, resetAddState } =
  schoolSlice.actions;

export default schoolSlice;
