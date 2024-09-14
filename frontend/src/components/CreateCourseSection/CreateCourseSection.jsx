import React, { useState, useEffect } from 'react';
import './CreateCourseSection.css';

const CreateCourseSection = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <label className="form-file-upload">
          <input
            type="file"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="form-file-input"
          />
          <span className="form-file-label">Upload Photo</span>
        </label>
        <label className="form-file-upload">
          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="form-file-input"
          />
          <span className="form-file-label">Upload Video</span>
        </label>
        <button type="submit" className="form-button">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourseSection;
