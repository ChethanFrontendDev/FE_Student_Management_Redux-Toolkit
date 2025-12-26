import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseApiUrl = "https://be-student-management.vercel.app";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${baseApiUrl}/students`);
    return response.data;
  }
);

export const addStudents = createAsyncThunk(
  "students/addStudents",
  async (studentData) => {
    const response = await axios.post(`${baseApiUrl}/students`, studentData);
    return response.data;
  }
);

export const editStudents = createAsyncThunk(
  "students/editStudents",
  async ({ id, dataToUpdate }) => {
    const response = await axios.put(
      `${baseApiUrl}/students/${id}`,
      dataToUpdate
    );
    return response.data;
  }
);

export const deleteStudents = createAsyncThunk(
  "students/deleteStudents",
  async (id) => {
    const response = await axios.delete(`${baseApiUrl}/students/${id}`);
    return id;
  }
);

export const filterStudentsByGender = (state) => {
  const { students, genderFilter } = state.students;

  if (genderFilter === "all") return students;

  return students.filter((student) => student.gender === genderFilter);
};

export const filterSortByValue = (state) => {
  const { sortBy } = state.students;
  const students = filterStudentsByGender(state);

  const result = [...students];

  switch (sortBy) {
    case "marks":
      return result.sort((a, b) => parseFloat(b.marks) - parseFloat(a.marks));
    case "attendance":
      return result.sort(
        (a, b) => parseFloat(b.attendance) - parseFloat(a.attendance)
      );
    default:
      return result.sort((a, b) => a.name.localeCompare(b.name));
      z;
  }
};

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,

    addStatus: "idle",
    addError: null,

    editStatus: "idle",
    editError: null,

    deleteStatus: "idle",
    deleteError: null,

    genderFilter: "all",
    sortBy: "name",
  },
  reducers: {
    resetAddState: (state) => {
      state.addStatus = "idle";
      state.addError = null;
    },
    resetEditState: (state) => {
      state.editStatus = "idle";
      state.editError = null;
    },
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
    setSortByFilter: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // ADD
    builder.addCase(addStudents.pending, (state) => {
      state.addStatus = "loading";
    });
    builder.addCase(addStudents.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.students.push(action.payload);
    });
    builder.addCase(addStudents.rejected, (state, action) => {
      state.addStatus = "error";
      state.addError = action.error.message;
    });

    // EDIT
    builder.addCase(editStudents.pending, (state) => {
      state.editStatus = "loading";
    });
    builder.addCase(editStudents.fulfilled, (state, action) => {
      state.editStatus = "success";

      const index = state.students.findIndex(
        (student) => student._id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });
    builder.addCase(editStudents.rejected, (state, action) => {
      state.editStatus = "error";
      state.editError = action.payload.message;
    });

    // DELETE
    builder.addCase(deleteStudents.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteStudents.fulfilled, (state, action) => {
      state.deleteStatus = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    });
    builder.addCase(deleteStudents.rejected, (state, action) => {
      state.deleteStatus = "error";
      state.deleteError = action.error.message;
    });
  },
});

export const {
  resetEditState,
  resetAddState,
  setGenderFilter,
  setSortByFilter,
} = studentSlice.actions;

export default studentSlice;
