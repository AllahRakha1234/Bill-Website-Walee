const NodeCache = require('node-cache');

// Create a new cache instance
const cache = new NodeCache();

/**
 * Wraps a function with caching functionality
 * @param {Function} fn - The function to be cached
 * @param {string} key - The cache key
 * @param {number} ttl - Time to live in seconds
 * @returns {Function} - The wrapped function
 */
const cacheWrapper = (fn, key, ttl) => {
  return async (...args) => {
    const cachedValue = cache.get(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const result = await fn(...args);
    cache.set(key, result, ttl);
    return result;
  };
};

module.exports = {
  cacheWrapper
};