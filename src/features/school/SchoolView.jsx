import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../students/studentSlice";
import {
  setTopStudent,
  updateSchoolStats,
  fetchTeacher,
  deleteTeacher,
} from "./schoolSlice";
import { useNavigate } from "react-router-dom";

const SchoolView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.students);
  const students = useSelector((state) => state.students.students);
  const school = useSelector((state) => state.school);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeacher());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      dispatch(
        updateSchoolStats({
          totalStudents: students.length,
          averageAttendance:
            students.reduce((acc, curr) => acc + curr.attendance, 0) /
            students.length,
          averageMarks:
            students.reduce((acc, curr) => acc + curr.marks, 0) /
            students.length,
        })
      );

      dispatch(
        setTopStudent(
          students.reduce((acc, curr) => (curr.marks > acc.marks ? curr : acc))
        )
      );
    }
  }, [students]);

  const handleAddTeacher = () => {
    navigate("/school/teacher-form");
  };

  const deleteHandler = (id) => {
    dispatch(deleteTeacher(id));
  };

  return (
    <div className="container py-4">
      <div>
        {status === "loading" && (
          <div className="alert alert-info text-center">Loading...</div>
        )}
        {error && <div className="alert alert-danger text-center">{error}</div>}
      </div>
      <h1>School View</h1>
      <section className="py-3">
        <h5>Total Students: {school.totalStudents} </h5>
        <h5>Average Attendance: {school.averageAttendance} </h5>
        <h5>Average Marks: {school.averageMarks} </h5>
        <h5>Top Student: {school.topStudent?.name} </h5>
      </section>

      <section>
        <h1>Teacher List</h1>
        <ul>
          {school.teachers.map((teacher) => (
            <li key={teacher._id} className="py-1">
              {teacher.name} - ({teacher.subject})
              <button
                className="btn btn-danger ms-3 py-0 px-2"
                onClick={() => deleteHandler(teacher._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleAddTeacher} className="btn btn-warning">
          Add Teacher
        </button>
      </section>
    </div>
  );
};
export default SchoolView;
