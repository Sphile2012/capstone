import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0
    },
    filters: {
      priceRange: { min: 0, max: 1000 },
      propertyType: [],
      amenities: [],
      rooms: { bedrooms: 0, beds: 0, bathrooms: 0 },
      instantBook: false
    }
  });

  const updateSearchParams = (params) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  const updateFilters = (filters) => {
    setSearchParams(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };

  const resetSearch = () => {
    setSearchParams({
      location: '',
      checkIn: null,
      checkOut: null,
      guests: {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
      },
      filters: {
        priceRange: { min: 0, max: 1000 },
        propertyType: [],
        amenities: [],
        rooms: { bedrooms: 0, beds: 0, bathrooms: 0 },
        instantBook: false
      }
    });
  };

  const value = {
    searchParams,
    updateSearchParams,
    updateFilters,
    resetSearch
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
