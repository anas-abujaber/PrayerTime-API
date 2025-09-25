const cache = new Map();

const DEFAULT_DURATION = 3 * 60 * 60 * 1000;

function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > entry.duration) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function saveToCache(key, data, duration = DEFAULT_DURATION) {
  if (cache.size > 50) {
    cache.clear();
  }

  cache.set(key, {
    data,
    timestamp: Date.now(),
    duration,
  });
}

export { getFromCache, saveToCache };
