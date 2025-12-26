import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavigationMenu from "./components/NavigationMenu";
import StudentDetail from "./pages/studentDetail";
import StudentForm from "./components/StudentForm";
import ClassView from "./features/students/ClassView";
// import SchoolView from "./pages/SchoolView";
import School from "./pages/School";
import TeacherForm from "./components/TeacherForm";

function App() {
  return (
    <Router>
      <NavigationMenu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/students/:id/student-form" element={<StudentForm />} />
        <Route path="/classes" element={<ClassView />} />
        <Route path="/school" element={<School />} />
        <Route path="/school/teacher-form" element={<TeacherForm />} />
      </Routes>
    </Router>
  );
}

export default App;
