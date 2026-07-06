import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListingDetails from './pages/ListingDetails';
import SearchResults from './pages/SearchResults';
import UserProfile from './pages/UserProfile';
import Trips from './pages/Trips';
import Wishlists from './pages/Wishlists';
import Messages from './pages/Messages';
import HostDashboard from './pages/HostDashboard';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import Experiences from './pages/Experiences';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/listings/:id" element={<ListingDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/experiences" element={<Experiences />} />
                
                <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/trips" element={<PrivateRoute><Trips /></PrivateRoute>} />
                <Route path="/wishlists" element={<PrivateRoute><Wishlists /></PrivateRoute>} />
                <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
                <Route path="/book/:listingId" element={<PrivateRoute><Booking /></PrivateRoute>} />
                
                <Route path="/host/dashboard" element={<PrivateRoute><HostDashboard /></PrivateRoute>} />
                <Route path="/host/create-listing" element={<PrivateRoute><CreateListing /></PrivateRoute>} />
                <Route path="/host/edit-listing/:id" element={<PrivateRoute><EditListing /></PrivateRoute>} />
                
                <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
