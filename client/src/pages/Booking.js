import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListing();
  }, [listingId]);

  const fetchListing = async () => {
    try {
      const { data } = await axios.get(`/api/listings/${listingId}`);
      setListing(data.listing);
    } catch (error) {
      console.error('Error fetching listing:', error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        listing: listingId,
        checkInDate,
        checkOutDate,
        numberOfGuests: { adults, children: 0, infants: 0, pets: 0 }
      };
      
      await axios.post('/api/bookings', bookingData);
      navigate('/trips');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!listing) return <div className="loading">Loading...</div>;

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Confirm and pay</h1>
        <div className="booking-grid">
          <form onSubmit={handleBooking} className="booking-form">
            <h2>Your trip</h2>
            <div className="form-group">
              <label>Check-in</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label>Guests</label>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                className="input-field"
                min="1"
                max={listing.accommodates}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm and pay'}
            </button>
          </form>
          
          <div className="booking-summary card">
            <img src={listing.photos[0]?.url} alt={listing.title} />
            <h3>{listing.title}</h3>
            <p>${listing.pricing.basePrice} per night</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
