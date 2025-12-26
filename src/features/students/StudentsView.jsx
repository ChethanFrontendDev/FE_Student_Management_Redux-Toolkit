import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentSlice";
import { NavLink } from "react-router-dom";

const StudentsView = () => {
  const dispatch = useDispatch();

  const { students, status, error } = useSelector((state) => {
    return state.students;
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div className="container">
      <div>
        {/* Loading */}
        {status === "loading" && (
          <p className="alert alert-info text-center">Loading...</p>
        )}

        {/* Error */}
        {error && <p className="alert alert-danger text-center">{error}</p>}

        {/* Api was successful and returns empty array */}
        {status === "success" && students.length === 0 && (
          <p className="text-center">No Students Found.</p>
        )}
      </div>

      {/* success and array is truthy */}
      {status === "success" && students.length > 0 && (
        <div className="py-4">
          <h1>Student View</h1>
          <div className="py-3">
            <NavLink
              to="/student-form"
              state={{ mode: "add" }}
              className="btn btn-warning text-primary"
            >
              Add Student
            </NavLink>
          </div>
          <ul>
            <h2>Student List</h2>
            {students?.map((student) => (
              <li key={student?._id}>
                <NavLink
                  to={`/students/${student?._id}`}
                  className="text-decoration-none"
                >
                  {student?.name} (Age: {student?.age})
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentsView;
