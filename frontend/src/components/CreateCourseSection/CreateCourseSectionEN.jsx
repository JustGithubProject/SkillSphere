import React, { useState } from 'react';
import './CreateCourseSection.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateCourseSectionEN = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const BASE_URL = process.env.REACT_APP_API_URL;
  console.log("BASE_URL: ", BASE_URL);

  const levels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const categories = [
    { value : 'web-design', label: 'Web Design'},
    { value : 'development', label: 'Development'},
    { value : 'game-design', label: 'Game Design'},
    { value : 'apps-design', label: 'Apps Design'},
    { value : 'marketing', label: 'Marketing'},
    { value : 'research', label: 'Research'},
    { value : 'content-writing', label: 'Content Writing'},
    { value : 'seo', label: 'SEO'},
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = Cookies.get("access_token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("level", level);
    formData.append("category", category);
    if (photoFile) formData.append("photo_file", photoFile);
    if (videoFile) formData.append("video_file", videoFile);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/course/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setSuccessMessage("Course created successfully!");
      setErrorMessage('');
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to create course: " + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Create a New Course</h2>
      <form className="form-content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-field"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-field"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="form-field"
        >
          <option value="" disabled>Select Level</option>
          {levels.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-field"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label className="form-file-upload">
          <input
            type="file"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="form-file-input"
            accept="image/*"
          />
          <span className="form-file-label">Upload Photo</span>
        </label>
        <label className="form-file-upload">
          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="form-file-input"
            accept="video/*"
          />
          <span className="form-file-label">Upload Video</span>
        </label>
        <button type="submit" className="form-button">Create Course</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreateCourseSectionEN;
