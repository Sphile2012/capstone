import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'house',
    roomType: 'entire-place',
    accommodates: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    address: { street: '', city: '', state: '', country: '', zipCode: '', latitude: 0, longitude: 0 },
    pricing: { basePrice: 0 }
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/listings', formData);
      navigate('/host/dashboard');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing');
    }
  };

  return (
    <div className="create-listing-page">
      <div className="container">
        <h1>Create New Listing</h1>
        <form onSubmit={handleSubmit} className="listing-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="input-field" rows="6" required />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label>Base Price (per night)</label>
            <input type="number" name="pricing.basePrice" value={formData.pricing.basePrice} onChange={handleChange} className="input-field" required />
          </div>
          <button type="submit" className="btn btn-primary">Create Listing</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
