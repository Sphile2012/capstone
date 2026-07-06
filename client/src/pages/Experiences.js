import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Experiences.css';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get('/api/experiences');
      setExperiences(data.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="experiences-page">
      <div className="container">
        <h1>Experiences</h1>
        <p>Discover unique activities and adventures led by local experts</p>
        {loading ? (
          <div className="loading">Loading experiences...</div>
        ) : (
          <div className="experiences-grid">
            {experiences.map(exp => (
              <div key={exp._id} className="experience-card card">
                <img src={exp.photos[0]?.url} alt={exp.title} />
                <div className="experience-info">
                  <h3>{exp.title}</h3>
                  <p>{exp.category}</p>
                  <p className="experience-price">${exp.price} per person</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
