import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateMobileForm.css'; // Import the CSS file

const CreateMobileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    releaseDate: '',
  });

  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      price: Number(formData.price),
      releaseDate: formData.releaseDate,
      // Additional mobile details can be added here...
    };

    try {
      const response = await fetch('http://localhost:4000/api/mobiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      alert('Mobile created successfully!');
      console.log(data);
      navigate('/product'); // Redirect to /product after successful submission
    } catch (error) {
      console.error('Error creating mobile:', error);
      alert('Failed to create mobile: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="create-mobile-form">
        <h1 className="form-title">Create New Mobile</h1>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="form-button">Create Mobile</button>
      </form>
    </div>
  );
};

export default CreateMobileForm;
