import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacher, resetAddState } from "../features/school/schoolSlice";
import { useNavigate } from "react-router-dom";

const TeacherForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addStatus, addError } = useSelector((state) => state.school);

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitTeacherForm = (e) => {
    e.preventDefault();
    dispatch(addTeacher(formData));
    setFormData({
      name: "",
      subject: "",
    });
  };

  useEffect(() => {
    if (addStatus === "success" || addError) {
      const timer = setTimeout(() => {
        dispatch(resetAddState());
        navigate(-1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    dispatch(resetAddState());
  }, [addStatus, addError, dispatch]);

  return (
    <div className="container py-4">
      <h1 className="py-3">Teacher Form</h1>
      <form onSubmit={submitTeacherForm}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <div className="py-3">
          {addStatus === "success" && (
            <div className="alert alert-success text-center">
              Added Successfully.
            </div>
          )}

          {addError && (
            <div className="alert alert-danger text-center">{addError}</div>
          )}
        </div>
      </form>
    </div>
  );
};
export default TeacherForm;
