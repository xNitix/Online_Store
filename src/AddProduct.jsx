import React, { useState } from 'react';
import './css/AddProduct.css';  // Importuj styl CSS

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: 0,
    level: 0,
    image: '',  // Zmiana na pusty string
    sex: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add Dinosaur</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Type:</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />

          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Level:</label>
          <input type="number" name="level" value={formData.level} onChange={handleChange} required />

          <label>Image:</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />

          <label>Sex:</label>
          <input type="text" name="sex" value={formData.sex} onChange={handleChange} required />

          <button type="submit">Add Dinosaur</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
