const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

// Simple in-memory cache with expiration
const cache = {
  data: {},
  timeouts: {},
  set: function(key, value, ttl = 60000) { // Default TTL: 1 minute
    this.data[key] = value;
    
    // Clear any existing timeout
    if (this.timeouts[key]) {
      clearTimeout(this.timeouts[key]);
    }
    
    // Set expiration
    this.timeouts[key] = setTimeout(() => {
      delete this.data[key];
      delete this.timeouts[key];
    }, ttl);
  },
  get: function(key) {
    return this.data[key];
  },
  invalidate: function(key) {
    delete this.data[key];
    if (this.timeouts[key]) {
      clearTimeout(this.timeouts[key]);
      delete this.timeouts[key];
    }
  },
  invalidatePattern: function(pattern) {
    const regex = new RegExp(pattern);
    Object.keys(this.data).forEach(key => {
      if (regex.test(key)) {
        this.invalidate(key);
      }
    });
  }
};

// @desc    Get all items with pagination and filtering
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const cacheKey = `items-${JSON.stringify(req.query)}`;
  const cachedResult = cache.get(cacheKey);
  
  if (cachedResult) {
    return res.json(cachedResult);
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  // Build query
  let query = {};
  
  // Filter by category if provided
  if (req.query.category) {
    query.category = req.query.category;
  }
  
  // Filter by search term if provided
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }
  
  // Execute query with pagination and only select necessary fields
  const items = await Item.find(query)
    .select('name description price category image user createdAt')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  // Get total count for pagination
  const total = await Item.countDocuments(query);
  
  const result = {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
  
  // Cache the result
  cache.set(cacheKey, result);
  
  res.json(result);
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const cacheKey = `item-${req.params.id}`;
  const cachedItem = cache.get(cacheKey);
  
  if (cachedItem) {
    return res.json(cachedItem);
  }
  
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // Cache the result
  cache.set(cacheKey, item);
  
  res.json(item);
});

// @desc    Create a new item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, image } = req.body;
  
  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  const item = await Item.create({
    name,
    description,
    price,
    category,
    image,
    user: req.user._id
  });
  
  // Invalidate cache for items list
  cache.invalidatePattern('^items-');
  
  res.status(201).json(item);
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // Check if user is the owner
  if (item.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('User not authorized to update this item');
  }
  
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  // Invalidate cache for this item and items list
  cache.invalidate(`item-${req.params.id}`);
  cache.invalidatePattern('^items-');
  
  res.json(updatedItem);
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // Check if user is the owner
  if (item.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('User not authorized to delete this item');
  }
  
  await item.remove();
  
  // Invalidate cache for this item and items list
  cache.invalidate(`item-${req.params.id}`);
  cache.invalidatePattern('^items-');
  
  res.json({ message: 'Item removed' });
});

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};