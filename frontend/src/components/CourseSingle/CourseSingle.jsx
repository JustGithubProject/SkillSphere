import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

const CourseSingleComponent = ({ course_id }) => {
  const [course, setCourse] = useState();
  const [comments, setComments] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const videoURLParamValue = query.get("watch");

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/course/no-auth/${course_id}`);
        setCourse(response.data);
        console.log("Course: ", response.data);
      } catch (error) {
        console.log("Error fetching course: ", error);
      }
    };
    const fetchCommentsById = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/comment/all/${course_id}`);
        setComments(response.data);
        console.log("Comments: ", response.data);
      } catch(error) {
        console.log("Error fetching comments: ", error);
      }
    }
    fetchCourseById();
    fetchCommentsById();
  }, [course_id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {/* Header Start */}
      <div className="container-fluid page-header" style={{ marginBottom: '90px' }}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center" style={{ minHeight: '300px' }}>
            <h3 className="display-4 text-white text-uppercase">Single</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase"><a className="text-white" href="">Home</a></p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">Single</p>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* Detail Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
            <div className="mb-5">
                <h6 className="text-primary mb-3">{course && formatDate(course.created_at)}</h6>
                <h1 className="mb-5">{course && course.title}</h1>
                <video className="video-fluid rounded w-100 mb-4" width="800" controls>
                  <source src={`http://127.0.0.1:8080${videoURLParamValue}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p>{course && course.description}</p>
            </div>
              {/* Comment List */}
              <div className="mb-5">
                  <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>{comments.length} Comments</h3>
                  {comments.map(comment => (
                    <div key={comment && comment.id} className="media mb-4">
                      {/* <img src="img/user.jpg" alt="Image" className="img-fluid rounded-circle mr-3 mt-1" style={{ width: '45px' }} /> */}
                      <div className="media-body">
                        <h6>{comment && comment.user_id} <small><i>{comment && comment.created_at}</i></small></h6>
                        <p>{comment && comment.content}</p>
                        <button className="btn btn-sm btn-secondary">Reply</button>
                        {/* {comment.replies.length > 0 && comment.replies.map(reply => (
                          <div key={reply.id} className="media mt-4">
                            <img src="img/user.jpg" alt="Image" className="img-fluid rounded-circle mr-3 mt-1" style={{ width: '45px' }} />
                            <div className="media-body">
                              <h6>{reply.name} <small><i>{reply.date}</i></small></h6>
                              <p>{reply.text}</p>
                              <button className="btn btn-sm btn-secondary">Reply</button>
                            </div>
                          </div>
                        ))} */}
                      </div>
                    </div>
                  ))}
                </div>

              {/* Comment Form */}
              <div className="bg-secondary rounded p-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Leave a comment</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="form-control border-0" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" className="form-control border-0" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="url" className="form-control border-0" id="website" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" cols="30" rows="5" className="form-control border-0"></textarea>
                  </div>
                  <div className="form-group mb-0">
                    <input type="submit" value="Leave a comment" className="btn btn-primary py-md-2 px-md-4 mt-2" />
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              {/* About Course */}
              <div className="d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
                <h3 className="text-primary mb-3">About Course</h3>
                <a href="" className="text-black mb-2">Price: {course && course.price}$</a>
                <a href="" className="text-black mb-2">Level: {course && course.level}</a>
              </div>

              {/* Recent Post */}
              {/* <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Recent Post</h3>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-1.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-2.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-3.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-1.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-2.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
              </div> */}

              {/* Image */}
              <div className="mb-5">
                <img src="img/blog-1.jpg" alt="Image" className="img-fluid rounded" />
              </div>

              {/* Tags */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Tag Cloud</h3>
                <div className="d-flex flex-wrap m-n1">
                  <a href="" className="btn btn-primary m-1">Design</a>
                  <a href="" className="btn btn-primary m-1">Development</a>
                  <a href="" className="btn btn-primary m-1">Marketing</a>
                  <a href="" className="btn btn-primary m-1">SEO</a>
                  <a href="" className="btn btn-primary m-1">Writing</a>
                  <a href="" className="btn btn-primary m-1">Consulting</a>
                  <a href="" className="btn btn-primary m-1">Design</a>
                  <a href="" className="btn btn-primary m-1">Development</a>
                  <a href="" className="btn btn-primary m-1">Marketing</a>
                  <a href="" className="btn btn-primary m-1">SEO</a>
                  <a href="" className="btn btn-primary m-1">Writing</a>
                  <a href="" className="btn btn-primary m-1">Consulting</a>
                </div>
              </div>

              {/* Plain Text */}
              <div>
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Plain Text</h3>
                <div className="bg-secondary text-center" style={{ padding: '30px' }}>
                  <p>Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet
                    sit dolor clita kasd justo, diam accusam no sea ut tempor magna takimata, amet
                    sit et diam dolor ipsum amet diam</p>
                  <a href="" className="btn btn-primary py-2 px-4">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detail End */}
    </div>
  );
};

export default CourseSingleComponent;
