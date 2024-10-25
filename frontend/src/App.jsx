import React, { useState, useEffect } from 'react';

import HomeV2Page from "./pages/Home";
import ContactUsEN from "./pages/ContactUsEN";
import ContactUsUA from "./pages/ContactUsUA";
import CourseSingle from "./pages/CourseSingle";
import Courses from "./pages/Courses";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PurchasedCoursesPage from "./pages/PurchasedCoursesPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import MyCreatedCoursesPage from './pages/MyCreatedCoursesPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import EditCoursePage from './pages/EditCoursePage';
import FullCoursePage from './pages/FullCoursePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
      const currentLang = localStorage.getItem("language_key");
      setCurrentLanguage(currentLang);
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeV2Page />} />
          {currentLanguage === 'en' ? (
            <>
              <Route path="/contact-us" element={<ContactUsEN/>}/>
            </>
          ): (
            <>
              <Route path="/contact-us" element={<ContactUsUA/>}/>
            </>
          )}
          <Route path="/course-single/:id" element={<CourseSingle/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/purchased-courses" element={<PurchasedCoursesPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/create-course" element={<CreateCoursePage/>} />
          <Route path="/my-created-courses" element={<MyCreatedCoursesPage/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
          <Route path="/change-password/:id" element={<ChangePasswordPage/>} />
          <Route path="/edit-course/:id" element={<EditCoursePage/>} />
          <Route path="/full-course/:id" element={<FullCoursePage/>} />
        </Routes>
    </Router>
  );
}

export default App
