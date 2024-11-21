import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as jwtDecodeModule from 'jwt-decode';
import { useLocation } from 'react-router-dom';

import PayPalForm from '../Paypal/PaypalForm';

import './CourseSingle.css';

const CourseSingleComponent = ({ course_id }) => {
  const [course, setCourse] = useState();
  const [comments, setComments] = useState([]);
  const [formMessage, setFormMessage] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [formReplyMessage, setFormReplyMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const videoURLParamValue = query.get("watch");

  const BASE_URL = process.env.REACT_APP_API_URL;
  const NGINX_URL = process.env.REACT_APP_NGINX_URL;
  console.log("BASE_URL: ", BASE_URL);

  const handleCreateCommentSubmit = async (e) => {
    e.preventDefault();
    const accessToken = Cookies.get("access_token");
    if (accessToken) {

      const decodedToken = jwtDecodeModule.jwtDecode(accessToken);
      const userID = decodedToken.id;
      try {
        await axios.post(
          `${BASE_URL}/api/v1/comment`,
          {
            content: formMessage,
            parent_id: null,
            course_id: course_id,
            user_id: userID
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            }
          }
        );
        setFormMessage('');
        window.location.reload();
      } catch (error) {
        console.log("Failed to create comment: ", error);
      }
    }
  };

  const handleReplyForm = async (e, commentParentID) => {
    e.preventDefault();
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const decodedToken = jwtDecodeModule.jwtDecode(accessToken);
      const userID = decodedToken.id;
      try {
        await axios.post(
          `${BASE_URL}/api/v1/comment`,
          {
            content: formReplyMessage,
            parent_id: commentParentID,
            course_id: course_id,
            user_id: userID
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            }
          }
        );
        setFormReplyMessage('');
        setReplyToCommentId(null);
        window.location.reload();
      } catch (error) {
        console.log("Failed to create reply comment: ", error);
      }
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setIsAuthorized(true);
    }
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/course/no-auth/${course_id}`);
        setCourse(response.data);
      } catch (error) {
        console.log("Error fetching course: ", error);
      }
    };

    const fetchCommentsById = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/comment/all/${course_id}`);
        setComments(response.data);
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    };

    fetchCourseById();
    fetchCommentsById();
  }, [course_id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleReplyForm = (commentId) => {
    setReplyToCommentId(prevId => (prevId === commentId ? null : commentId));
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-5">
                <h6 className="text-primary mb-3">{course && formatDate(course.created_at)}</h6>
                <h1 className="mb-5">{course && course.title}</h1>
                <video className="video-fluid rounded w-100 mb-4" width="800" controls>
                  <source src={`${NGINX_URL}${videoURLParamValue}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p>{course && course.description}</p>
              </div>

              <div className="mb-5">
                <h3 className="text-uppercase mb-4">{comments.length} Comments</h3>
                {comments.map(comment => (
                  <div key={comment.id} className="media mb-4">
                    <div className="media-body">
                      <h6><small><i>{formatDate(comment.created_at)}</i></small></h6>
                      <p>{comment.user.username}: {comment.content}</p>
                      <button className="btn btn-sm btn-secondary" onClick={() => toggleReplyForm(comment.id)}>
                        {replyToCommentId === comment.id ? 'Cancel' : 'Reply'}
                      </button>
                      {comment.replies.length > 0 && comment.replies.map(reply => (
                        <div key={reply.id} className="media mt-4" style={{ marginLeft: '20px' }}>
                          <div className="media-body">
                            <h6><small><i>{formatDate(reply.created_at)}</i></small></h6>
                            <p>{reply.user.username}: {reply.content}</p>
                          </div>
                        </div>
                      ))}
                      {replyToCommentId === comment.id && (
                        <div className="media mt-4">
                          <div className="media-body">
                            <form onSubmit={(e) => handleReplyForm(e, comment.id)}>
                              <div className="form-group">
                                <label htmlFor="message">Reply message *</label>
                                <textarea
                                  id="message"
                                  cols="10"
                                  placeholder="Reply message"
                                  value={formReplyMessage}
                                  onChange={(e) => setFormReplyMessage(e.target.value)}
                                  rows="2"
                                  className="form-control border-0"
                                ></textarea>
                                <button className="btn btn-sm btn-secondary">Send</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-secondary rounded p-5">
                <h3 className="text-uppercase mb-4">Leave a comment</h3>
                <form onSubmit={handleCreateCommentSubmit}>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      cols="30"
                      placeholder="Message"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows="5"
                      className="form-control border-0"
                    ></textarea>
                  </div>
                  <div className="form-group mb-0">
                    <input type="submit" value="Leave a comment" className="btn btn-primary py-md-2 px-md-4 mt-2" />
                  </div>
                </form>
              </div>
            </div>

            {/* <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
                <h3 className="text-primary mb-3">About Course</h3>
                <a href="" className="text-black mb-2">Price: {course && course.price}$</a>
                <a href="" className="text-black mb-2">Level: {course && course.level}</a>
                {isAuthorized ? (
                  <PayPalForm price={course && course.price} course_id={course_id} />
                ): null}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSingleComponent;
