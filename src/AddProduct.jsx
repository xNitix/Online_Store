import React, { useState } from 'react';
import './css/AddProduct.css'; // Importuj styl CSS

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: 0,
    level: 0,
    image: '',
    sex: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name || formData.name.length > 30) {
      errors.name = 'Name must be between 1 and 30 characters.';
    }

    if (!formData.description || formData.description.length > 150) {
      errors.description = 'Description must be between 1 and 150 characters.';
    }

    if (!formData.type) {
      errors.type = 'Please select a type.';
    }

    if (formData.price < 0 || formData.price > 100) {
      errors.price = 'Price must be between 0 and 100.';
    }

    if (formData.level < 1 || formData.level > 450) {
      errors.level = 'Level must be between 1 and 450.';
    }

    if (!formData.sex) {
      errors.sex = 'Please select a sex.';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/dinosaurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        setSuccessMessage('Dinosaur successfully added!');
        setFormData({
          name: '',
          description: '',
          type: '',
          price: 0,
          level: 0,
          image: '',
          sex: '',
        });
        setValidationErrors({});
      } else {
        console.error('Error:', response.statusText);
        setSuccessMessage('Failed to add dinosaur. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Failed to add dinosaur. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Dinosaur adding form</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {validationErrors.description && (
            <p className="error-message">{validationErrors.description}</p>
          )}

          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="land">Land</option>
            <option value="water">Water</option>
            <option value="flying">Flying</option>
          </select>
          {validationErrors.type && <p className="error-message">{validationErrors.type}</p>}

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {validationErrors.price && <p className="error-message">{validationErrors.price}</p>}

          <label>Level:</label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          />
          {validationErrors.level && <p className="error-message">{validationErrors.level}</p>}

          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <label>Sex:</label>
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {validationErrors.sex && <p className="error-message">{validationErrors.sex}</p>}

          <button type="submit">Add Dinosaur</button>
        </form>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
