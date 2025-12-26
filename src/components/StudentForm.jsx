import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudents,
  editStudents,
  resetAddState,
  resetEditState,
} from "../features/students/studentSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const { addStatus, addError } = useSelector((state) => state.students);
  const { editStatus, editError } = useSelector((state) => state.students);

  const { state } = useLocation();
  const mode = state?.mode ?? "add";
  const existingStudentData = state?.existingStudentData;

  const initialFormValues = {
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const numberFields = ["age", "attendance", "marks"];

    setFormValues((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleStudentForm = (event) => {
    event.preventDefault();

    if (!formValues.gender) {
      alert("Please select gender");
    }

    if (mode === "add") {
      dispatch(addStudents(formValues));
      setFormValues(initialFormValues);
    }
    if (mode === "edit") {
      const id = formValues._id;
      const dataToUpdate = { ...formValues };
      dispatch(editStudents({ id, dataToUpdate }));
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setFormValues(existingStudentData);
    }
  }, []);

  const formStatus =
    addStatus === "loading" || editStatus === "loading"
      ? "loading"
      : addStatus === "success" || editStatus === "success"
      ? "success"
      : addStatus === "error" || editStatus === "error"
      ? "error"
      : "idle";

  const formError = addError || editError;

  useEffect(() => {
    if (addStatus === "success" || editStatus === "success") {
      const timer = setTimeout(() => {
        dispatch(resetAddState());
        dispatch(resetEditState());
      }, 2000);
      return () => clearTimeout(timer);
    }
    dispatch(resetAddState());
  }, [formStatus, dispatch]);

  return (
    <div className="container py-3">
      <h1 className="py-2">
        {mode === "add" ? "Add Student" : "Edit Student"}
      </h1>

      <form onSubmit={handleStudentForm}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Age"
            name="age"
            value={formValues.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Grade"
            name="grade"
            value={formValues.grade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label pe-3">Gender:</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formValues.gender === "male"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formValues.gender === "female"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Attendance"
            name="attendance"
            value={formValues.attendance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Marks"
            name="marks"
            value={formValues.marks}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {mode === "add" ? "Add Student" : "Update"}
        </button>
      </form>

      <div className="py-2">
        {formStatus === "success" && (
          <div className="alert alert-success text-center">
            {mode === "add"
              ? "Student added successfully."
              : "Student Updated Successfully."}
          </div>
        )}
        {formStatus === "error" && (
          <div className="alert alert-danger text-center">{formError}</div>
        )}
      </div>
    </div>
  );
};
export default StudentForm;
