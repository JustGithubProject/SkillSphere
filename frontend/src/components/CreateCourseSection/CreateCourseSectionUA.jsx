import React, { useState } from 'react';
import './CreateCourseSection.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateCourseSectionUA = () => {
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
    { value: 'Beginner', label: 'Початківець' },
    { value: 'Intermediate', label: 'Середній' },
    { value: 'Advanced', label: 'Просунутий' },
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
      setSuccessMessage("Курс успішно створено!");
      setErrorMessage('');
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setErrorMessage("Не вдалося створити курс: " + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Створити новий курс</h2>
      <form className="form-content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-field"
        />
        <textarea
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-field"
        />
        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-field"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="form-field"
        >
          <option value="" disabled>Оберіть рівень</option>
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
          <option value="" disabled>Оберіть категорію</option>
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
          <span className="form-file-label">Завантажити фото</span>
        </label>
        <label className="form-file-upload">
          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="form-file-input"
            accept="video/*"
          />
          <span className="form-file-label">Завантажити відео</span>
        </label>
        <button type="submit" className="form-button">Створити курс</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreateCourseSectionUA;
