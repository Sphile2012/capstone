import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';
import ListingCard from '../components/ListingCard';
import './SearchResults.css';

const SearchResults = () => {
  const { searchParams } = useSearch();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchParams.location) {
        params.city = searchParams.location;
      }
      const { data } = await axios.get('/api/listings', { params });
      setListings(data.listings);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results-page">
      <div className="container">
        <h1>{listings.length} stays in {searchParams.location || 'all locations'}</h1>
        {loading ? (
          <div className="loading">Searching...</div>
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

export default SearchResults;
