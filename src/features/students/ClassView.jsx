import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  filterSortByValue,
  setGenderFilter,
  setSortByFilter,
} from "./studentSlice";

export default function ClassView() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.students);
  const students = useSelector(filterSortByValue);

  const [selectedFilterValue, setSelectedFilterValue] = useState("all");
  const [selectedSortByValue, setSelectedSortByValue] = useState("name");

  useEffect(() => {
    dispatch(setSortByFilter(selectedSortByValue));
  }, [selectedSortByValue]);

  useEffect(() => {
    dispatch(setGenderFilter(selectedFilterValue));
  }, [selectedFilterValue]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="container py-4">
      {status === "loading" && (
        <div className="alert alert-info text-center">Loading...</div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {status === "success" && (
        <>
          <h1>Class View</h1>

          <div>
            <label className="form-label" htmlFor="genderFilter">
              Filter by Gender:
            </label>
            <select
              className="form-select"
              name="gender"
              id="genderFilter"
              onChange={(e) => setSelectedFilterValue(e.target.value)}
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="py-4">
            <label className="form-label" htmlFor="sortby">
              Sort by:
            </label>
            <select
              className="form-select"
              name="sortby"
              id="sortby"
              onChange={(e) => setSelectedSortByValue(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="marks">Marks</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>

          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.name} - {student.gender} - Marks: {student.marks} -
                Attendance: {student.attendance}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
