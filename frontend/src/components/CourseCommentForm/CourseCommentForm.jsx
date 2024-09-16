import React, { useState, useEffect } from 'react';
import * as jwtDecodeModule from 'jwt-decode';
import axios from 'axios';

const CourseCommentForm = () => {
    const [message, setMessage] = useState()

    const handleFormToCreateComment = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/comment',
            {
                content: message,
                parent_id: 0,
                course_id: 0 // TODO: ...
            },
            {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch(error) {
            console.log("Failed to create comment: ", error);
        }
    }

    return (
        <div className="comment-form-wrap pt-5">
            <h3 className="mb-5">Leave a comment</h3>
            <form onSubmit={handleFormToCreateComment} className="p-5 bg-light">
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" cols="30" rows="10" className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value="Post Comment" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CourseCommentForm;
