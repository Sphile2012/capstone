import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/search/SearchBar';
import CategoryBar from '../components/CategoryBar';
import ListingCard from '../components/ListingCard';
import './Home.css';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchListings();
  }, [selectedCategory]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) {
        params.categories = selectedCategory;
      }
      const { data } = await axios.get('/api/listings', { params });
      setListings(data.listings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <SearchBar />
      <CategoryBar onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      
      <div className="container">
        {loading ? (
          <div className="loading">Loading amazing places...</div>
        ) : (
          <div className="listings-grid">
            {listings.map(listing => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
