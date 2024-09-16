import React, { useState } from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';

const CourseCommentForm = ({ userID, courseID }) => {
    const [message, setMessage] = useState('');

    const handleFormToCreateComment = async (event) => {
        event.preventDefault();
        
        const accessToken = Cookies.get("access_token");
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/comment',
                {
                    content: message,
                    parent_id: 0,
                    course_id: courseID,
                    user_id: userID,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                }
            );
            setMessage('');
            console.log("Comment created successfully:", response.data);
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };

    return (
        <div className="comment-form-wrap pt-5">
            <h3 className="mb-5">Leave a comment</h3>
            <form onSubmit={handleFormToCreateComment} className="p-5 bg-light">
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value="Post Comment" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CourseCommentForm;
