import Home from "./pages/Home"
import ContactUs from "./pages/ContactUs";
import CourseSingle from "./pages/CourseSingle";
import Courses from "./pages/Courses";
import PaypalPage from "./pages/PaypalPage";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/course-single/:id" element={<CourseSingle/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/paypal/top-up-balance/" element={<PaypalPage/>}/>
        </Routes>
    </Router>
  );
}

export default App
