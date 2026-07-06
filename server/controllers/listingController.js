const Listing = require('../models/Listing');
const Review = require('../models/Review');

exports.createListing = async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      host: req.user._id
    };
    
    const listing = await Listing.create(listingData);
    
    req.user.isHost = true;
    await req.user.save();
    
    res.status(201).json({
      success: true,
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    let query = { status: 'active' };
    
    if (req.query.city) {
      query['address.city'] = new RegExp(req.query.city, 'i');
    }
    
    if (req.query.country) {
      query['address.country'] = new RegExp(req.query.country, 'i');
    }
    
    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }
    
    if (req.query.roomType) {
      query.roomType = req.query.roomType;
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      query['pricing.basePrice'] = {};
      if (req.query.minPrice) query['pricing.basePrice'].$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query['pricing.basePrice'].$lte = parseFloat(req.query.maxPrice);
    }
    
    if (req.query.guests) {
      query.accommodates = { $gte: parseInt(req.query.guests) };
    }
    
    if (req.query.bedrooms) {
      query.bedrooms = { $gte: parseInt(req.query.bedrooms) };
    }
    
    if (req.query.beds) {
      query.beds = { $gte: parseInt(req.query.beds) };
    }
    
    if (req.query.bathrooms) {
      query.bathrooms = { $gte: parseFloat(req.query.bathrooms) };
    }
    
    if (req.query.amenities) {
      const amenitiesArray = req.query.amenities.split(',');
      query.amenities = { $all: amenitiesArray };
    }
    
    if (req.query.categories) {
      const categoriesArray = req.query.categories.split(',');
      query.categories = { $in: categoriesArray };
    }
    
    if (req.query.instantBook === 'true') {
      query['availability.instantBook'] = true;
    }
    
    if (req.query.superhost === 'true') {
      const superhostIds = await User.find({ isSuperhost: true }).distinct('_id');
      query.host = { $in: superhostIds };
    }
    
    let sort = {};
    if (req.query.sortBy === 'price-asc') sort['pricing.basePrice'] = 1;
    if (req.query.sortBy === 'price-desc') sort['pricing.basePrice'] = -1;
    if (req.query.sortBy === 'rating') sort['rating.overall'] = -1;
    if (req.query.sortBy === 'newest') sort.createdAt = -1;
    
    const listings = await Listing.find(query)
      .populate('host', 'firstName lastName avatar isSuperhost')
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await Listing.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: listings.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('host', 'firstName lastName avatar bio languages isSuperhost emailVerified phoneVerified createdAt');
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    listing.views += 1;
    await listing.save();
    
    res.status(200).json({
      success: true,
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    if (listing.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }
    
    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      listing
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    if (listing.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }
    
    await listing.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.searchNearby = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    const radiusInRadians = radius / 3963.2;
    
    const listings = await Listing.find({
      status: 'active',
      'address.latitude': {
        $gte: parseFloat(latitude) - radiusInRadians,
        $lte: parseFloat(latitude) + radiusInRadians
      },
      'address.longitude': {
        $gte: parseFloat(longitude) - radiusInRadians,
        $lte: parseFloat(longitude) + radiusInRadians
      }
    }).populate('host', 'firstName lastName avatar isSuperhost');
    
    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getHostListings = async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user._id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
