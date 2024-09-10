import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/course/all/no-auth/');
        setCourses(response.data);
        console.log("Data: ", response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="site-section courses-title" id="courses-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up">
            <h2 className="section-title">Courses</h2>
          </div>
        </div>
      </div>
      <div className="site-section courses-entry-wrap" data-aos="fade-up" data-aos-delay="100">
        <div className="container">
          <div className="row">
            <div className="owl-carousel col-12 nonloop-block-14">
              {courses.map((course, index) => (
                <div className="course bg-white h-100 align-self-stretch" key={index}>
                  <figure className="m-0">
                    <a href="/course-single"><img src="https://cdn-icons-png.flaticon.com/512/4762/4762232.png" alt="Image" className="img-fluid" /></a>
                  </figure>
                  <div className="course-inner-text py-4 px-4">
                    <span className="course-price">${course.price}</span>
                    <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                    <h3><a href="#">{course.title}</a></h3>
                    <p>{course.description}</p>
                  </div>
                  <div className="d-flex border-top stats">
                    <div className="py-3 px-4"><span className="icon-users"></span>N/A</div>
                    <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span>N/A</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-7 text-center">
              <button className="customPrevBtn btn btn-primary m-1">Prev</button>
              <button className="customNextBtn btn btn-primary m-1">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
