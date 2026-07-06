import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  const mainPhoto = listing.photos[0]?.url || '/placeholder.jpg';
  
  return (
    <Link to={`/listings/${listing._id}`} className="listing-card">
      <div className="listing-image">
        <img src={mainPhoto} alt={listing.title} />
        {listing.featured && <span className="badge">Guest favorite</span>}
      </div>
      
      <div className="listing-info">
        <div className="listing-header">
          <h3 className="listing-title">{listing.address.city}, {listing.address.country}</h3>
          <div className="listing-rating">
            <FaStar />
            <span>{listing.rating.overall.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="listing-subtitle">{listing.title}</p>
        <p className="listing-details">{listing.bedrooms} bedrooms · {listing.beds} beds</p>
        <p className="listing-price">
          <strong>${listing.pricing.basePrice}</strong> night
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
