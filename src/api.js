import { ENDPOINTS } from "./config.js";
import { fetchFromApi, getFormattedDate } from "./utils.js";

async function getCountries(region) {
  const url = `${ENDPOINTS.countries}${region}`;
  return fetchFromApi(url);
}

async function getCities(country) {
  const options = {
    method: "POST",
    body: { country },
  };
  return fetchFromApi(ENDPOINTS.cities, options);
}

async function getMethods() {
  return fetchFromApi(ENDPOINTS.methods);
}

async function getPrayerTimes({ city, country, method }) {
  const url = new URL(ENDPOINTS.prayerTimes);
  const date = new Date();
  const formattedDate = getFormattedDate(date);

  url.search = new URLSearchParams({ city, country, method, formattedDate });

  return fetchFromApi(url.toString());
}

export { getCities, getCountries, getMethods, getPrayerTimes };
