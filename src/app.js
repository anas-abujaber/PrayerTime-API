import { getCities, getCountries, getMethods, getPrayerTimes } from "./api";

//testing the api
(async () => {
  try {
    const countries = await getCountries("asia");
    const countryNames = countries.map((country) => country.name.common);
    console.log("Country names:", countryNames);

    const cities = await getCities("Egypt");
    console.log("Cities:", cities);

    const methods = await getMethods();
    console.log("Methods:", methods.data);

    const res = await getPrayerTimes({
      city: "Gaza",
      country: "Palestine",
      method: 0,
    });

    console.log("Prayer Times:", res.data.timings);
  } catch (error) {
    console.error("Error:", error);
  }
})();
