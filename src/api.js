import { ENDPOINTS } from "./config.js";
import { fetchFromApi, getFormattedDate } from "./utils.js";
import { getFromCache, saveToCache } from "./cache.js";

async function fetchWithCache(url, options = {}) {
  const cacheKey = url + JSON.stringify(options);

  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await fetchFromApi(url, options);
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getCountries(region) {
  const url = `${ENDPOINTS.countries}${region}`;
  return fetchWithCache(url);
}

async function getCities(country) {
  const options = {
    method: "POST",
    body: { country },
  };
  return fetchWithCache(ENDPOINTS.cities, options);
}

async function getMethods() {
  return fetchWithCache(ENDPOINTS.methods);
}

async function getPrayerTimes({ city, country, method }) {
  const date = new Date();
  const formattedDate = getFormattedDate(date);

  const cacheKey = `prayer-${city}-${country}-${method}-${formattedDate}`;

  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const url = new URL(ENDPOINTS.prayerTimes);
  const params = new URLSearchParams({
    city,
    country,
    method,
    date: formattedDate,
  });
  url.search = params.toString();

  try {
    const data = await fetchFromApi(url.toString());
    saveToCache(cacheKey, data, 12 * 60 * 60 * 1000);
    return data;
  } catch (error) {
    throw error;
  }
}

export { getCities, getCountries, getMethods, getPrayerTimes };
