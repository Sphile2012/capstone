import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wishlists.css';

const Wishlists = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const { data } = await axios.get('/api/wishlists');
      setWishlists(data.wishlists);
    } catch (error) {
      console.error('Error fetching wishlists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading wishlists...</div>;

  return (
    <div className="wishlists-page">
      <div className="container">
        <h1>Wishlists</h1>
        {wishlists.length === 0 ? (
          <div className="empty-state">
            <p>Create your first wishlist</p>
            <p>As you search, tap the heart icon to save your favorite places and Experiences to a wishlist</p>
          </div>
        ) : (
          <div className="wishlists-grid">
            {wishlists.map(wishlist => (
              <div key={wishlist._id} className="wishlist-card card">
                <h3>{wishlist.name}</h3>
                <p>{wishlist.listings.length} saved</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlists;
