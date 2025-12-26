import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deleteStudents,
  fetchStudents,
} from "../features/students/studentSlice";

export default function StudentDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { students, status, error } = useSelector((state) => state.students);

  const matchedStudents = students.find((std) => std._id === id);

  const deleteHandler = (id) => {
    dispatch(deleteStudents(id));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div className="container py-4">
      <div>
        {/* Loading */}
        {status === "loading" && (
          <p className="alert alert-info text-center">Loading...</p>
        )}

        {/* if api was successful and id is missing */}
        {status === "success" && !matchedStudents && (
          <p className="text-center">Student Not Found.</p>
        )}

        {/* Error */}
        {error && <p className="alert alert-danger text-center">{error}</p>}
      </div>

      {/* success and matchedStudents returns truthy */}
      {status === "success" && matchedStudents && (
        <div>
          <h1>Student Detail</h1>
          <div className="py-2">
            <h5>Name: {matchedStudents.name}</h5>
            <h5>Age: {matchedStudents.age}</h5>
            <h5>Grade: {matchedStudents.grade}</h5>
            <h5>Attendance: {matchedStudents.attendance}</h5>
            <h5>Marks: {matchedStudents.marks}</h5>
          </div>
          <div className="d-flex gap-3 pt-2">
            <NavLink
              to={`/students/${matchedStudents._id}/student-form`}
              state={{ mode: "edit", existingStudentData: matchedStudents }}
              className="btn btn-warning"
            >
              Edit Details
            </NavLink>
            <button
              onClick={() => deleteHandler(matchedStudents._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
