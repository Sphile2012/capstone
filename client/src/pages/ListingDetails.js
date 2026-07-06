import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaWifi, FaCar, FaSwimmingPool } from 'react-icons/fa';
import './ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const { data } = await axios.get(`/api/listings/${id}`);
      setListing(data.listing);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="listing-details-page">
      <div className="container">
        <h1>{listing.title}</h1>
        <div className="listing-header-info">
          <span><FaStar /> {listing.rating.overall} · {listing.reviewCount} reviews</span>
          <span>{listing.address.city}, {listing.address.country}</span>
        </div>

        <div className="photos-grid">
          {listing.photos.slice(0, 5).map((photo, index) => (
            <div key={index} className={`photo-item photo-${index}`}>
              <img src={photo.url} alt={photo.caption || listing.title} />
            </div>
          ))}
        </div>

        <div className="listing-content">
          <div className="listing-main">
            <div className="hosted-by">
              <h2>{listing.roomType} hosted by {listing.host.firstName}</h2>
              <p>{listing.accommodates} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.bathrooms} baths</p>
            </div>

            <div className="listing-description">
              <p>{listing.description}</p>
            </div>

            <div className="amenities-section">
              <h3>What this place offers</h3>
              <div className="amenities-grid">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <FaWifi />
                    <span>{amenity.replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="listing-sidebar">
            <div className="booking-card">
              <div className="price-header">
                <span className="price">${listing.pricing.basePrice}</span> night
              </div>
              <button className="btn btn-primary btn-block" onClick={() => navigate(`/book/${listing._id}`)}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
