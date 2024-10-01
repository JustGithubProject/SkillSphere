import HomeV2Page from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import CourseSingle from "./pages/CourseSingle";
import Courses from "./pages/Courses";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PurchasedCoursesPage from "./pages/PurchasedCoursesPage";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeV2Page />} />
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/course-single/:id" element={<CourseSingle/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/purchased-courses" element={<PurchasedCoursesPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
    </Router>
  );
}

export default App
