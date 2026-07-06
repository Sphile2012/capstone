import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trips.css';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      setTrips(data.bookings);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading trips...</div>;

  return (
    <div className="trips-page">
      <div className="container">
        <h1>Trips</h1>
        {trips.length === 0 ? (
          <div className="empty-state">
            <p>No trips booked...yet!</p>
            <p>Time to dust off your bags and start planning your next adventure</p>
          </div>
        ) : (
          <div className="trips-grid">
            {trips.map(trip => (
              <div key={trip._id} className="trip-card card">
                <img src={trip.listing.photos[0]?.url} alt={trip.listing.title} />
                <div className="trip-info">
                  <h3>{trip.listing.title}</h3>
                  <p>{trip.listing.address.city}, {trip.listing.address.country}</p>
                  <p className="trip-dates">
                    {new Date(trip.checkInDate).toLocaleDateString()} - {new Date(trip.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="trip-status">{trip.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
