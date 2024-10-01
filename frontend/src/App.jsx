import HomeV2Page from "./pages/HomeV2";
import ContactUs from "./pages/ContactUs";
import CourseSingle from "./pages/CourseSingle";
import Courses from "./pages/Courses";
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
        </Routes>
    </Router>
  );
}

export default App
